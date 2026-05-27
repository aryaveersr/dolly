import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Proxy, type IContext, type ErrorCallback } from 'http-mitm-proxy';
import type { SseEvent } from '$lib/types/event';
import type { Body } from '$lib/types/body';
import { createBrotliDecompress, createGunzip, createInflate } from 'zlib';
import { pipeline, Writable } from 'stream';
import type { IncomingMessage } from 'http';

type Callback = (event: SseEvent) => void;

class ProxyWrapper {
	private proxy: Proxy;

	constructor() {
		this.proxy = new Proxy();
		this.proxy.use(Proxy.wildcard);
	}

	listen(port: number, sendEvent: Callback) {
		this.proxy.onRequest(this.onRequest.bind(this, sendEvent));
		this.proxy.listen({ port, host: '::' });
	}

	close() {
		this.proxy.close();
	}

	onRequest(sendEvent: Callback, ctx: IContext, next: ErrorCallback) {
		if (ctx.clientToProxyRequest.headers.host == 'cert') {
			this.sendCertificate(ctx);
			return;
		}

		const id = uuidv4();

		createPipeline(
			ctx.clientToProxyRequest.headers['content-encoding'] ?? null,
			ctx.clientToProxyRequest,
			(body) => {
				sendEvent({
					id,
					kind: 'request',
					request: {
						method: ctx.clientToProxyRequest.method!,
						headers: ctx.clientToProxyRequest.headers as Record<string, string>,
						url: ctxToUrl(ctx),
						body
					}
				});
			}
		);

		ctx.onResponse((ctx, next) => {
			createPipeline(
				ctx.serverToProxyResponse!.headers['content-encoding'] ?? null,
				ctx.serverToProxyResponse!,
				(body) => {
					sendEvent({
						id,
						kind: 'response',
						response: {
							status: ctx.serverToProxyResponse!.statusCode!,
							headers: ctx.serverToProxyResponse!.headers as Record<string, string>,
							body
						}
					});
				}
			);

			next();
		});

		next();
	}

	sendCertificate(ctx: IContext) {
		ctx.proxyToClientResponse.writeHead(200, {
			'Content-Type': 'application/x-pem-file',
			'Content-Disposition': `attachment; filename="ca.pem"`
		});

		fs.createReadStream(process.cwd() + '/.http-mitm-proxy/certs/ca.pem').pipe(
			ctx.proxyToClientResponse,
			{ end: true }
		);
	}
}

function bufferToBody(buffer: Buffer): Body {
	const data = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
	return { kind: 'raw', data: data.toBase64() };
}

function ctxToUrl(ctx: IContext): URL {
	return new URL(
		ctx.clientToProxyRequest.url!,
		`${ctx.isSSL ? 'https' : 'http'}://${ctx.clientToProxyRequest.headers.host}`
	);
}

function createPipeline(
	encoding: string | null,
	incoming: IncomingMessage,
	callback: (body: Body) => void
) {
	const decoder = getDecoder(encoding);
	const chunks = new Array<Buffer>();
	const finish = () => callback(bufferToBody(Buffer.concat(chunks)));
	const collector = new Writable({
		write(chunk, _, next) {
			chunks.push(chunk);
			next();
		}
	});

	if (decoder) pipeline(incoming, decoder, collector, finish);
	else pipeline(incoming, collector, finish);
}

function getDecoder(encoding: string | null) {
	if (!encoding) return null;

	switch (encoding) {
		case 'gzip':
			return createGunzip();
		case 'deflate':
			return createInflate();
		case 'br':
			return createBrotliDecompress();
		default:
			return null;
	}
}

export { ProxyWrapper };

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Proxy, type IContext, type ErrorCallback } from 'http-mitm-proxy';
import type { SseEvent } from '$lib/types/event';
import type { Body } from '$lib/types/http';

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
		const reqChunks = new Array<Buffer>();
		const resChunks = new Array<Buffer>();

		ctx.onRequestData((_, chunk, callback) => {
			callback(null, chunk);
			reqChunks.push(chunk);
		});

		ctx.onResponseData((_, chunk, callback) => {
			callback(null, chunk);
			resChunks.push(chunk);
		});

		ctx.onRequestEnd((ctx, callback) => {
			callback();
			sendEvent({
				id,
				kind: 'request',
				request: {
					method: ctx.clientToProxyRequest.method!,
					headers: ctx.clientToProxyRequest.headers as Record<string, string>,
					url: ctxToUrl(ctx),
					body: bufferToBody(Buffer.concat(resChunks))
				}
			});
		});

		ctx.onResponseEnd((ctx, callback) => {
			callback();
			sendEvent({
				id,
				kind: 'response',
				response: {
					status: ctx.serverToProxyResponse!.statusCode!,
					headers: ctx.serverToProxyResponse!.headers as Record<string, string>,
					body: bufferToBody(Buffer.concat(resChunks))
				}
			});
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
	return { kind: 'raw', data };
}

function ctxToUrl(ctx: IContext): URL {
	return new URL(
		ctx.clientToProxyRequest.url!,
		`${ctx.isSSL ? 'https' : 'http'}://${ctx.clientToProxyRequest.headers.host}`
	);
}

export { ProxyWrapper };

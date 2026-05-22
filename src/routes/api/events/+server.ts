import { ProxyWrapper } from './proxy';
import type { RequestHandler } from '@sveltejs/kit';
import { produce } from 'sveltekit-sse';

export const POST: RequestHandler = async () => {
	const proxy = new ProxyWrapper();

	return produce(
		async ({ emit }) => {
			proxy.listen(8080, (event) => {
				emit('message', JSON.stringify(event));
			});
		},
		{ stop: () => proxy.close() }
	);
};

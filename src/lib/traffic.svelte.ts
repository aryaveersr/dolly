import { source } from 'sveltekit-sse';
import type { TrafficEntry } from '$lib/types/traffic';
import type { SseEvent } from '$lib/types/event';

class Traffic {
	public entries = $state<TrafficEntry[]>([]);

	constructor() {
		const channel = source('/api/events').select('message');
		channel.json<SseEvent>().subscribe((event) => {
			if (!event) return;
			if (event.kind == 'request') {
				event.request.url = new URL(event.request.url);
				this.entries.push({
					status: 'pending',
					id: event.id,
					request: event.request
				});
			} else {
				const index = this.entries.findIndex((entry) => entry.id === event.id);
				this.entries[index] = {
					...this.entries[index],
					status: 'success',
					response: event.response
				};
			}
		});
	}
}

export default new Traffic();

import { source } from 'sveltekit-sse';
import type { TrafficEntry } from '$lib/types/traffic';
import type { SseEvent } from '$lib/types/event';
import EventEmitter from 'eventemitter3';
import { createContext } from 'svelte';

type TrafficStateEvent = {
	push: (entry: TrafficEntry) => void;
	update: (entry: TrafficEntry & { status: 'success' }) => void;
};

export class TrafficState extends EventEmitter<TrafficStateEvent> {
	public entries = $state<TrafficEntry[]>([]);

	constructor() {
		super();
		const channel = source('/api/events').select('message');
		channel.json<SseEvent>().subscribe((event) => this.handleSse(event));
	}

	private handleSse(event: SseEvent | null) {
		if (!event) return;
		if (event.kind == 'request') {
			event.request.url = new URL(event.request.url);
			this.entries.push({
				status: 'pending',
				id: event.id,
				request: event.request
			});

			this.emit('push', this.entries[this.entries.length - 1]);
		} else {
			const index = this.entries.findIndex((entry) => entry.id === event.id);
			this.entries[index] = {
				...this.entries[index],
				status: 'success',
				response: event.response
			};

			this.emit('update', this.entries[index]);
		}
	}
}

export const [getTrafficContext, setTrafficContext] = createContext<TrafficState>();

import type { TrafficEntry } from '$lib/types/traffic';
import type { ParsedBody, RawBody } from '$lib/types/http';
import traffic from './traffic.svelte';

class ViewerState {
	private _activeEntry = $state<TrafficEntry>();

	get activeEntry(): TrafficEntry | undefined {
		return this._activeEntry;
	}

	set activeEntry(entry: TrafficEntry) {
		if (entry.request.body.kind == 'raw') entry.request.body = parseBody(entry.request.body);
		if (entry.status == 'success' && entry.response.body.kind == 'raw') {
			entry.response.body = parseBody(entry.response.body);
		}

		this._activeEntry = entry;
	}

	constructor() {
		traffic.on('update', (entry) => {
			if (!this._activeEntry || entry.id != this._activeEntry.id) return;
			if (entry.response.body.kind == 'raw') entry.response.body = parseBody(entry.response.body);
			this._activeEntry = entry;
		});
	}
}

function parseBody(body: RawBody): ParsedBody {
	return { kind: 'parsed' };
}

export default new ViewerState();

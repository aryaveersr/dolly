import type { TrafficEntry } from '$lib/types/traffic';
import type { JSONValue, ParsedBody, Body } from '$lib/types/body';
import { createContext } from 'svelte';
import { getTrafficContext } from '$lib/contexts/traffic.svelte';

export class ViewerState {
	private _activeEntry = $state<TrafficEntry>();

	get activeEntry(): TrafficEntry | undefined {
		return this._activeEntry;
	}

	set activeEntry(entry: TrafficEntry) {
		entry.request.body = parseBody(entry.request.body);
		if (entry.status == 'success') {
			entry.response.body = parseBody(entry.response.body);
		}

		this._activeEntry = entry;
	}

	constructor() {
		const traffic = getTrafficContext();

		traffic.on('update', (entry) => {
			if (!this._activeEntry || entry.id != this._activeEntry.id) return;
			entry.response.body = parseBody(entry.response.body);
			this._activeEntry = entry;
		});
	}
}

function parseBody(body: Body): ParsedBody {
	if (body.kind != 'raw') return body;

	const bytes = Uint8Array.fromBase64(body.data);
	const decoder = new TextDecoder('utf-8', { fatal: true });

	let string: string;
	try {
		string = decoder.decode(bytes);
	} catch {
		return { kind: 'binary', data: bytes };
	}

	if (string == '') return { kind: 'empty' };

	let json: JSONValue;
	try {
		json = JSON.parse(string);
	} catch {
		return { kind: 'string', data: string };
	}

	return { kind: 'json', data: json };
}

export const [getViewerContext, setViewerContext] = createContext<ViewerState>();

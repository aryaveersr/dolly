import type { TrafficEntry } from '$lib/types/traffic';
import { createContext } from 'svelte';

export class ViewerState {
	public activeEntry = $state<TrafficEntry>();
}

export const [getViewerContext, setViewerContext] = createContext<ViewerState>();

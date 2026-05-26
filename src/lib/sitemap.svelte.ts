import type { TrafficEntry } from '$lib/types/traffic';
import type { SiteGroup, SiteItem, Sitemap } from '$lib/types/sitemap';
import traffic from './traffic.svelte';
import { SvelteMap } from 'svelte/reactivity';

class SitemapState {
	public sitemaps: SvelteMap<string, Sitemap> = new SvelteMap();
	public selectedUrl = $state<URL>();
	public selectedEntries = $derived.by(() => {
		if (!this.selectedUrl) return [];
		return traffic.entries.filter((entry) =>
			entry.request.url.href.startsWith(this.selectedUrl!.href)
		);
	});

	constructor() {
		traffic.on('push', (entry) => {
			this.addEntryToSitemap(entry);
		});
	}

	private addEntryToSitemap(entry: TrafficEntry) {
		const segments = entry.request.url.pathname.split('/').filter(Boolean);
		const usedSegments: string[] = [];
		const sitemap = getOrInsert(this.sitemaps, entry.request.url.hostname, {
			url: new URL(entry.request.url.origin),
			children: new SvelteMap<string, SiteItem>()
		});

		if (segments.length === 0) segments.push('/');
		let parent = sitemap.children;

		while (segments.length > 1) {
			const segment = segments.shift()!;
			usedSegments.push(segment);
			const currentGroup = getOrInsert(parent, segment, {
				kind: 'group',
				url: new URL(usedSegments.join('/'), entry.request.url.origin),
				children: new SvelteMap<string, SiteItem>()
			}) as SiteGroup;
			parent = currentGroup.children;
		}

		parent.set(segments[0], {
			kind: 'endpoint',
			url: entry.request.url
		});
	}
}

function getOrInsert<T>(map: SvelteMap<string, T>, key: string, value: T): T {
	if (!map.has(key)) {
		const x = $state(value);
		map.set(key, x);
	}
	return map.get(key)!;
}

export default new SitemapState();

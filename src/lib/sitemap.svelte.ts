import type { TrafficEntry } from '$lib/types/traffic';
import type { SiteGroup, SiteItem, Sitemap } from '$lib/types/sitemap';
import traffic from '$lib/traffic.svelte';
import { SvelteMap } from 'svelte/reactivity';

class SitemapState {
	public sitemaps: SvelteMap<string, Sitemap> = new SvelteMap();

	public selectedSiteItem = $state<{ url: URL; kind: 'endpoint' | 'group' }>();
	public selectedEntries = $derived.by(() => {
		if (!this.selectedSiteItem) return [];
		const entries = traffic.entries.filter((entry) =>
			entry.request.url.href.startsWith(this.selectedSiteItem!.url.href)
		);

		return this.selectedSiteItem.kind === 'group'
			? entries
			: entries.filter(
					(entry) => entry.request.url.pathname === this.selectedSiteItem!.url.pathname
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
			kind: 'group',
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

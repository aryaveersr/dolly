import type { SvelteMap } from 'svelte/reactivity';

export type Sitemap = {
	kind: 'group';
	url: URL;
	children: SvelteMap<string, SiteItem>;
};

export type SiteItem = SiteEndpoint | SiteGroup;

export interface SiteEndpoint {
	kind: 'endpoint';
	url: URL;
}

export interface SiteGroup {
	kind: 'group';
	url: URL;
	children: SvelteMap<string, SiteItem>;
}

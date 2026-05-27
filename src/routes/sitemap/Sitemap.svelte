<script lang="ts">
	import { getSitemapContext } from '$lib/contexts/sitemap.svelte';
	import type { SiteItem, Sitemap } from '$lib/types/sitemap';
	import Tree from '$lib/ui/Tree';
	import { ChevronDown, ChevronRight, Folder, FolderOpen, Link2 } from '@lucide/svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const sitemap = getSitemapContext();

	function select(item: SiteItem | Sitemap) {
		sitemap.selection = {
			url: item.url,
			kind: item.kind == 'group' ? 'partial' : 'exact'
		};
	}
</script>

<section>
	<h3 id="hosts">Hosts</h3>
	<Tree aria-labelledby="hosts">
		{#each sitemap.sitemaps.entries() as [key, value] (key)}
			<Tree.Branch onclick={() => select(value)}>
				{#snippet summary(isOpen)}
					{#if isOpen}
						<ChevronDown />
					{:else}
						<ChevronRight />
					{/if}
					<span>
						{key}
					</span>
				{/snippet}
				{@render renderItems(value.children)}
			</Tree.Branch>
		{/each}
	</Tree>
</section>

{#snippet renderItems(map: SvelteMap<string, SiteItem>)}
	{#each map.entries() as [key, value] (key)}
		{#if value.kind == 'group'}
			<Tree.Branch onclick={() => select(value)}>
				{#snippet summary(isOpen)}
					{#if isOpen}
						<FolderOpen />
					{:else}
						<Folder />
					{/if}
					<span>
						{key}
					</span>
				{/snippet}
				{@render renderItems(value.children)}
			</Tree.Branch>
		{:else}
			<Tree.Leaf onclick={() => select(value)}>
				<Link2 />
				<span>
					{key}
				</span>
			</Tree.Leaf>
		{/if}
	{/each}
{/snippet}

<style>
	h3 {
		/* Align with the tree */
		padding-left: 1rem;
	}

	section {
		/* Allow vertical scrolling */
		overflow-y: auto;

		/* Spacing */
		padding: 1rem;
	}
</style>

<script lang="ts">
	import sitemap from '$lib/sitemap.svelte';
	import Tree from '$lib/ui/Tree';
	import { ChevronDown, ChevronRight, Folder, FolderOpen, Link2 } from '@lucide/svelte';
	import type { SiteItem, Sitemap } from '$lib/types/sitemap';
	import type { SvelteMap } from 'svelte/reactivity';
	import Table from '$lib/ui/Table';

	function selectSiteItem(item: SiteItem | Sitemap) {
		sitemap.selectedSiteItem = {
			url: item.url,
			kind: item.kind
		};
	}
</script>

<div class="container">
	<section class="sitemap">
		<h3 id="hosts">Hosts</h3>
		<Tree aria-labelledby="hosts">
			{#each sitemap.sitemaps.entries() as [key, value] (key)}
				<Tree.Branch onclick={() => selectSiteItem(value)}>
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

		{#snippet renderItems(map: SvelteMap<string, SiteItem>)}
			{#each map.entries() as [key, value] (key)}
				{#if value.kind == 'group'}
					<Tree.Branch onclick={() => selectSiteItem(value)}>
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
					<Tree.Leaf onclick={() => selectSiteItem(value)}>
						<Link2 />
						<span>
							{key}
						</span>
					</Tree.Leaf>
				{/if}
			{/each}
		{/snippet}
	</section>
	<section class="entries">
		<Table>
			<Table.Head>
				<th style:width="100%">Path</th>
				<th style:width="5rem" class="center">Method</th>
				<th style:width="5rem" class="center">Status</th>
			</Table.Head>
			<Table.Body>
				{#each sitemap.selectedEntries as entry, index (entry.id)}
					<Table.Row
						onclick={() => console.log(entry.id, index)}
						aria-label="{entry.request.method} request to {entry.request.url.toString()}"
					>
						<td>{entry.request.url.pathname + entry.request.url.search}</td>
						<td class="center">{entry.request.method}</td>
						<td class="center">
							{#if entry.status == 'pending'}
								Pending
							{:else}
								{entry.response.status}
							{/if}
						</td>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table>
	</section>
</div>

<style>
	div.container {
		/* Fill height */
		height: 100%;

		/* Grid layout */
		display: grid;
		grid-template-columns: 18rem auto;
		grid-template-rows: minmax(0, 1fr);

		/* Spacing */
		gap: 1rem;
	}

	section {
		/* Spacing */
		padding: 1rem;
	}

	/* Sitemap section*/

	h3 {
		/* Align with the tree */
		padding-left: 1rem;
	}

	section.sitemap {
		/* Allow vertical scrolling */
		overflow-y: auto;
	}

	/* Entries table section */

	section.entries {
		/* Align it with sitemap's heading */
		padding-top: 2rem;
	}

	td {
		/* Force text to ellipsis */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Align status and method columns to center */
	.center {
		text-align: center;
	}

	/* Make the status and method smaller */
	td.center {
		font-size: 14px;
	}
</style>

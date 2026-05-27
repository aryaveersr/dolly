<script lang="ts">
	import Table from '$lib/ui/Table';
	import type { TrafficEntry } from '$lib/types/traffic';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { getSitemapContext } from '$lib/contexts/sitemap.svelte';
	import { getViewerContext } from '$lib/contexts/viewer.svelte';

	const sitemap = getSitemapContext();
	const viewer = getViewerContext();

	async function openEntry(entry: TrafficEntry) {
		viewer.activeEntry = entry;
		await goto(resolve('/viewer'));
	}
</script>

<section>
	<Table>
		<Table.Head>
			<th style:width="100%">Path</th>
			<th style:width="5rem" class="center">Method</th>
			<th style:width="5rem" class="center">Status</th>
		</Table.Head>
		<Table.Body>
			{#each sitemap.selectedEntries as entry (entry.id)}
				<Table.Row
					onclick={() => openEntry(entry)}
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

<style>
	section {
		/* Align it with sitemap's heading */
		padding-top: 2rem;

		/* Spacing */
		padding: 1rem;
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

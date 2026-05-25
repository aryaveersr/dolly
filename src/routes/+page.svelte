<script lang="ts">
	import traffic from '$lib/traffic.svelte';
	import Table from '$lib/ui/Table';
</script>

<section>
	<div>
		<Table>
			<Table.Head>
				<th style:width="20%">Host</th>
				<th style:width="100%">Path</th>
				<th style:width="5rem" class="center">Method</th>
				<th style:width="5rem" class="center">Status</th>
			</Table.Head>
			<Table.Body>
				{#each traffic.entries as entry, index (entry.id)}
					<Table.Row
						onclick={() => console.log(entry.id, index)}
						aria-label="{entry.request.method} request to {entry.request.url.toString()}"
					>
						<td>{entry.request.url.host}</td>
						<td>{entry.request.url.pathname}</td>
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
	</div>
</section>

<style>
	section {
		/* Take available height */
		height: 100%;

		/* Padding */
		padding: 2rem;
	}

	div {
		/* Take available height */
		height: 100%;

		/* Set overflow behavior */
		overflow-x: hidden;
		overflow-y: auto;
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

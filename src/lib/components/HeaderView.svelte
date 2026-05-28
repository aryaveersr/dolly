<script lang="ts">
	import Table from '$lib/ui/Table';
	import { ChevronLeft } from '@lucide/svelte';

	interface Props {
		headers: Record<string, string>;
	}

	const { headers }: Props = $props();

	let selected = $state<{ key: string; value: string } | null>(null);

	function selectHeader(key: string, value: string) {
		selected = { key, value };
	}

	function clearSelection() {
		selected = null;
	}
</script>

{#if selected}
	<div class="detail">
		<button type="button" onclick={clearSelection}>
			<ChevronLeft />
			Back
		</button>
		<label>
			Key
			<textarea readonly>{selected.key}</textarea>
		</label>
		<label>
			Value
			<textarea readonly>{selected.value}</textarea>
		</label>
	</div>
{:else}
	<Table>
		<Table.Head>
			<th style:width="35%">Name</th>
			<th style:width="65%">Value</th>
		</Table.Head>
		<Table.Body>
			{#each Object.entries(headers) as [key, value] (key)}
				<Table.Row onclick={() => selectHeader(key, value)} aria-label="{key} header">
					<td>{key}</td>
					<td>{value}</td>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table>
{/if}

<style>
	td {
		/* Force text to ellipsis */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.detail {
		/* Layout as grid */
		display: grid;

		/* Spacing */
		gap: 0.75rem;
	}

	.detail button {
		/* Reset styles*/
		border: none;
		cursor: pointer;

		/* Layout */
		display: flex;
		align-items: center;

		/* Spacing */
		gap: 0.35rem;
		padding: 0.5rem;

		/* Match font of table header */
		font-size: 14px;
		font-weight: 500;

		/* Match table header's colors */
		color: var(--gray-900);
		background-color: var(--gray-200);

		/* Take all width */
		width: 100%;

		/* Icon styles */
		& :global(.lucide) {
			width: 1rem;
			height: 1rem;
		}
	}

	.detail label {
		/* Layout for spacing */
		display: grid;
		gap: 0.35rem;

		/* Text styles */
		font-size: 14px;
		color: var(--gray-700);
	}

	.detail textarea {
		/* Take available space and allow resizing */
		width: 100%;
		min-height: 6rem;
		resize: vertical;

		/* Border styles */
		border: 1px solid var(--gray-300);
		border-radius: 6px;

		/* Spacing */
		padding: 0.5rem;

		/* Text styles and background */
		font-family: monospace;
		color: var(--gray-900);
		background-color: var(--gray-50);
	}
</style>

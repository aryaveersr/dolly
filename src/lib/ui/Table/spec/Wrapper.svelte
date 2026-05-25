<script lang="ts">
	import type { Snippet } from 'svelte';
	import Table from '../index.ts';

	interface Props {
		rows: { [key: string]: string };
		onclick?: (index: number) => void;
		before?: Snippet;
		after?: Snippet;
	}

	const { rows, onclick, before, after }: Props = $props();
</script>

{@render before?.()}
<Table>
	<Table.Head>
		<th>tableKey</th>
		<th>tableValue</th>
	</Table.Head>
	<Table.Body>
		{#each Object.entries(rows) as [key, value], index (key)}
			<Table.Row onclick={() => onclick?.(index)} aria-label={`row-btn-${key}-${value}`}>
				<td>{key}</td>
				<td>{value}</td>
			</Table.Row>
		{/each}
	</Table.Body>
</Table>
{@render after?.()}

<script lang="ts">
	import Table from '$lib/ui/Table';

	interface Props {
		headers: Record<string, string>;
	}

	const { headers }: Props = $props();
</script>

<Table>
	<Table.Head>
		<th>Name</th>
		<th>Value</th>
	</Table.Head>
	<Table.Body>
		{#each Object.entries(headers) as [key, value] (key)}
			<Table.Row onclick={() => console.log(key)} aria-label="{key} header">
				<td>{key}</td>
				<td>{value}</td>
			</Table.Row>
		{/each}
	</Table.Body>
</Table>

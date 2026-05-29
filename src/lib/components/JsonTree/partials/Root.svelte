<script lang="ts">
	import type { JSONValue } from '$lib/types/body';
	import Object from './Object.svelte';

	interface Props {
		property?: string;
		value: JSONValue;
	}

	const { property = 'root', value }: Props = $props();
</script>

<div class="container">
	{#if typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null}
		<div class="literal">
			<strong>{property}:</strong>
			{JSON.stringify(value)}
		</div>
	{:else}
		<Object {property} {value} />
	{/if}
</div>

<style>
	.container {
		/* Font */
		font-family: monospace;
		font-size: 14px;

		/* Spacing */
		padding: 1px;
	}
</style>

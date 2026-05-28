<script lang="ts">
	import type { JSONValue } from '$lib/types/body';
	import { ChevronRight } from '@lucide/svelte';
	import Root from './Root.svelte';

	interface Props {
		property?: string;
		value: { [x: string]: JSONValue } | Array<JSONValue>;
	}

	const { property = 'root', value }: Props = $props();

	let isOpen = $state(true);
	let entries = $derived(Object.entries(value));
</script>

<div class="object">
	<button tabindex="-1" onclick={() => (isOpen = !isOpen)}>
		<span class="chevron" data-open={isOpen}>
			<ChevronRight />
		</span>
		<span class="property">{property}:</span>
		<span style="margin-left: 1rem" class="braces">
			{#if Array.isArray(value)}
				[
			{:else}
				&#123;
			{/if}
		</span>
		<span>
			{#if entries.length == 1}
				<i>({entries.length}) item</i>
			{:else}
				<i>({entries.length}) items</i>
			{/if}
		</span>
		{#if !isOpen}
			<span class="braces">
				{#if Array.isArray(value)}
					]
				{:else}
					&#125;
				{/if}
			</span>
		{/if}
	</button>
	{#if isOpen}
		<div class="items">
			{#each entries as [key, val] (key)}
				<div style="padding-left: 1rem;">
					<Root property={key} value={val} />
				</div>
			{/each}
		</div>
	{/if}
	{#if isOpen}
		<span style="padding-left: 1.4rem;" class="braces">
			{#if Array.isArray(value)}
				]
			{:else}
				&#125;
			{/if}
		</span>
	{/if}
</div>

<style>
	.object {
		/* Vertical layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: 2px;
	}

	button {
		/* Reset styles */
		border: none;
		background: none;
		cursor: pointer;

		/* Layout */
		display: flex;
		align-items: center;

		/* Spacing */
		gap: 4px;
	}

	/* Chevron */
	.chevron {
		/* Layout */
		display: grid;
		place-items: center;

		/* Visual adjustment for alignment */
		margin-top: 1px;

		/* Rotation effect */
		transition: transform 0.2s ease;

		& :global(.lucide) {
			width: 1rem;
		}

		&[data-open='false'] {
			transform: rotate(0deg);
		}

		&[data-open='true'] {
			transform: rotate(90deg);
		}
	}

	.property,
	.braces {
		/* Font styles */
		font-weight: bold;
	}

	.items {
		/* Spacing */
		margin-left: 12px;
		padding-left: 4px;

		/* Border to visually connect nested items */
		border-left: 1px solid var(--gray-300);
	}
</style>

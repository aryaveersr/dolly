<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getTableContext } from '../context';
	import type { Merge } from '$lib/utils/types';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { ChevronRight } from '@lucide/svelte';

	interface Props {
		children: Snippet;
		onclick?: () => void;
	}

	const { children, onclick, ...props }: Merge<Props, HTMLButtonAttributes> = $props();
	const ctx = getTableContext();

	let index = $state<number>(-1);
	let button: HTMLButtonElement;

	function onkeydown(ev: KeyboardEvent) {
		if (ev.key === 'ArrowDown') {
			ctx.selected = (ctx.selected + 1) % ctx.counter;
			ev.preventDefault();
		} else if (ev.key === 'ArrowUp') {
			ctx.selected = (ctx.selected - 1 + ctx.counter) % ctx.counter;
			ev.preventDefault();
		}
	}

	onMount(() => (index = ctx.counter++));
	$effect(() => {
		if (ctx.selected === index) button.focus();
	});
</script>

<tr>
	{@render children()}
	<td>
		<button
			bind:this={button}
			tabindex={ctx.selected === index ? 0 : -1}
			{onkeydown}
			onclick={() => {
				ctx.selected = index;
				onclick?.();
			}}
			{...props}
		>
			<ChevronRight />
		</button>
	</td>
</tr>

<style>
	tr {
		/* Allow the button to be positioned relative to the row */
		position: relative;

		&:hover {
			background-color: var(--gray-100);
		}

		/* Visual cues for when the button is focused */
		&:focus-within {
			box-shadow: 0px 0px 0px 2px var(--gray-300);
			background-color: var(--gray-200);
		}
	}

	td {
		padding: 0px !important;
	}

	button {
		/* Reset styles */
		background: none;
		border: none;
		outline: none;

		/* Cursor change on hover */
		cursor: pointer;

		/* Center the icon */
		display: grid;
		place-items: center;

		/* Icon styles */
		& :global(.lucide) {
			color: var(--gray-500);
			width: 1.25rem;
		}
	}

	button::after {
		/* Position over the entire row */
		position: absolute;
		inset: 0;
		content: '';
	}
</style>

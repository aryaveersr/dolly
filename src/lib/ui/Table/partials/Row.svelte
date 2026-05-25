<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getTableContext } from '../context';
	import type { Merge } from '$lib/utils/types';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children: Snippet;
		onclick?: () => void;
	}

	const { children, onclick, ...props }: Merge<Props, HTMLButtonAttributes> = $props();
	const ctx = getTableContext();

	let tr: HTMLTableRowElement;
	let button: HTMLButtonElement;

	function onfocus() {
		ctx.unselectCurrent?.();
		ctx.unselectCurrent = () => (button.tabIndex = -1);
		button.tabIndex = 0;
	}

	function onkeydown(ev: KeyboardEvent) {
		if (ev.key === 'ArrowDown') tr.nextElementSibling?.querySelector('button')!.focus();
		else if (ev.key === 'ArrowUp') tr.previousElementSibling?.querySelector('button')!.focus();
	}

	onMount(() => {
		if (ctx.unselectCurrent) return;
		ctx.unselectCurrent = () => (button.tabIndex = -1);
		button.tabIndex = 0;
	});
</script>

<tr bind:this={tr}>
	{@render children()}
	<td>
		<button bind:this={button} tabindex="-1" {onfocus} {onkeydown} {onclick} {...props}></button>
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

	button {
		/* Position over the entire row */
		position: absolute;
		inset: 0;
		content: '';

		/* Reset styles */
		background: none;
		border: none;
		outline: none;

		/* Cursor change on hover */
		cursor: pointer;
	}
</style>

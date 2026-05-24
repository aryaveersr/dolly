<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTableContext } from './context';
	import type { Merge } from '$lib/utils/types';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		onclick?: (ev: MouseEvent) => void;
		index: number;
		children: Snippet;
	}

	const { children, index, onclick, ...props }: Merge<Props, HTMLButtonAttributes> = $props();
	const { handleClick, handleKeyDown } = getTableContext();
</script>

<tr>
	{@render children()}
	<td>
		<button
			tabindex="-1"
			onkeydown={handleKeyDown}
			onclick={(ev) => {
				handleClick(ev, index);
				onclick?.(ev);
			}}
			{...props}
		></button>
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

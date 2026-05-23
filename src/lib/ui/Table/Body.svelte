<script lang="ts">
	import { type Snippet } from 'svelte';
	import { setTableContext } from './context';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	let body: HTMLTableSectionElement;
	let lastFocusedIndex: number | null = null;

	const getBtn = (index: number) => body.children[index]!.querySelector('button')!;

	function handleKeyDown(ev: KeyboardEvent) {
		if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
		if (lastFocusedIndex === null) return;

		let nextIndex: number | null = null;

		if (ev.key === 'ArrowDown' && lastFocusedIndex !== body.children.length - 1) {
			nextIndex = lastFocusedIndex + 1;
		} else if (ev.key === 'ArrowUp' && lastFocusedIndex !== 0) {
			nextIndex = lastFocusedIndex - 1;
		}

		if (nextIndex !== null) {
			getBtn(nextIndex).tabIndex = 0;
			getBtn(nextIndex).focus();
			getBtn(lastFocusedIndex!).tabIndex = -1;
			lastFocusedIndex = nextIndex;
		}
	}

	function handleClick(ev: MouseEvent, index: number) {
		(ev.target as HTMLButtonElement).tabIndex = 0;
		if (lastFocusedIndex !== null) getBtn(lastFocusedIndex).tabIndex = -1;
		lastFocusedIndex = index;
	}

	setTableContext({
		handleKeyDown,
		handleClick
	});
</script>

<tbody bind:this={body}>
	{@render children()}
</tbody>

<style>
	tbody :global(td) {
		/* Spacing */
		padding: 0.25rem 0.5rem;

		/* Text styles */
		color: var(--gray-800);
	}
</style>

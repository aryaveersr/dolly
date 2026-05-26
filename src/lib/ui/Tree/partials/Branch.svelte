<script lang="ts">
	import type { Snippet } from 'svelte';
	import Node from './Node.svelte';
	import { nextVisibleNode } from '../utils';

	interface Props {
		summary: Snippet<[isOpen: boolean]>;
		children: Snippet;
		onclick?: () => void;
	}

	const { summary, children, onclick }: Props = $props();

	let hadFocusBeforeClick = false;
	let ul: HTMLUListElement;
	let isOpen = $state(false);

	function handleKeydown(ev: KeyboardEvent, li: HTMLLIElement) {
		if (ev.key === 'ArrowRight') {
			if (isOpen) ul.children[0]?.querySelector('button')!.focus();
			else isOpen = true;
		} else if (ev.key === 'ArrowLeft') {
			if (isOpen) isOpen = false;
			else li.parentElement!.closest('li[role="treeitem"]')?.querySelector('button')!.focus();
		} else if (ev.key === 'ArrowDown') {
			if (isOpen && ul.children[0]) ul.children[0].querySelector('button')!.focus();
			else if (li.nextElementSibling) li.nextElementSibling.querySelector('button')!.focus();
			else nextVisibleNode(li)?.focus();
		}
	}
</script>

<Node
	aria-expanded={isOpen}
	{handleKeydown}
	onmousedown={() => (hadFocusBeforeClick = ul.previousElementSibling!.matches(':focus'))}
	onclick={() => {
		isOpen = !(isOpen && hadFocusBeforeClick);
		onclick?.();
	}}
>
	{@render summary(isOpen)}
	{#snippet rest()}
		<ul bind:this={ul} role="group" class={[!isOpen && 'hidden']}>
			{@render children()}
		</ul>
	{/snippet}
</Node>

<style>
	/* Hide the children when the branch is closed */
	ul.hidden {
		display: none;
	}

	ul {
		/* Reset list styles */
		list-style: none;

		/* Indent indicator lines */
		padding-left: 0.75rem;
		margin-left: 0.75rem;
		border-left: 1px solid var(--gray-300);
	}
</style>

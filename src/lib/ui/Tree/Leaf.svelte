<script lang="ts">
	import type { Snippet } from 'svelte';
	import Node from './Node.svelte';
	import { nextVisibleNode } from './utils';

	interface Props {
		children: Snippet;
		onclick?: () => void;
	}

	const { children, onclick }: Props = $props();

	function handleKeydown(ev: KeyboardEvent, li: HTMLLIElement) {
		if (ev.key === 'ArrowLeft') {
			li.parentElement!.closest('li[role="treeitem"]')?.querySelector('button')!.focus();
		} else if (ev.key === 'ArrowDown') {
			if (li.nextElementSibling) li.nextElementSibling.querySelector('button')!.focus();
			else nextVisibleNode(li)?.focus();
		}
	}
</script>

<Node {children} {onclick} {handleKeydown} />

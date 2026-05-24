<script lang="ts">
	import { getTreeContext } from './context';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		onclick?: () => void;
	}

	const { children, onclick }: Props = $props();
	const ctx = getTreeContext();

	let li: HTMLLIElement;
	let button: HTMLButtonElement;

	function onfocus() {
		button.tabIndex = 0;
		li.ariaSelected = 'true';
		ctx.unselectCurrent?.();
		ctx.unselectCurrent = () => {
			button.tabIndex = -1;
			li.ariaSelected = 'false';
		};
	}

	function onkeydown(ev: KeyboardEvent) {
		if (ev.key === 'ArrowLeft' && li.parentElement?.role == 'group') {
			li.parentElement.parentElement!.querySelector('button')!.focus();
		} else if (ev.key === 'Home') {
			ctx.getRoot().children[0]?.querySelector('button')!.focus();
		} else if (ev.key === 'End') {
			let list = ctx.getRoot();
			while (list.children[list.children.length - 1]?.ariaExpanded === 'true') {
				list = list.children[list.children.length - 1]!.querySelector('ul')!;
			}

			(list.children[list.children.length - 1] ?? list.parentElement)
				.querySelector('button')!
				.focus();
		}
	}

	onMount(() => {
		if (ctx.unselectCurrent || li.parentElement?.role == 'group') return;
		button.tabIndex = 0;
		ctx.unselectCurrent = () => (button.tabIndex = -1);
	});
</script>

<li bind:this={li} role="treeitem" aria-selected="false">
	<button bind:this={button} tabindex="-1" {onfocus} {onclick} {onkeydown}>
		{@render children()}
	</button>
</li>

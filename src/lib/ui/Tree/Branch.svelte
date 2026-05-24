<script lang="ts">
	import { getTreeContext } from './context';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		control: Snippet<[isOpen: boolean]>;
		children: Snippet;
		onclick?: () => void;
	}

	const { control, children, onclick }: Props = $props();
	const ctx = getTreeContext();

	let li: HTMLLIElement;
	let ul: HTMLUListElement;
	let button: HTMLButtonElement;

	let isOpen = $state(false);

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
		if (ev.key === 'ArrowRight') {
			if (isOpen) ul.children[0]?.querySelector('button')!.focus();
			else isOpen = true;
		} else if (ev.key === 'ArrowLeft') {
			if (isOpen) isOpen = false;
			else if (li.parentElement?.role == 'group') {
				li.parentElement.parentElement!.querySelector('button')!.focus();
			}
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

<li bind:this={li} role="treeitem" aria-expanded={isOpen} aria-selected="false">
	<button
		bind:this={button}
		tabindex="-1"
		{onkeydown}
		{onfocus}
		onclick={() => {
			isOpen = !isOpen;
			onclick?.();
		}}
	>
		{@render control(isOpen)}
	</button>
	<ul bind:this={ul} role="group">
		{@render children()}
	</ul>
</li>

<style>
	/* Hide the children when the branch is closed */
	li[aria-expanded='false'] > ul {
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

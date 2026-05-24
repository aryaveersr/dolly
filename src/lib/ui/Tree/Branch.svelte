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
	let button: HTMLButtonElement;

	let isOpen = $state(false);

	function handleClick() {
		isOpen = !isOpen;

		ctx.unselectCurrent?.();
		ctx.unselectCurrent = () => {
			button.tabIndex = -1;
			li.setAttribute('aria-selected', 'false');
		};

		button.tabIndex = 0;
		li.setAttribute('aria-selected', 'true');
		onclick?.();
	}

	onMount(() => {
		if (ctx.unselectCurrent || li.parentElement?.getAttribute('role') == 'group') return;

		button.tabIndex = 0;

		ctx.unselectCurrent = () => {
			button.tabIndex = -1;
		};
	});
</script>

<li bind:this={li} role="treeitem" aria-expanded={isOpen} aria-selected="false">
	<button bind:this={button} tabindex="-1" onclick={handleClick}>
		{@render control(isOpen)}
	</button>
	<ul role="group">
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

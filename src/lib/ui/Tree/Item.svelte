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

	function handleClick() {
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

<li bind:this={li} role="treeitem" aria-selected="false">
	<button bind:this={button} tabindex="-1" onclick={handleClick}>
		{@render children()}
	</button>
</li>

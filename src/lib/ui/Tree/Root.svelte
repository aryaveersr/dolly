<script lang="ts">
	import type { Merge } from '$lib/utils/types';
	import { setTreeContext } from './context';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		children: Snippet;
	}

	const { children, ...props }: Merge<Props, SvelteHTMLElements['ul']> = $props();

	let ul = $state<HTMLUListElement>();

	setTreeContext({
		getRoot: () => ul!,
		unselectCurrent: null
	});
</script>

<ul bind:this={ul} role="tree" {...props}>
	{@render children()}
</ul>

<style>
	ul {
		/* Reset list styles */
		list-style: none;
		padding: 0;
	}
</style>

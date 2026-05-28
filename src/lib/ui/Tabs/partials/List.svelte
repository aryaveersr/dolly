<script lang="ts">
	import type { Merge } from '$lib/utils/types';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		children: Snippet;
	}

	const { children, ...props }: Merge<Props, SvelteHTMLElements['div']> = $props();
</script>

<div role="tablist" {...props}>
	{@render children()}
</div>

<style>
	div {
		/* Horizontal Layout */
		display: flex;
		align-items: center;

		/* Spacing */
		gap: 0.75rem;
	}
</style>

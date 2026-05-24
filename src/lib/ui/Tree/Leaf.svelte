<script lang="ts">
	import type { Snippet } from 'svelte';
	import Node from './Node.svelte';

	interface Props {
		children: Snippet;
		onclick?: () => void;
	}

	const { children, onclick }: Props = $props();
</script>

<Node {children} {onclick} />

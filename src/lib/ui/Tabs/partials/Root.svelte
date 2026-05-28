<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setTabContext } from '../context';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
	const uid = $props.id();

	const ctx = $state({ uid, selected: null, values: [] });
	setTabContext(ctx);
</script>

<div>
	{@render children()}
</div>

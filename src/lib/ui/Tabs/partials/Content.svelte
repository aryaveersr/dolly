<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTabContext } from '../context';

	interface Props {
		children: Snippet;
		value: string;
	}

	const { children, value }: Props = $props();
	const ctx = getTabContext();
</script>

<div
	role="tabpanel"
	id="{ctx.uid}-tab-content-{value}"
	aria-labelledby="{ctx.uid}-tab-trigger-{value}"
	class={{ hidden: ctx.selected !== value }}
>
	{@render children()}
</div>

<style>
	div.hidden {
		display: none;
	}
</style>

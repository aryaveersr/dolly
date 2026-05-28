<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getTabContext } from '../context';

	interface Props {
		children: Snippet;
		value: string;
	}

	const { children, value }: Props = $props();
	const ctx = getTabContext();

	let index: number;
	let button: HTMLButtonElement;

	function onkeydown(ev: KeyboardEvent) {
		let newIndex = -1;

		if (ev.key === 'ArrowRight') newIndex = (index + 1) % ctx.values.length;
		else if (ev.key === 'ArrowLeft') newIndex = (index - 1 + ctx.values.length) % ctx.values.length;
		else if (ev.key === 'Home') newIndex = 0;
		else if (ev.key === 'End') newIndex = ctx.values.length - 1;

		if (newIndex != -1) {
			ctx.selected = ctx.values[newIndex];
			ev.preventDefault();
		}
	}

	$effect(() => {
		if (ctx.selected === value) button.focus();
	});

	onMount(() => {
		if (ctx.selected === null) ctx.selected = value;
		index = ctx.values.push(value) - 1;
	});
</script>

<button
	bind:this={button}
	role="tab"
	type="button"
	id="{ctx.uid}-tab-trigger-{value}"
	aria-controls="{ctx.uid}-tab-content-{value}"
	aria-selected={ctx.selected === value}
	tabindex={ctx.selected === value ? 0 : -1}
	onclick={() => (ctx.selected = value)}
	{onkeydown}
>
	{@render children()}
</button>

<style>
	button {
		/* Override default styles */
		background: none;
		border: none;
		cursor: pointer;

		/* Spacing */
		padding: 0.5rem;
		padding-top: 1rem;

		/* Border styles */
		border-bottom: 2px solid transparent;

		&[aria-selected='false']:hover {
			border-bottom-color: var(--gray-500);
		}

		&[aria-selected='true'] {
			border-bottom-color: var(--gray-900);
		}
	}
</style>

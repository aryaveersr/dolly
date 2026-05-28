<script lang="ts">
	import type { Body } from '$lib/types/body';

	interface Props {
		body: Body;
	}

	const { body }: Props = $props();
</script>

<div>
	<header>
		<span>Body</span>
		<span>
			{#if body.kind == 'binary'}
				Binary (base64)
			{:else if body.kind == 'string'}
				String
			{:else if body.kind == 'json'}
				JSON
			{/if}
		</span>
	</header>

	{#if body.kind == 'empty'}
		<pre>(empty body)</pre>
	{:else if body.kind == 'binary'}
		<pre>{body.data}</pre>
	{:else if body.kind == 'string'}
		<pre>{body.data}</pre>
	{:else if body.kind == 'json'}
		<pre>{JSON.stringify(body.data, null, 2)}</pre>
	{/if}
</div>

<style>
	div {
		position: relative;
	}

	header {
		/* Take available width */
		width: 100%;

		/* Sticky */
		position: sticky;
		top: 0;

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* Style like the table header */
		background-color: var(--gray-200);

		/* Spacing */
		padding: 0.5rem 1rem;
	}
</style>

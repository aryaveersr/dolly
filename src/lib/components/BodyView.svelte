<script lang="ts">
	import type { Body } from '$lib/types/body';
	import Tabs from '$lib/ui/Tabs';
	import JsonTree from '$lib/ui/JsonTree';

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
		<Tabs>
			<Tabs.List>
				<Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
				<Tabs.Trigger value="raw">Raw</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="interactive">
				<JsonTree value={body.data} />
			</Tabs.Content>
			<Tabs.Content value="raw">
				<pre>{JSON.stringify(body.data, null, 2)}</pre>
			</Tabs.Content>
		</Tabs>
	{/if}
</div>

<style>
	header {
		/* Take available width */
		width: 100%;

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

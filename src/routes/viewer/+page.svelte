<script lang="ts">
	import viewer from '$lib/viewer.svelte';
</script>

<pre>{JSON.stringify(viewer.activeEntry, null, 2)}</pre>

<style>
	pre {
		padding: 1rem 2rem;
		width: 100%;
		overflow-wrap: anywhere;
		white-space: pre-wrap;
	}
</style>

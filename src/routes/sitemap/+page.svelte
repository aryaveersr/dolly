<script lang="ts">
	import sitemap from '$lib/sitemap.svelte';
	import Tree from '$lib/ui/Tree';
	import { ChevronDown, ChevronRight, Folder, FolderOpen, Link2 } from '@lucide/svelte';
	import type { SiteItem } from '$lib/types/sitemap';
	import type { SvelteMap } from 'svelte/reactivity';
</script>

<div class="container">
	<div class="top">
		<section class="sitemap">
			<h2 id="hosts">Hosts</h2>
			<Tree aria-labelledby="hosts">
				{#each sitemap.entries.entries() as [key, value] (key)}
					<Tree.Branch onclick={() => console.log(key)}>
						{#snippet control(isOpen)}
							{#if isOpen}
								<ChevronDown />
							{:else}
								<ChevronRight />
							{/if}
							<span>
								{key}
							</span>
						{/snippet}
						{@render renderItems(value.children)}
					</Tree.Branch>
				{/each}
			</Tree>

			{#snippet renderItems(map: SvelteMap<string, SiteItem>)}
				{#each map.entries() as [key, value] (key)}
					{#if value.kind == 'group'}
						<Tree.Branch onclick={() => console.log(value.url)}>
							{#snippet control(isOpen)}
								{#if isOpen}
									<FolderOpen />
								{:else}
									<Folder />
								{/if}
								<span>
									{key}
								</span>
							{/snippet}
							{@render renderItems(value.children)}
						</Tree.Branch>
					{:else}
						<Tree.Leaf onclick={() => console.log(value.url)}>
							<Link2 />
							<span>
								{key}
							</span>
						</Tree.Leaf>
					{/if}
				{/each}
			{/snippet}
		</section>
		<section class="entries"></section>
	</div>
	<section class="viewer"></section>
</div>

<style>
	.sitemap {
		padding: 1rem;
	}
</style>

<script lang="ts">
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';
	import type { Snippet } from 'svelte';

	interface Props {
		href: ResolvedPathname;
		children: Snippet;
	}

	const { href, children }: Props = $props();
</script>

<a {href} data-active={href === page.url.pathname}>
	{@render children()}
</a>

<style>
	a {
		/* Override default styles */
		text-decoration: none;
		color: black;

		/* Spacing */
		padding: 0.5rem;

		/* Border styles */
		border-bottom: 2px solid transparent;

		&[data-active='false']:hover {
			border-bottom-color: slategray;
		}

		&[data-active='true'] {
			border-bottom-color: black;
		}
	}
</style>

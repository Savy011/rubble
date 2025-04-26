<script lang="ts">
	import { cn } from '$lib/utils/style';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAnchorAttributes, never> {
		children: Snippet;
	}

	let { children, class: className, ...props }: Props = $props();
</script>

<a {...props} class={cn('text-link underline underline-offset-4', className)}>
	{@render children()}
</a>

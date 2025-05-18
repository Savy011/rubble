<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<div
	class={className}
	in:scale={{ start: 0, delay: 200, duration: 200 }}
	out:scale={{ start: 0, duration: 200 }}
>
	{@render children()}
</div>

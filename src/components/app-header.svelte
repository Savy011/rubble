<script lang="ts">
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		href: string;
	}

	const { children, href }: Props = $props();
</script>

<h2
	class="font-archivo relative isolate m-2 flex items-center justify-center gap-2 rounded-xl bg-white/70 py-2 text-2xl font-bold backdrop-blur-sm lg:text-3xl"
>
	<a
		{href}
		class="absolute top-1/2 left-1 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-l-lg rounded-r-sm hover:bg-black/20 lg:left-2"
		><CaretLeft class="size-6" /></a
	>

	{@render children()}
</h2>

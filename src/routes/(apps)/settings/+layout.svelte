<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let { children } = $props();
</script>

<main
	class="scrollbar-none space-y-4 overflow-y-scroll p-4"
	in:fade={{ delay: 200 }}
	out:fly={{ x: '-100%', duration: 200 }}
>
	{@render children()}
</main>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let { children } = $props();
</script>

<main
	class="bg-ui-background-light dark:bg-ui-background-dark h-full"
	in:fade={{ delay: 200 }}
	out:fly={{ x: '-100%', duration: 200 }}
>
	{@render children()}
</main>

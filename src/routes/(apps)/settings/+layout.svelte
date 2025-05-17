<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let { children } = $props();
</script>

<div
	in:fade={{ delay: 200, duration: 200 }}
	out:fly={{ x: '-100%', duration: 200 }}
	class="font-sono overflow-y-scroll"
>
	{@render children()}
</div>

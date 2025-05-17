<script lang="ts">
	import { scale } from 'svelte/transition';

	let { children } = $props();
</script>

<main in:scale={{ start: 0, delay: 200, duration: 200 }} out:scale={{ start: 0, duration: 200 }}>
	{@render children()}
</main>

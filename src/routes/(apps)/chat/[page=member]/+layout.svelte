<script lang="ts">
	import { fly } from 'svelte/transition';

	let { children } = $props();
</script>

<div
	class="app"
	in:fly={{ x: '100%', duration: 200, delay: 200 }}
	out:fly={{ x: '100%', duration: 200 }}
>
	{@render children()}
</div>

<style>
	.app {
		width: 100%;
		height: calc(100% - 26px);
		position: fixed;
		display: grid;
		grid-template-rows: 56px 1fr 48px;
	}
</style>

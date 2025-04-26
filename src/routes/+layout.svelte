<script lang="ts">
	import { page } from '$app/state';

	import TopBar from '$lib/components/top-bar.svelte';

	import '@fontsource/sono';
	import '@fontsource/pacifico';
	import '../app.css';

	let { children } = $props();
	let route = $derived(page.route);
</script>

<div class="content">
	<TopBar {route} />
	{@render children()}
</div>

<style>
	div.content {
		height: 100%;
		width: 100%;
		overflow: hidden;
		position: fixed;
		display: grid;
		grid-template-rows: 30px 1fr;
		background: bisque;
	}
</style>

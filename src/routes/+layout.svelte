<script lang="ts">
	import { page } from '$app/state';

	import TopBar from '$components/top-bar.svelte';

	import '@fontsource/sono';
	import '@fontsource/pacifico';
	import '@fontsource-variable/archivo';

	import '../app.css';
	import '../splash.css';

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
		grid-template-rows: 24px 1fr;
		background: bisque;
	}

	@font-face {
		font-family: 'Fixel Variable';
		font-style: normal;
		font-display: swap;
		src: url($lib/assets/fonts/fixel-variable.ttf);
	}
</style>

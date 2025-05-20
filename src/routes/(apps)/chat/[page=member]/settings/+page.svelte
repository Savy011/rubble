<script lang="ts">
	import AppHeader from '$components/app-header.svelte';

	import { page } from '$app/state';

	let member = $derived(page.params.page);
</script>

<AppHeader href="/chat/{member}">
	<div>Chat Settings</div>
</AppHeader>

<div class="font-fixel mx-2 h-fit rounded-2xl bg-white/70 px-3 py-2 text-center">
	This Feature is yet to be implemented...
</div>

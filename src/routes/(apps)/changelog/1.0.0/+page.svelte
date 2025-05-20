<script lang="ts">
	import V1 from '$changelog/v1.0.0.svelte';
	import AppHeader from '$components/app-header.svelte';
</script>

<svelte:head>
	<title>v1.0.0 | rubble</title>
</svelte:head>

<div class="sticky top-2">
	<AppHeader href="/changelog">
		<div>v1.0.0</div>
	</AppHeader>
</div>

<div class="max-w-lg lg:mx-auto">
	<V1 />
</div>

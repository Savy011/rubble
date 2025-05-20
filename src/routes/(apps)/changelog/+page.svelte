<script lang="ts">
	import AppHeader from '$components/app-header.svelte';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
</script>

<AppHeader href="/">
	<div>Changelog</div>
</AppHeader>

<svelte:head>
	<title>Changelog | rubble</title>
</svelte:head>

<a href="/changelog/1.0.0">
	<div
		class="font-fixel relative mx-2 flex max-w-lg items-center justify-between rounded-2xl bg-white/70 px-3 py-2 hover:brightness-90 lg:mx-auto"
	>
		<p>v1.0.0</p>

		<CaretRight class="size-6" />
	</div>
</a>

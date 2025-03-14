<script lang="ts">
	import { onMount } from 'svelte';
	import BatteryFull from 'phosphor-svelte/lib/BatteryFull';
	import CellSignalHigh from 'phosphor-svelte/lib/CellSignalHigh';
	import '../app.css';
	let { children } = $props();

	let time = $state(new Date());

	let hours = $derived(time.getHours());
	let minutes = $derived(time.getMinutes());

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="content">
	<div class="flex justify-between p-1 px-2 font-mono">
		<span>
			{(hours % 12).toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
			{(hours * 1.0) / 12 > 1 ? 'pm' : 'am'}
		</span>

		<span class="flex gap-2">
			<CellSignalHigh class="size-6" weight="fill" />
			<BatteryFull class="size-6" weight="fill" /></span
		>
	</div>
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

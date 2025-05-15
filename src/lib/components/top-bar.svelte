<script lang="ts">
	import { onMount } from 'svelte';
	import BatteryFull from 'phosphor-svelte/lib/BatteryFull';
	import CellSignalHigh from 'phosphor-svelte/lib/CellSignalHigh';

	type Props = {
		route: { id: string | null };
	};

	let { route }: Props = $props();

	let time = $state(new Date());

	let hours = $derived(time.getHours());
	let minutes = $derived(time.getMinutes());
	let meridiem = $derived((hours * 1.0) / 12 > 1 ? ('pm' as const) : ('am' as const));

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div
	class="font-sono flex items-center justify-between px-2 py-0.5 transition-colors duration-200 ease-in-out {route.id ===
	'/(home)'
		? 'bg-none'
		: 'bg-white'}"
>
	<span class="text-sm">
		{#if meridiem === 'am'}
			{(hours % 12).toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
		{:else}
			{(hours % 12).toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
		{/if}
		{meridiem}
	</span>

	<span class="flex gap-1">
		<CellSignalHigh class="size-5" weight="fill" />
		<BatteryFull class="size-5" weight="fill" /></span
	>
</div>

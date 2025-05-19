<script lang="ts">
	import { onMount } from 'svelte';
	import BatteryFull from 'phosphor-svelte/lib/BatteryFull';
	import CellSignalHigh from 'phosphor-svelte/lib/CellSignalHigh';
	import moment from 'moment';

	type Props = {
		route: { id: string | null };
	};

	let { route }: Props = $props();

	let time = $state(moment());

	onMount(() => {
		const interval = setInterval(() => {
			time = moment();
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
		{time.format('hh:mma')}
	</span>

	<span class="flex gap-1">
		<CellSignalHigh class="size-5" weight="fill" />
		<BatteryFull class="size-5" weight="fill" /></span
	>
</div>

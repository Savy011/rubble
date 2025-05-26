<script lang="ts">
	import BatteryFull from 'phosphor-svelte/lib/BatteryFull';
	import CellSignalHigh from 'phosphor-svelte/lib/CellSignalHigh';
	import { SvelteDate } from 'svelte/reactivity';

	type Props = {
		route: { id: string | null };
	};

	let { route }: Props = $props();

	let time = new SvelteDate();

	const formatter = new Intl.DateTimeFormat(undefined, {
		hourCycle: 'h12',
		hour: '2-digit',
		minute: '2-digit',
	});

	$effect(() => {
		const interval = setInterval(() => {
			time.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div
	class="font-sono flex items-center justify-between px-2 py-0.5 transition-colors duration-200 ease-in-out {route.id ===
	'/(home)'
		? 'bg-none'
		: 'bg-white'}"
>
	<span class="text-sm">
		{formatter.format(time)}
	</span>

	<span class="flex gap-1">
		<CellSignalHigh class="size-5" weight="fill" />
		<BatteryFull class="size-5" weight="fill" /></span
	>
</div>

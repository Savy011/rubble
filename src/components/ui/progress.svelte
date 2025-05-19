<script lang="ts">
	import { Meter, useId } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof Meter.Root> {
		label: string;
		valueLabel: string;
	}

	let { max = 100, min = 0, value = 0, label, valueLabel }: Props = $props();

	const usedPercentage = $derived((value / max) * 100);
	const percentageRemaining = $derived(100 - usedPercentage);

	const color = $derived.by(() => {
		if (percentageRemaining < 25)return 'bg-green-500 dark:bg-green-400';
		if (percentageRemaining < 50) return 'bg-yellow-500 dark:bg-yellow-400';
		if (percentageRemaining < 75) return 'bg-orange-500 dark:bg-orange-400';
		return 'bg-red-500 dark:bg-red-400';
	});

	const labelId = useId();
</script>

<div class="my-2">
	<div class="flex justify-between">
		<span id={labelId}>{label}</span>
		<span>{valueLabel}</span>
	</div>
	<Meter.Root
		aria-labelledby={labelId}
		aria-valuetext={valueLabel}
		{value}
		{min}
		{max}
		class="shadow-mini-inset relative isolate h-2 overflow-hidden rounded-full bg-gray-400"
	>
		<div
			class="shadow-mini-inset h-full w-full flex-1 rounded-full transition-all duration-1000 ease-in-out {color}"
			style="transform: translateX(-{100 - (100 * (value ?? 0)) / max}%);"
		></div>
	</Meter.Root>
</div>

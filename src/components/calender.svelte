<script lang="ts">
	import { formatDay, formatMonth } from '$lib/utils/format';
	import { IMP_EVENTS } from '$lib/constants';

	let date = $state(new Date());
	let curr = $derived([date.getMonth(), date.getDate()] as const);

	let labels = $derived.by(() => {
		let arr: string[] = [];

		for (let event of IMP_EVENTS) {
			const [month, date] = event.date;
			const [currMonth, currDate] = curr;

			if (month === currMonth && date === currDate) {
				arr.push(event.label);
			}
		}

		return arr;
	});
</script>

<div class="font-archivo col-span-2 row-span-2 flex flex-col justify-center p-1">
	<div class="aspect-w-1 aspect-h-1 flex flex-1 items-center lg:p-8">
		<div
			class="flex aspect-square h-full w-full flex-col justify-between rounded-2xl bg-orange-700 p-2"
		>
			<div class="px-2 pt-1">
				<p class="text-xl text-[bisque]">{formatMonth(date.getMonth())}</p>
				<p class="text-base text-[bisque]">{formatDay(date.getDay())}</p>
				<p class="text-5xl text-[bisque]">{date.getDate()}</p>
			</div>

			<div>
				{#if labels.length >= 1}
					{#each labels as label}
						<p class="relative rounded-md bg-[bisque]/50 px-2 text-right">
							<span class="absolute left-0 h-full w-2 rounded-md bg-[bisque]"></span>
							{label}
						</p>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<p class="pt-2 text-center">Caleeender</p>
</div>

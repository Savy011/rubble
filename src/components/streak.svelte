<script lang="ts">
	import { twemojify } from 'svelte-twemojify';

	let startDate = new Date('2022-01-24');
	let currentDate = $state(new Date());
	let streak = $derived(
		((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0)
	);
</script>

<div
	class="absolute bottom-0 z-10 m-0 -ml-3 flex w-screen translate-y-full items-center justify-center gap-2 rounded-b-2xl bg-white py-1 text-base"
	use:twemojify={{ className: 'size-4' }}
>
	<span class="font-pacifico">rubble</span>
	<div>❤️</div>
	<span class="font-bold">+{streak}</span>
</div>

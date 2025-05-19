<script lang="ts">
	import moment from 'moment';
	import { twemojify } from 'svelte-twemojify';

	let startDate = moment([2022, 0, 24]);
	let currentDate = $state(moment());
	let streak = $derived(currentDate.diff(startDate, 'days'));
</script>

<div
	class="absolute bottom-0 z-10 m-0 -ml-3 flex w-screen translate-y-full items-center justify-center gap-2 rounded-b-2xl bg-white py-1 text-base select-none"
	use:twemojify={{ className: 'size-4' }}
>
	<span class="font-pacifico">rubble</span>
	<div>❤️</div>
	<span class="font-bold">+{streak}</span>
</div>

<script lang="ts">
	import moment from 'moment';
	import { twemojify } from 'svelte-twemojify';

	let startDate = moment([2022, 0, 24]);
	let currentDate = $state(moment());
	let streak = $derived(currentDate.diff(startDate, 'days'));
</script>

<div
	class="absolute right-0 bottom-0 left-0 z-10 m-0 flex translate-y-full items-center justify-center gap-2 rounded-b-2xl bg-white py-1 text-base select-none"
	use:twemojify={{ className: 'size-4' }}
>
	<span class="font-pacifico">rubble</span>
	<div>❤️</div>
	<span class="font-bold">+{streak}</span>
</div>

<script lang="ts">
	import { formatDay } from '$lib/utils/format';
	import Weverse from '$lib/components/icons/weverse.svelte';
	import { APPS, LOCAL_STORAGE_KEYS } from '$lib/constants';

	import { twemojify } from 'svelte-twemojify';
	import Gear from 'phosphor-svelte/lib/GearSix';
	import { PersistedState } from 'runed';
	import { flip } from 'svelte/animate';

	let date = $state(new Date());

	let enabledMembers = new PersistedState<string[]>(LOCAL_STORAGE_KEYS.memberShortcuts, []);
	let enabledApps = $derived(
		APPS.filter((el) => enabledMembers.current.includes(el.label.toLowerCase()))
	);
</script>

<div
	use:twemojify
	class="grid grid-cols-4 grid-rows-4 justify-between sm:grid-cols-6 sm:grid-rows-4"
>
	<div class="col-span-2 row-span-2">
		<div class="m-4 aspect-square rounded-2xl bg-orange-700 p-4">
			<div class="text-xl">{formatDay(date.getDay())}</div>
			<div class="text-7xl text-yellow-300">{date.getDate()}</div>
		</div>
		<div class="text-center">Caleeender</div>
	</div>
	{#each enabledApps as { href, ...app } (href)}
		<div
			class="group relative isolate flex flex-col items-center justify-center"
			animate:flip={{ duration: 100 }}
		>
			<div class="m-4 mb-2 flex size-18 items-center justify-center rounded-2xl bg-orange-700">
				<div class="size-10">
					{app.icon}
				</div>
			</div>
			<div class="text-center">
				<a {href}><span class="absolute inset-0 z-10"></span>{app.label}</a>
			</div>
		</div>
	{/each}

	<div class="relative isolate flex flex-col items-center justify-center">
		<div
			class="m-4 mb-2 flex size-18 items-center justify-center rounded-2xl bg-orange-700 text-4xl"
		>
			<Weverse />
		</div>
		<div class="text-center">
			<a href="https://weeekly-weverse.yvas.me"
				><span class="absolute inset-0 z-10"></span>Weverse</a
			>
		</div>
	</div>
</div>

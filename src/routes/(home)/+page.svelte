<script lang="ts">
	import Weverse from '$components/icons/weverse.svelte';
	import { APPS, LOCAL_STORAGE_ITEMS } from '$lib/constants';

	import { twemojify } from 'svelte-twemojify';
	import { PersistedState } from 'runed';
	import Calender from '$components/calender.svelte';

	let enabledMembers = new PersistedState<string[]>(
		LOCAL_STORAGE_ITEMS.memberShortcuts.key,
		LOCAL_STORAGE_ITEMS.memberShortcuts.default
	);
	let enabledApps = $derived(
		APPS.filter((app) => enabledMembers.current.includes(app.label.toLowerCase()))
	);
</script>

<div
	use:twemojify
	class="grid h-min grid-cols-4 grid-rows-3 justify-between gap-2 p-2 sm:grid-cols-6 sm:grid-rows-4"
>
	<Calender />

	{#each enabledApps as { href, ...app } (href)}
		<div class="group relative isolate flex h-fit w-fit flex-col items-center justify-center p-1">
			<div class="mb-2 flex size-16 items-center justify-center rounded-2xl bg-orange-700">
				<div class="size-9">
					{app.icon}
				</div>
			</div>
			<div class="text-center">
				<a {href}><span class="absolute inset-0 z-10"></span>{app.label}</a>
			</div>
		</div>
	{/each}

	<div class="relative isolate flex h-fit w-fit flex-col items-center justify-center p-1">
		<div class="mb-2 flex size-16 items-center justify-center rounded-2xl bg-orange-700 text-4xl">
			<Weverse />
		</div>
		<div class="text-center">
			<a href="https://weeekly-weverse.yvas.me"
				><span class="absolute inset-0 z-10"></span>Weverse</a
			>
		</div>
	</div>
</div>

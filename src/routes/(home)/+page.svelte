<script lang="ts">
	import Weverse from '$components/icons/weverse.svelte';
	import { APPS, LOCAL_STORAGE_ITEMS } from '$lib/constants';

	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';

	import { twemojify } from 'svelte-twemojify';
	import { PersistedState } from 'runed';
	import Calender from '$components/calender.svelte';
	import Dialog from '$components/ui/dialog/index.svelte';

	let enabledMembers = new PersistedState<string[]>(
		LOCAL_STORAGE_ITEMS.memberShortcuts.key,
		LOCAL_STORAGE_ITEMS.memberShortcuts.default
	);

	let firstRunDialogIsOpen = $state(true);

	let enabledApps = $derived(
		APPS.filter((app) => enabledMembers.current.includes(app.label.toLowerCase()))
	);

	let firstRun = new PersistedState<boolean>(
		LOCAL_STORAGE_ITEMS.firstRun.key,
		LOCAL_STORAGE_ITEMS.firstRun.default
	);
</script>

<svelte:head>
	<title>Home | rubble</title>
</svelte:head>

<div
	use:twemojify
	class="grid max-h-fit grid-cols-4 grid-rows-3 justify-between gap-2 p-2 sm:grid-cols-6 sm:grid-rows-4 lg:gap-y-16"
>
	<Calender />

	{#each enabledApps as { href, ...app } (href)}
		<div class="relative isolate mx-auto flex h-fit w-fit flex-col items-center justify-center p-1">
			<div class="mb-2 flex size-16 items-center justify-center rounded-2xl bg-orange-700">
				<div class="size-9">
					{app.icon}
				</div>
			</div>
			<div class="font-archivo text-center">
				<a {href}><span class="absolute inset-0 z-10"></span>{app.label}</a>
			</div>
		</div>
	{/each}

	<div class="relative isolate mx-auto flex h-fit w-fit flex-col items-center justify-center p-1">
		<div class="mb-2 flex size-16 items-center justify-center rounded-2xl bg-orange-700 text-4xl">
			<Weverse />
		</div>
		<div class="font-archivo text-center">
			<a href="https://weeekly-weverse.yvas.me"
				><span class="absolute inset-0 z-10"></span>Weverse</a
			>
		</div>
	</div>
</div>

{#if firstRun.current}
	<Dialog bind:open={firstRunDialogIsOpen} disableClose>
		{#snippet title()}
			Welcome to <span class="font-pacifico font-normal">rubble</span>
		{/snippet}

		<p class="text-sm">
			To personalize your experience, please take a moment to set your name in the Settings app.
			While you're there, you can also pin chats from your favorite Weeekly members for easy access.
		</p>
		<p class="text-sm">Enjoy exploring!</p>

		{#snippet buttonRight()}
			<button
				onclick={() => {
					firstRun.current = false;
					firstRunDialogIsOpen = false;
				}}
				class="font-fixel flex-1 rounded-sm rounded-br-2xl bg-amber-50 p-2 text-center text-sm hover:brightness-90"
			>
				Ok
			</button>
		{/snippet}
	</Dialog>
{/if}

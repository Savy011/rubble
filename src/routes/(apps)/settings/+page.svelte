<script lang="ts">
	import Switch from '$components/ui/switch.svelte';
	import { PersistedState } from 'runed';

	import { slide } from 'svelte/transition';

	import { MEMBER_LIST, LOCAL_STORAGE_ITEMS } from '$lib/constants';
	import AppHeader from '$components/app-header.svelte';
	import Dialog from '$components/ui/dialog/index.svelte';
	import GearSix from 'phosphor-svelte/lib/GearSix';

	let memberShortcuts = new PersistedState<string[]>(
		LOCAL_STORAGE_ITEMS.memberShortcuts.key,
		LOCAL_STORAGE_ITEMS.memberShortcuts.default
	);
	let displayName = new PersistedState(
		LOCAL_STORAGE_ITEMS.displayName.key,
		LOCAL_STORAGE_ITEMS.displayName.default
	);

	let name = $state(displayName.current);
	let dialogIsOpen = $state(true);

	function handleToggle(member: string, state: boolean) {
		if (state && !memberShortcuts.current.includes(member)) {
			memberShortcuts.current = [...memberShortcuts.current, member];
		} else if (!state) {
			memberShortcuts.current = memberShortcuts.current.filter((m) => m !== member);
		}
	}

	function handleReset() {
		for (const setting of Object.entries(LOCAL_STORAGE_ITEMS)) {
			console.log(setting);
		}
	}

	const bruh = `
<section class="p-3">
	<h3 class="mb-1 text-2xl font-bold">Reset Settings</h3>
	<p class="text-error font-archivo text-xs font-light">
		Reset all settings to their default values.
	</p>

	<Dialog bind:open={dialogIsOpen} buttonText="Reset">
		{#snippet title()}
			Reset All Settings
		{/snippet}
		{#snippet description()}
			Precoeeding will reset all of ze settings, bro
		{/snippet}
		<div class="rounded-t-sm rounded-b-2xl bg-white/70 p-2">
			<p>R U Sure, Bro?</p>

			<div class="flex w-full">
				<div class="flex-1"></div>
				<button
					onclick={handleReset}
					class="bg-error cursor-pointer rounded-sm rounded-br-lg px-4 py-2 transition-[brightness] duration-200 hover:brightness-90"
					>DELET</button
				>
			</div>
		</div>
	</Dialog>
</section>
`;
</script>

<div class="sticky top-2">
	<AppHeader href="/">
		<div class="flex items-center gap-2">
			Settings
			<GearSix class="size-6 lg:size-8" weight="fill" />
		</div>
	</AppHeader>
</div>

<main class="max-w-lg lg:mx-auto">
	<section class="p-3">
		<h3 class="font-archivo mb-1 text-xl font-bold">Display Name</h3>
		<p class="font-archivo text-xs font-light text-black/60">
			Set your name which will be used in chats.
		</p>

		<div class="mt-2 w-full rounded-2xl bg-white/70 px-2 py-2 select-none">
			<div class="flex items-center justify-between">
				<input
					bind:value={name}
					class="h-full w-full border border-black/30 px-2 py-2 transition-[border-radius] duration-200 {name ===
					displayName.current
						? 'rounded-xl'
						: 'rounded-md rounded-t-xl'}"
				/>
			</div>

			{#if name !== displayName.current}
				<div
					transition:slide={{ duration: 200 }}
					class={['flex gap-2', name !== displayName.current && 'mt-2']}
				>
					<div class="grow"></div>
					<button
						onclick={() => (name = displayName.current)}
						class="bg-error cursor-pointer rounded-md rounded-r-lg px-4 py-2 transition-[brightness] duration-200 hover:brightness-90"
						>Clear</button
					>
					<button
						onclick={() => (displayName.current = name)}
						class="bg-success cursor-pointer rounded-md rounded-br-lg px-4 py-2 transition-[brightness] duration-200 hover:brightness-75"
						>Update</button
					>
				</div>
			{/if}
		</div>
	</section>

	<section class="p-3">
		<h3 class="mb-1 text-2xl font-bold">Member Shortcuts</h3>
		<p class="font-archivo text-xs font-normal text-black/60">
			Add shortcuts for chats for members to the Home page
		</p>

		<div class="mt-2 space-y-0.5">
			{#each MEMBER_LIST as member}
				<div
					class="flex w-full items-center justify-between rounded-md bg-white/70 px-4 py-2 select-none first:rounded-t-2xl last:rounded-b-2xl"
				>
					<span
						>{member
							.split('')
							.map((c, idx) => (idx === 0 ? c.toUpperCase() : c))
							.join('')}</span
					>

					<Switch
						checked={memberShortcuts.current.includes(member)}
						onCheckedChange={(e) => handleToggle(member, e.valueOf())}
					/>
				</div>
			{/each}
		</div>
	</section>
</main>

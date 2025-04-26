<script lang="ts">
	import Switch from '$lib/components/ui/switch.svelte';
	import { PersistedState } from 'runed';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';

	import { slide } from 'svelte/transition';

	import { MEMBER_LIST, LOCAL_STORAGE_KEYS } from '$lib/constants';

	let memberShortcuts = new PersistedState<string[]>(LOCAL_STORAGE_KEYS.memberShortcuts, []);
	let displayName = new PersistedState(LOCAL_STORAGE_KEYS.displayName, '');

	let name = $state(displayName.current);

	function handleToggle(member: string, state: boolean) {
		if (state && !memberShortcuts.current.includes(member)) {
			memberShortcuts.current = [...memberShortcuts.current, member];
		} else if (!state) {
			memberShortcuts.current = memberShortcuts.current.filter((m) => m !== member);
		}
	}
</script>

<h1 class="flex items-center text-4xl font-extrabold">
	<a class="inline-flex size-8" href="/"><CaretLeft class="size-8" /></a>Settings
</h1>

<section>
	<h3 class="mb-1 text-2xl font-bold">Display Name</h3>
	<p class="text-xs text-black/60">Set your name which will be used in chats.</p>

	<div class="mt-2 w-full rounded-2xl bg-white/70 px-2 py-2 select-none">
		<div class="flex items-center justify-between">
			<input
				bind:value={name}
				class={[
					'h-full w-full  border border-black/30 px-2 py-2 transition-[border-radius] duration-200',
					name === displayName.current ? 'rounded-xl' : 'rounded-md rounded-t-xl'
				]}
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

<section>
	<h3 class="mb-1 text-2xl font-bold">Member Shortcuts</h3>
	<p class="text-xs text-black/60">Add shortcuts for chats for members to the Home page</p>

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

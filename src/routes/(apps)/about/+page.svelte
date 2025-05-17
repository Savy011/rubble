<script lang="ts">
	import Heart from 'phosphor-svelte/lib/HeartStraight';
	import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';

	import Link from '$components/link.svelte';
	import AppHeader from '$components/app-header.svelte';
	import { capitalize } from '$lib/utils/format';
	import { CHAT_CREDITS } from '$lib/constants';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const tabs = ['credits', 'progress'] as const;
	type Tabs = (typeof tabs)[number];

	let query = $derived(page.url.searchParams);
	let activeTab = $state<Tabs>('credits');

	let activeTabQuery = $derived(query.get('tab') ?? 'acknowlegdements');

	function handleTabChange(tab: Tabs) {
		activeTab = tab;
		goto(`/about?tab=${tab}`);
	}
</script>

<div class="sticky top-2">
	<AppHeader href="/">
		<div>About</div>
	</AppHeader>
</div>

<header class="mx-2 mb-2 space-y-3 rounded-2xl bg-white/70 p-2">
	<div class="mx-auto size-20 rounded-full bg-white p-2">
		<ChatCircleDots weight="fill" class="mx-auto size-16" />
	</div>
	<h1 class="font-pacifico text-center text-5xl">rubble</h1>
</header>

<div class="mx-2 flex gap-2 rounded-t-2xl rounded-b-sm bg-white/70 p-2">
	{#each tabs as tab, idx (tab)}
		<button
			onclick={() => handleTabChange(tab)}
			class="font-fixel flex-1 rounded-sm py-2 font-bold transition-colors duration-200 hover:bg-black/25 {idx ===
			0
				? 'rounded-tl-xl'
				: 'rounded-tr-xl'} {activeTab === tab ? 'bg-black/30' : 'bg-black/10'}"
		>
			{capitalize(tab)}
		</button>
	{/each}
</div>

{#if activeTab === 'credits'}
	<section
		class="mx-2 mt-1 space-y-1"
		in:fly={{ x: '-100%', duration: 300, delay: 300 }}
		out:fly={{ x: '-100%', duration: 300 }}
	>
		{#each CHAT_CREDITS as credit, idx}
			<div
				class="rounded-sm bg-white/70 p-2 px-4 {idx === CHAT_CREDITS.length - 1 && 'rounded-b-2xl'}"
			>
				<p class="text-center">
					<b>{credit.member}:</b>
					{#each credit.peeps as peep, idx}
						{#if idx !== 0}
							,
						{/if}
						{#if peep.link}
							<Link href={peep.link}>{peep.name}</Link>
						{:else}
							{peep.name}
						{/if}
					{/each}
				</p>
			</div>
		{/each}
	</section>
{:else if activeTab === 'progress'}
	<section
		class="mx-2 mt-1 space-y-1"
		in:fly={{ x: '100%', duration: 300, delay: 300 }}
		out:fly={{ x: '-100%', duration: 300 }}
	>
		<div class="rounded-sm bg-white/70 p-2 px-4">Progress</div>
		{#each Array(20), idx}
			<div class="{idx === 19 ? 'rounded-t-sm rounded-b-2xl' : 'rounded-sm'} bg-white/70 p-2 px-4">
				Box {idx + 1}
			</div>
		{/each}
	</section>
{/if}

<footer class="m-2 rounded-2xl bg-white/70 p-2 px-4">
	<p class="flex items-center justify-center gap-0.5 text-center">
		We are your Daileees to the end
		<Heart class="fill-orchid-bloom inline" weight="fill" />
		<Heart class="fill-banana-cream inline" weight="fill" />
		<Heart class="fill-beach-glass inline" weight="fill" />
	</p>
</footer>

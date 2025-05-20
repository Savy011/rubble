<script lang="ts">
	import Heart from 'phosphor-svelte/lib/HeartStraight';
	import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';
	import Question from 'phosphor-svelte/lib/Question';

	import Link from '$components/link.svelte';
	import AppHeader from '$components/app-header.svelte';
	import { capitalize } from '$lib/utils/format';
	import { CHAT_CREDITS, APPS, type MemberList } from '$lib/constants';
	import { getProgress } from '$lib/progress';
	import { fly } from 'svelte/transition';
	import Progress from '$components/ui/progress.svelte';

	const tabs = ['credits', 'progress'] as const;
	type Tabs = (typeof tabs)[number];

	let activeTab = $state<Tabs>('credits');

	const regex = new RegExp(/[Rr]ubble/g);

	const description =
		"Rubble is an archive platform that preserves messages from Weeekly members from the 'Bubble for IST' messaging app. Our app organizes exported chat data from 'Bubble for IST' conversations, making these interactions accessible through a simple, user-friendly interface.".replaceAll(
			regex,
			"<span class='font-pacifico'>rubble</span>"
		);

	function handleTabChange(tab: Tabs) {
		activeTab = tab;
	}
</script>

<svelte:head>
	<title>About | rubble</title>
</svelte:head>

<div class="sticky top-2">
	<AppHeader href="/">
		<div>About</div>
	</AppHeader>
</div>

<main class="max-w-lg lg:mx-auto">
	<header class="font-fixel mx-2 mb-2 space-y-1">
		<div class="space-y-3 rounded-t-2xl rounded-b-sm bg-white/70 p-2">
			<div class="mx-auto size-20 rounded-full bg-white p-2">
				<ChatCircleDots weight="fill" class="mx-auto size-16" />
			</div>
			<h1 class="font-pacifico text-center text-5xl">rubble</h1>
			<p class="text-center text-xl">v1.0.0</p>
		</div>
		<div class="font-fixel rounded-t-sm rounded-b-2xl bg-white/70 p-2 text-center">
			<h4 class="font-archivo text-2xl font-bold">
				What is <span class="font-pacifico font-normal">rubble</span>?
			</h4>
			<p class="text-sm">{@html description}</p>
		</div>
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
			<div class="rounded-sm bg-white/70 p-2 px-4">
				<p class="text-center text-sm">
					I'd like to express sincere thanks to Juwee and Deisi for their early support of this
					project. Special appreciation goes to Charisma, Mys, Deisi, and Juwee for providing
					thoughtful feedback during development. Thanks to Nana for helping me connect with Angie,
					WeeeklyFD, and Khennie, whose generous sharing of chat exports made this archive a
					reality.
				</p>
			</div>
			<div class="rounded-sm bg-white/70 p-2 px-4">
				<p class="text-center text-xl">
					<b>Message Credits</b>
				</p>
			</div>
			{#each CHAT_CREDITS as credit, idx}
				<div
					class="rounded-sm bg-white/70 p-2 px-4 {idx === CHAT_CREDITS.length - 1 &&
						'rounded-b-2xl'}"
				>
					<p class="font-fixel text-center">
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
			out:fly={{ x: '100%', duration: 300 }}
		>
			{#each APPS as member, idx}
				{@const stats = getProgress(member.label.toLowerCase() as MemberList)}
				<div
					class="{idx === APPS.length - 1
						? 'rounded-t-sm rounded-b-2xl'
						: 'rounded-sm'} font-fixel bg-white/70 p-4"
				>
					<h3 class="font-archivo mb-4 flex items-center justify-between text-2xl font-bold">
						<span>{member.fullName}</span>
						<img
							src={member.pfp}
							class="inline-flex size-10 rounded-full"
							alt="{member.fullName}'s Profile"
						/>
					</h3>

					{#if member.label === 'Soeun' || member.label === 'Jaehee'}
						<p class="text-center text-sm">Missing Chats from 25th Dec, 2024 Onwards</p>
					{/if}

					{#if !stats.error}
						{#each stats as stat}
							{#if stat.total === 0}
								<div class="flex justify-between">
									<span>{capitalize(stat.category)}</span>
									<span>N/A</span>
								</div>
							{:else}
								<Progress
									label={capitalize(stat.category)}
									valueLabel="{stat.completed} / {stat.total}"
									value={stat.completed}
									max={stat.total}
								/>
							{/if}
						{/each}
					{:else}
						<div class="flex w-full items-center justify-center">
							<Question class="size-6" weight="fill" />
							{stats.error}
						</div>
					{/if}
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

	<div class="m-2 rounded-2xl bg-white/70 p-2 px-4">
		<p class="text-center text-sm">
			<b>Note:</b> This is a fan-created archive project with no direct affiliation to Weeekly or the
			official Bubble app. All content is preserved for fan reference only.
		</p>
	</div>
</main>

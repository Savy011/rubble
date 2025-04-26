<script lang="ts">
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import Dots from 'phosphor-svelte/lib/DotsThreeOutlineVertical';
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import Translate from 'phosphor-svelte/lib/Translate';
	import Smiley from 'phosphor-svelte/lib/Smiley';
	import { twemojify } from 'svelte-twemojify';

	import type { PageProps } from './$types';
	import Streak from '$lib/components/streak.svelte';
	import moment from 'moment';
	import MessageContainer from '$lib/components/message-container.svelte';
	import { page } from '$app/state';

	let { data }: PageProps = $props();

	let query = $derived(page.url.searchParams);
	let member = $derived(data.member);
	let messages = $state(data.messages);

	let upperIntersection: HTMLDivElement | null = $state(null);
	let lowerIntersection: HTMLDivElement | null = $state(null);

	let chatsPage = $derived(Number.parseInt(query.get('page') ?? '1'));

	$effect(() => {
		function handleIntersection() {
			console.log('time to load more baby >:)');
			loadNextMessages();
		}
		const observer = new IntersectionObserver(handleIntersection, {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		});
		if (lowerIntersection) {
			observer.observe(lowerIntersection);
		}

		return () => observer.disconnect();
	});

	$inspect(messages);

	async function loadNextMessages() {
		let newPage = chatsPage + 1;

		const res = (
			await (
				await fetch(`/api/messages?page=${newPage}&member=${member.label.toLowerCase()}`)
			).json()
		).messages.map((m) => ({ ...m, time: moment(m.time).toDate() }));

		messages = [...messages, ...res];
	}
</script>

<div class="relative flex h-full w-full items-center justify-between bg-white px-3 text-2xl">
	<a href="/chat">
		<CaretLeft />
	</a>

	<span
		class="absolute left-1/2 flex -translate-x-1/2 items-center gap-1"
		use:twemojify={{ className: 'size-5' }}>{member.nickname}</span
	>

	<div class="flex items-center justify-center gap-4">
		<a href={member.href + '#'}>
			<MagnifyingGlass />
		</a>
		<a href={member.href + '/settings'}>
			<Dots weight="fill" />
		</a>
	</div>

	<Streak />
</div>

<div class="chat scrollbar-none relative overflow-y-scroll">
	{#if messages}
		<div id="upper-intersection" bind:this={upperIntersection}></div>

		{#each messages as message, idx (message.id)}
			{@const prev = idx > 0 ? messages[idx - 1] : null}
			{@const next = idx < messages.length ? messages[idx + 1] : null}

			{#if prev}
				{#if prev.time.getDay() !== message.time.getDay()}
					<div class="flex items-center">
						<span class="mx-4 h-px flex-1 bg-black/10"></span>
						<span class="text-center text-sm">{moment(message.time).format('MMMM  DD, YYYY')}</span>
						<span class="mx-4 h-px flex-1 bg-black/10"></span>
					</div>
				{/if}
			{/if}

			{#if prev}
				{@const prevIsRecent = Math.abs(prev.time.getMinutes() - message.time.getMinutes()) < 2}
				{#if prevIsRecent && prev.type === 'text'}
					<div class="mx-4 my-1 flex gap-2">
						<div class="relative ml-12 flex flex-col gap-2">
							<MessageContainer {message} />

							<div class="text-muted absolute right-0 bottom-0 translate-x-full pl-1 text-xs">
								{moment(message.time).format('h:mma')}
							</div>
						</div>
					</div>
				{:else}
					<div class="mx-4 my-2 flex gap-2">
						<div class="aspect-square size-10 overflow-hidden rounded-full">
							<img alt={member.label} src={member.pfp} />
						</div>
						<div class="relative flex flex-col gap-2">
							<div class="flex items-center gap-2">
								<div
									class="rounded-full bg-linear-to-br from-pink-400 to-pink-200 px-3 py-1 text-xs font-bold text-white"
								>
									FRIEND
								</div>
								<div>{member.nickname}</div>
							</div>

							<MessageContainer {message} />

							<div class="text-muted absolute right-0 bottom-0 translate-x-full pl-1 text-xs">
								{moment(message.time).format('h:mma')}
							</div>
						</div>
					</div>
				{/if}
			{:else}
				<div class="relative mx-4 my-2 flex gap-2">
					<div class="aspect-square size-10 overflow-hidden rounded-full">
						<img alt={member.label} src={member.pfp} />
					</div>
					<div class="relative flex flex-col gap-2">
						<div class="flex items-center gap-2">
							<div
								class="rounded-full bg-linear-to-br from-pink-400 to-pink-200 px-3 py-1 text-xs font-bold text-white"
							>
								FRIEND
							</div>
							<div>{member.nickname}</div>
						</div>

						<MessageContainer {message} />

						<div class="text-muted absolute right-0 bottom-0 translate-x-full pl-1 text-xs">
							{moment(message.time).format('hh:mma')}
						</div>
					</div>
				</div>
			{/if}

			{#if idx === messages.length - 5}
				<div id="lower-intersection" bind:this={lowerIntersection}></div>
			{/if}
		{/each}
	{/if}
</div>

<div class="flex gap-2 bg-white p-2">
	<div class="flex h-full w-full cursor-not-allowed items-center rounded-2xl bg-gray-200/50 px-2">
		<div class="grow"></div>
		<Smiley class="size-6 text-gray-600" />
	</div>

	<button
		class="flex aspect-square size-8 cursor-pointer items-center justify-center rounded-full bg-gray-200/50"
	>
		<Translate class="size-5 text-gray-600" />
	</button>
</div>

<style>
	.chat {
		background: url('/default_wallpaper.jpg');
		background-position: center;
		background-size: 100% auto;
		padding-top: 32px;
	}
</style>

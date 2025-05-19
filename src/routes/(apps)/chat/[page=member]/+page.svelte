<script lang="ts">
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import Dots from 'phosphor-svelte/lib/DotsThreeOutlineVertical';
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import HeartStraightBreak from 'phosphor-svelte/lib/HeartStraightBreak';
	import Translate from 'phosphor-svelte/lib/Translate';
	import Smiley from 'phosphor-svelte/lib/Smiley';

	import moment from 'moment';
	import { twemojify } from 'svelte-twemojify';
	import { VList } from 'virtua/svelte';
	import { treaty } from '@elysiajs/eden';

	import { fly } from 'svelte/transition';

	import type { PageProps } from './$types';
	import type { Api } from '$lib/server';

	import Streak from '$components/streak.svelte';
	import MessageContainer from '$components/message-container.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	let query = $derived(page.url.searchParams);
	let member = $derived(data.member);
	let messages = $state(data.messages);
	let loading = $state(false);
	let translationActive = $state(false);

	let chatsPage = $derived(Number.parseInt(query.get('page') ?? '1'));

	const app = treaty<Api>('localhost:5173');

	async function handleLoadMore() {
		loading = true;
		const { data } = await app.api.messages.get({
			query: {
				member: member.label.toLowerCase(),
				page: chatsPage + 1
			}
		});
		setTimeout(() => (loading = false), 5000);
		goto(`?member=${member.label.toLowerCase()}&page=${chatsPage + 1}`);

		messages = [...messages, ...data.messages];
	}

	function toggleTranslation() {
		translationActive = !translationActive;
	}
</script>

<div
	class="chat-ui relative flex h-full w-full items-center justify-between bg-white px-3 text-2xl"
>
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

{#if messages.length === 0}
	<div class="chat relative">
		<div class="absolute top-1/2 left-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-xl">
			<div class="mx-auto -mb-2 w-fit rounded-t-lg bg-white px-4 py-2">
				<HeartStraightBreak class="size-8" weight="fill" />
			</div>
			<p class=" rounded-lg bg-white px-4 py-2">Nothing to See Here Yet...</p>
		</div>
	</div>
{:else}
	<VList
		data={messages}
		style="background: url('/default_wallpaper.jpg'); background-position: center; background-size: 100% auto; padding-top: 32px; max-width: 100%;"
		class="font-fixel chat scrollbar-noe relative overflow-y-scroll"
	>
		{#snippet children(message, idx)}
			{@const prev = idx > 0 ? messages[idx - 1] : null}
			{@const next = idx < messages.length ? messages[idx + 1] : null}

			{@const isNotSameDay = moment(prev?.timestamp).day() !== moment(message.timestamp).day()}
			{#if isNotSameDay || idx === 0}
				<div class="my-4 flex items-center">
					<span class="mr-4 ml-2 h-px flex-1 bg-black/10"></span>
					<span class="text-center text-sm"
						>{moment(message.timestamp).format('MMMM  DD, YYYY')}</span
					>
					<span class="mr-2 ml-4 h-px flex-1 bg-black/10"></span>
				</div>
			{/if}

			{@const prevIsRecent =
				Math.abs(moment(prev?.timestamp).diff(message.timestamp, 'minutes')) <= 2}
			{@const nextIsRecent =
				Math.abs(moment(message.timestamp).diff(next?.timestamp, 'minutes')) <= 2}
			{@const nextIsSameTime =
				Math.abs(moment(message.timestamp).diff(next?.timestamp, 'minutes')) === 0}

			<div class="mx-2 flex gap-2 {nextIsRecent ? 'mb-0.5' : 'mb-2'}">
				{#if !prevIsRecent}
					<div class="aspect-square size-10 overflow-hidden rounded-full">
						<img alt={member.label} src={member.pfp} />
					</div>
				{/if}

				<div class="relative flex flex-col gap-2 {prevIsRecent && 'ml-12'}">
					{#if !prevIsRecent}
						<div class="flex items-center gap-2">
							<div>{member.nickname}</div>
						</div>
					{/if}

					<MessageContainer
						{message}
						bind:translationActive
						style="rounded-xl rounded-tl-sm {nextIsRecent && 'rounded-bl-sm'}"
					/>

					{#if !nextIsSameTime}
						<div class="text-muted absolute right-0 bottom-0.5 translate-x-full pl-1 text-xs">
							{moment(message.timestamp).format('h:mma')}
						</div>
					{/if}
				</div>
			</div>

			{#if messages.length - 1 === idx && member.label.toLowerCase() !== 'jiyoon'}
				<div class="mb-4 flex w-full items-center justify-center">
					<button
						onclick={handleLoadMore}
						class="mx-auto h-11 w-32 overflow-hidden rounded-md border border-gray-300 bg-white px-4 py-2 transition-[filter] duration-200 hover:brightness-90"
					>
						{#if loading}
							<span>Loading</span>
						{:else}
							<span>Load More</span>
						{/if}
					</button>
				</div>
			{/if}
		{/snippet}
	</VList>
{/if}

<div class="flex gap-2 bg-white p-2">
	<div class="flex h-full w-full cursor-not-allowed items-center rounded-2xl bg-gray-200/50 px-2">
		<div class="grow"></div>
		<Smiley class="size-6 text-gray-600" />
	</div>

	<button
		onclick={toggleTranslation}
		class="flex aspect-square size-8 cursor-pointer items-center justify-center rounded-full {translationActive
			? 'bg-gray-600/50'
			: 'bg-gray-200/50'}"
	>
		<Translate class="size-5 {translationActive ? 'text-white' : 'text-gray-600'}" />
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

<script lang="ts">
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import Dots from 'phosphor-svelte/lib/DotsThreeOutlineVertical';
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import HeartStraightBreak from 'phosphor-svelte/lib/HeartStraightBreak';
	import Translate from 'phosphor-svelte/lib/Translate';
	import Smiley from 'phosphor-svelte/lib/Smiley';
	import X from 'phosphor-svelte/lib/X';

	import moment from 'moment';
	import { twemojify } from 'svelte-twemojify';
	import { VList } from 'virtua/svelte';
	import { treaty } from '@elysiajs/eden';

	import type { PageProps } from './$types';
	import type { Api } from '$lib/server';

	import Streak from '$components/streak.svelte';
	import MessageContainer from '$components/message-container.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { MemberList } from '$lib/constants';
	import { MediaQuery } from 'svelte/reactivity';

	let { data }: PageProps = $props();

	let query = $derived(page.url.searchParams);
	let member = $derived(data.member);
	let messages = $state(data.messages);
	let loading = $state(false);
	let translationActive = $state(false);

	let profilePageVisible = $state(false);

	let isMobile = new MediaQuery('max-width: 768px');
	let chatsPage = $derived(Number.parseInt(query.get('page') ?? '1'));

	let prepend = $state(false);

	const app = treaty<Api>(import.meta.env.PROD ? 'https://rubble.yvas.me' : 'localhost:5173');

	const MEMBER_CHAT_PAGES = {
		soojin: 34,
		monday: 37,
		soeun: 14,
		jiyoon: 1,
		jaehee: 46,
		jihan: 0,
		zoa: 22
	};

	async function handleLoad(direction: 'prev' | 'next') {
		prepend = direction === 'prev' ? true : false;
		loading = true;
		const { data } = await app.api.messages.get({
			query: {
				member: member.label.toLowerCase() as MemberList,
				page: direction === 'prev' ? chatsPage - 1 : chatsPage + 1
			}
		});

		if (direction === 'prev') {
			goto(`?member=${member.label.toLowerCase()}&page=${chatsPage}`);

			if (data) {
				messages = [...data.messages, ...messages];
			}
		} else {
			goto(
				`?member=${member.label.toLowerCase()}&page=${chatsPage}`
			);

			if (data) {
				messages = [...messages, ...data?.messages];
			}
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>{member.label} | rubble</title>
</svelte:head>

<div class="chat-ui relative flex h-full items-center justify-between bg-white px-1 text-2xl">
	<a href="/chat" class="p-2 rounded-full hover:bg-slate-200">
		{#if isMobile.current}
			<CaretLeft />
		{:else}
			<X />
		{/if}
	</a>

	<button
		onclick={() => (profilePageVisible = !profilePageVisible)}
		class="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-4 py-2 select-none hover:bg-slate-200"
		use:twemojify={{ className: 'size-5' }}>{member.nickname}</button
	>

	<div class="flex items-center justify-center">
		<a href={member.href + '#'} class="p-2 rounded-full hover:bg-slate-200">
			<MagnifyingGlass />
		</a>
		<a href={member.href + '/settings'} class="p-2 rounded-full hover:bg-slate-200">
			<Dots weight="fill" />
		</a>
	</div>

	<Streak />
</div>

{#if profilePageVisible}
	<div class="absolute inset-0 z-10 bg-black" transition:fly={{ y: '100%', duration: 200 }}>
		<div class="relative isolate h-full select-none">
			<img class="absolute z-0 h-full w-full object-cover" src="/default_wallpaper.jpg" />
			<div class="absolute z-10 h-full w-full bg-black/60"></div>
			<button onclick={() => (profilePageVisible = !profilePageVisible)} class="absolute top-2 left-2 z-10 rounded-full p-2 hover:bg-white/30">
				<X class="size-6 text-white" weight="thin" />
			</button>

			<div class="absolute top-1/2 left-1/2 z-10 -translate-1/2 space-y-4">
				<div class="overflow-hidden rounded-full">
					<img class="size-30 rounded-xl" src={member.pfp} />
				</div>

				<div class="w-full text-center text-2xl text-white">
					<span class="to-pink-300 bg-linear-to-br from-pink-600 rounded-sm text-base px-1 py-1">ARTIST</span>
					<span>{member.nickname}</span>
				</div>
			</div>
		</div>
	</div>
{/if}

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
		shift={prepend}
		data={messages}
		style="background: url('/default_wallpaper.jpg'); background-position: center; background-size: 100% auto; padding-top: 32px; max-width: 100%;"
		class="font-fixel chat scrollbar-noe relative overflow-y-scroll"
	>
		{#snippet children(message, idx)}
			{#if chatsPage !== 1 && idx === 0 && member.label.toLowerCase() !== 'jiyoon'}
				<div class="mt-4 flex w-full items-center justify-center">
					<button
						onclick={() => handleLoad('prev')}
						class="mx-auto h-11 w-40 overflow-hidden rounded-md border border-gray-300 bg-white px-4 py-2 transition-[filter] duration-200 hover:brightness-90"
					>
						{#if loading}
							<span>Loading</span>
						{:else}
							<span>Load Previous</span>
						{/if}
					</button>
				</div>
			{/if}

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
					<div class="aspect-square size-10 overflow-hidden rounded-full select-none">
						<img alt={member.label} src={member.pfp} />
					</div>
				{/if}

				<div class="relative flex flex-col gap-2 {prevIsRecent && 'ml-12'}">
					{#if !prevIsRecent}
						<div class="flex items-center gap-2">
							<span class="select-none">{member.nickname}</span>
						</div>
					{/if}

					<MessageContainer
						{message}
						bind:translationActive
						style="rounded-xl rounded-tl-sm {nextIsRecent && 'rounded-bl-sm'}"
					/>

					{#if !nextIsSameTime}
						<div
							class="text-muted absolute right-0 bottom-0.5 translate-x-full pl-1 text-xs select-none"
						>
							{moment(message.timestamp).format('h:mma')}
						</div>
					{/if}
				</div>
			</div>

			{#if messages.length - 1 === idx && chatsPage !== MEMBER_CHAT_PAGES[member.label.toLowerCase()] && member.label.toLowerCase() !== 'jiyoon'}
				<div class="mb-4 flex w-full items-center justify-center">
					<button
						onclick={() => handleLoad('next')}
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
		onclick={() => (translationActive = !translationActive)}
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

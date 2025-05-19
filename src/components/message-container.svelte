<script lang="ts">
	import { PersistedState } from 'runed';
	import { slide } from 'svelte/transition';
	import { twemojify } from 'svelte-twemojify';
	import { CldImage } from 'svelte-cloudinary';
	import Phone from 'phosphor-svelte/lib/Phone';

	import { formatLiveDuration } from '$lib/utils/format';
	import { LOCAL_STORAGE_ITEMS } from '$lib/constants';

	import photoPlaceholder from '$lib/assets/images/Soojin_Mirror_002.jpeg';
	import stickerPlaceholderOne from '$lib/assets/images/sticker_placeholder_1.webp';
	import stickerPlaceholderTwo from '$lib/assets/images/sticker_placeholder_2.webp';
	import stickerPlaceholderThree from '$lib/assets/images/sticker_placeholder_3.webp';
	import type { Message } from '$lib/types';

	const MAX = 2;
	const MIN = 0;

	interface Props {
		message: Message;
		style?: string;
		translationActive: boolean;
	}

	let { message, style, translationActive = $bindable(false) }: Props = $props();
	let displayName = new PersistedState(
		LOCAL_STORAGE_ITEMS.displayName.key,
		LOCAL_STORAGE_ITEMS.displayName.default
	);

	let stickers = [stickerPlaceholderOne, stickerPlaceholderTwo, stickerPlaceholderThree];

	let randomIdx = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
</script>

{#if message.type === 'text'}
	<div
		class="flex w-fit max-w-[65vw] items-center bg-white px-3 py-1 {style} {translationActive
			? 'w-full rounded-b-none'
			: ''}"
	>
		<span use:twemojify={{ className: 'inline size-4 ml-1' }}
			>{@html message.text
				.replaceAll('[y/n]', displayName.current)
				.replaceAll('\n', '<br />')}</span
		>
	</div>
	{#if translationActive && message.translation !== ''}
		<div
			transition:slide={{ axis: 'y', duration: 200 }}
			class="flex w-fit max-w-[65vw] items-center border-t-2 border-dashed border-black/30 bg-white px-3 py-1 {style} {translationActive
				? '-mt-2 w-full rounded-tl-none rounded-tr-none'
				: ''}"
		>
			<span use:twemojify={{ className: 'inline size-4 ml-1' }}
				>{@html message.translation
					.replaceAll('[y/n]', displayName.current)
					.replaceAll('\n', '<br />')}</span
			>
		</div>
	{/if}
{:else if message.type === 'sticker'}
	<div class="flex items-center {style}">
		{#if message.src === ''}
			<img
				src={stickers[randomIdx]}
				class="size-[40vw] lg:size-[20vw]"
				alt={`alt sticker placeholder ${randomIdx}`}
			/>
		{:else}
			<CldImage
				src={message.src}
				width={message.width}
				height={message.height}
				class="size-[40vw] lg:size-[20vw]"
				alt={message.id}
			/>
		{/if}
	</div>
{:else if message.type === 'photo'}
	<div
		class="relative flex aspect-[9/16] w-[60vw] max-w-80 items-center overflow-hidden lg:w-[25vw] {style}"
	>
		{#if message.src === ''}
			<img
				src={photoPlaceholder}
				class="absolute h-full w-full object-cover"
				alt={`alt image placeholder`}
			/>
		{:else}
			<CldImage
				class="absolute h-full w-full bg-gray-200 object-cover"
				alt={message.id}
				src={message.src}
				width={message?.width}
				height={message?.height}
			/>
		{/if}
	</div>
{:else if message.type === 'audio'}
	<div class="flex w-fit max-w-[65vw] items-center bg-white px-3 py-1 {style}">
		<audio src={message.src} controls> </audio>
	</div>
{:else if message.type === 'live'}
	<div class="flex w-fit max-w-[65vw] flex-col items-center bg-white {style}">
		<div class="flex items-center gap-2 px-6 py-2">
			<div class="rounded-full border p-1">
				<Phone weight="fill" />
			</div>
			<div class="text-lg">
				<span class="font-pacifico">rubble</span> Live
			</div>
		</div>

		<div class="h-0.5 w-full border-t-2 border-dashed border-black/30"></div>

		<div class="py-2">{formatLiveDuration(message.duration)}</div>
	</div>
{/if}

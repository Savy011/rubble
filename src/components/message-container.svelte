<script lang="ts">
	import { PersistedState } from 'runed';
	import { press, type PressCustomEvent } from 'svelte-gestures';
	import { twemojify } from 'svelte-twemojify';

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
	}

	let { message, style }: Props = $props();
	let displayName = new PersistedState(
		LOCAL_STORAGE_ITEMS.displayName.key,
		LOCAL_STORAGE_ITEMS.displayName.default
	);

	let pressed = $state(false);

	let stickers = [stickerPlaceholderOne, stickerPlaceholderTwo, stickerPlaceholderThree];

	let randomIdx = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

	function OnTapHandler(event: PressCustomEvent, id: string) {
		console.log('Pressed', id);
		pressed = true;
	}
</script>

{#if message.type === 'text'}
	<div
		class="flex w-fit max-w-[65vw] items-center bg-white px-3 py-1 {style}"
		use:press={() => ({ timeframe: 800 })}
		onpress={(e) => OnTapHandler(e, message.id)}
	>
		<span
			>{@html message.text
				.replaceAll('[y/n]', displayName.current)
				.replaceAll('\n', '<br />')}</span
		>
	</div>
{:else if message.type === 'sticker'}
	<div class="flex max-w-[70vw] items-center {style}">
		<img
			src={stickers[randomIdx]}
			class="aspect-square h-[20vw] w-[20vw]"
			alt={`alt sticker placeholder ${randomIdx}`}
		/>
	</div>
{:else if message.type === 'photo'}
	<div
		class="relative flex aspect-[9/16] w-[60vw] max-w-80 items-center overflow-hidden lg:h-auto {style}"
	>
		<img
			src={photoPlaceholder}
			class="absolute h-full w-full object-cover"
			alt={`alt image placeholder`}
		/>
	</div>
{:else}
	<div class="flex w-fit max-w-[65vw] items-center bg-white px-3 py-1 {style}">
		Yet To Be Implemented:
		<span
			>{@html message.text
				.replaceAll('[y/n]', displayName.current)
				.replaceAll('\n', '<br />')}</span
		>
	</div>
{/if}

<script lang="ts">
	import { PersistedState } from 'runed';
	import { twemojify } from 'svelte-twemojify';

	import { LOCAL_STORAGE_KEYS } from '$lib/constants';

	import photoPlaceholder from '$lib/assets/images/Soojin_Mirror_002.jpeg';
	import stickerPlaceholderOne from '$lib/assets/images/sticker_placeholder_1.webp';
	import stickerPlaceholderTwo from '$lib/assets/images/sticker_placeholder_2.webp';
	import stickerPlaceholderThree from '$lib/assets/images/sticker_placeholder_3.webp';

	const MAX = 2;
	const MIN = 0;

	interface Props {
		message: {
			id: string;
			time: Date;
			type: 'text' | 'photo' | 'video' | 'live' | 'sticker';
			text: string;
		};
	}

	let { message }: Props = $props();
	let displayName = new PersistedState(LOCAL_STORAGE_KEYS.displayName, '');

	let stickers = [stickerPlaceholderOne, stickerPlaceholderTwo, stickerPlaceholderThree];

	let randomIdx = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
</script>

{#if message.type === 'text'}
	<div class="flex w-fit max-w-[65vw] items-center rounded-xl rounded-tl-sm bg-white p-2 px-5">
		<span use:twemojify={{ className: 'inline h-4' }}
			>{message.text.replace('[y/n]', displayName.current)}</span
		>
	</div>
{:else if message.type === 'sticker'}
	<div class="flex max-w-[70vw] items-center rounded-xl rounded-tl-sm">
		<img
			src={stickers[randomIdx]}
			class="aspect-square h-[30vw] w-[30vw]"
			alt={`alt sticker placeholder ${randomIdx}`}
		/>
	</div>
{:else if message.type === 'photo'}
	<div
		class="relative flex h-[90vw] w-[60vw] items-center overflow-hidden rounded-xl rounded-tl-sm"
	>
		<img
			src={photoPlaceholder}
			class="absolute h-full w-full object-cover"
			alt={`alt image placeholder`}
		/>
	</div>
{/if}

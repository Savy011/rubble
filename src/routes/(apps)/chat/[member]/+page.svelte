<script lang="ts">
	import { page } from '$app/state';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import GearSix from 'phosphor-svelte/lib/GearSix';
	import Translate from 'phosphor-svelte/lib/Translate';

	let pathname = $derived(page.url.pathname);
	let name = $derived(pathname.slice(1));
</script>

<div class="flex h-full w-full items-center justify-between bg-white px-3 text-2xl">
	<a href="/chat">
		<CaretLeft />
	</a>

	{name.split('/')[1].toLocaleUpperCase()}

	<a href={pathname + '/settings'}>
		<GearSix />
	</a>
</div>

<div class="chat relative overflow-y-scroll">
	<div class="sticky top-0 m-0 w-full rounded-b-2xl bg-white py-1 text-center">+1212 ❤️</div>
	{#each Array(70)}
		<div class="mx-4 my-2 flex gap-2">
			<div class="aspect-square size-10 rounded-full bg-white"></div>
			<div class="flex flex-col gap-2">
				<div>{name.split('/')[1]}</div>
				<div class="max-w-4/5 rounded-3xl rounded-tl-sm bg-white p-2 px-5">
					insane message by the artist. this shit is so {'gas'} af
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="flex gap-2 bg-white p-2">
	<input class="objec h-full w-full rounded-2xl border border-gray-700 bg-white px-4" />

	<button
		class="flex aspect-square size-8 items-center justify-center rounded-full border border-gray-700 bg-white"
	>
		<Translate />
	</button>
</div>

<style>
	.chat {
		background: url('/default_wallpaper.jpg');
		background-position: center;
		background-size: 100% auto;
	}
</style>

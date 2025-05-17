<script lang="ts">
	import Info from 'phosphor-svelte/lib/Info';
	import ChatTeardropDots from 'phosphor-svelte/lib/ChatTeardropDots';
	import GearSix from 'phosphor-svelte/lib/GearSix';
	import ListBullets from 'phosphor-svelte/lib/ListBullets';

	import { fade } from 'svelte/transition';

	let { children } = $props();

	let dockApps = [
		{ href: '/about', icon: Info, label: 'About' },
		{ href: '/changelog', icon: ListBullets, label: 'Changelog' },
		{ href: '/chat', icon: ChatTeardropDots, label: 'Chat' },
		{ href: '/settings', icon: GearSix, label: 'Settings' }
	];
</script>

<div class="content" transition:fade={{ duration: 200, delay: 200 }}>
	<div class="h-full">
		{@render children()}
	</div>

	<div class="w-fll m-2 flex justify-center">
		<div
			class="flex h-full w-full justify-between gap-4 rounded-3xl bg-black/12 p-3 backdrop-blur-sm"
		>
			{#each dockApps as app}
				<div
					class="from-orchid-bloom via-banana-cream to-beach-glass relative isolate flex aspect-square h-full items-center justify-center overflow-hidden rounded-2xl border border-white bg-linear-to-br from-20% via-50% to-100%"
				>
					<a href={app.href}
						><span class="absolute inset-0 z-20"></span><span class="sr-only">{app.label}</span></a
					>

					<app.icon class="z-10 size-8 text-white" weight="fill" />

					<div class="absolute inset-0 backdrop-blur-sm"></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	div.content {
		display: grid;
		grid-template-rows: 1fr 100px;
	}
</style>

<script lang="ts">
	import Info from 'phosphor-svelte/lib/Info';
	import ChatTeardropDots from 'phosphor-svelte/lib/ChatTeardropDots';
	import GearSix from 'phosphor-svelte/lib/GearSix';

	let { children } = $props();

	let pinnedApps = [
		{ href: '/about', icon: Info, label: 'About' },
		{ href: '/chat', icon: ChatTeardropDots, label: 'Chat' },
		{ href: '/settings', icon: GearSix, label: 'Settings' }
	];
</script>

<div class="content">
	<div class="h-full">
		{@render children()}
	</div>
	<div class="p-2">
		<div class="flex h-full justify-evenly rounded-2xl bg-black/12 p-3 backdrop-blur-sm">
			{#each pinnedApps as app}
				<a href={app.href}>
					<div
						class="from-orchid-bloom via-banana-cream to-beach-glass flex aspect-square h-full items-center justify-center rounded-2xl border border-white bg-linear-to-br from-20% via-50% to-100%"
					>
						<app.icon class="size-8 text-white" weight="fill" />
					</div></a
				>
			{/each}
		</div>
	</div>
</div>

<style>
	div.content {
		display: grid;
		grid-template-rows: 1fr 108px;
	}
</style>

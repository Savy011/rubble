<script lang="ts">
	import { fade } from 'svelte/transition';

	import UsersThree from 'phosphor-svelte/lib/UsersThree';
	import { twemojify } from 'svelte-twemojify';

	import { APPS } from '$lib/constants';
	import AppHeader from '$components/app-header.svelte';

	import AppAnimationWrapper from '$components/app-animation-wrapper.svelte';
	import { page } from '$app/state';
	import { MediaQuery } from 'svelte/reactivity';

	let { children } = $props();

	let angle = $state(0);
	let pathname = $derived(page.url.pathname);
	let isChatPanelClosed = $derived(pathname === '/chat');
	let isMobile = new MediaQuery('max-width: 768px');

	$effect(() => {
		const interval = setInterval(() => {
			if (angle <= 360) {
				angle += 1;
			} else {
				angle = 0;
			}
		}, 100);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<AppAnimationWrapper class="h-full">
	<div class="app h-full">
		<div>
			<AppHeader href="/">
				<div class="flex items-center gap-2">
					Friends
					<UsersThree class="size-6 lg:size-8" weight="fill" />
				</div>
			</AppHeader>

			<ul class="space-y-1 px-2" style="--gradient-dir: {angle}deg">
				{#each APPS as app, idx}
					<li
						transition:fade={{ duration: 200, delay: idx * 50 + 400 }}
						class="relative flex items-center gap-2 overflow-hidden rounded-md px-4 py-2 transition-[filter] duration-200 ease-in-out select-none first:rounded-t-2xl last:rounded-b-2xl hover:brightness-90 {pathname ===
							app.href || 'bg-white/70'}"
					>
						<div class="aspect-w-1 h-10 w-10 overflow-hidden rounded-full bg-gray-300">
							<img class="aspect-square size-full" alt={app.label} src={app.pfp} />
						</div>

						<a href={app.href}
							><span class="absolute inset-0"><span class="sr-only">{app.nickname}</span></span></a
						>
						{#if pathname === app.href}
							<div
								transition:fade|global={{ duration: 200 }}
								class="absolute inset-0 -z-10 backdrop-blur-sm transition-all duration-700"
							></div>
							<div
								transition:fade|global={{ duration: 200 }}
								class="from-orchid-bloom via-banana-cream to-beach-glass absolute inset-0 -z-20 bg-linear-(--gradient-dir) backdrop-blur-sm"
							></div>
						{/if}
						<div class="flex flex-1 items-center justify-between">
							<div use:twemojify={{ className: 'size-5' }} class="flex items-center gap-1">
								{app.nickname}
							</div>
							<div class="text-muted text-sm">{app.fullName}</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		{#if !(isChatPanelClosed && isMobile.current)}
			{@render children()}
		{/if}
	</div>
</AppAnimationWrapper>

<style>
	.app {
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		.app {
			display: grid;
			grid-template-columns: 1fr 2fr;
		}
	}
</style>

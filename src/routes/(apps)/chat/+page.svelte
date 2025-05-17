<script lang="ts">
	import { fade } from 'svelte/transition';

	import UsersThree from 'phosphor-svelte/lib/UsersThree';
	import { twemojify } from 'svelte-twemojify';

	import { APPS } from '$lib/constants';
	import AppHeader from '$components/app-header.svelte';
</script>

<AppHeader href="/">
	<div class="flex items-center gap-2">
		Friends
		<UsersThree class="size-6 lg:size-8" weight="fill" />
	</div>
</AppHeader>

<ul class="space-y-1 px-2">
	{#each APPS as app, idx}
		<li
			transition:fade={{ duration: 200, delay: idx * 50 + 400 }}
			class="relative flex items-center gap-2 rounded-md bg-white/70 px-4 py-2 transition-[filter] duration-200 select-none first:rounded-t-2xl last:rounded-b-2xl hover:brightness-90"
		>
			<div class="aspect-w-1 h-10 w-10 overflow-hidden rounded-full bg-gray-300">
				<img class="aspect-square size-full" alt={app.label} src={app.pfp} />
			</div>

			<a href={app.href}
				><span class="absolute inset-0"><span class="sr-only">{app.nickname}</span></span></a
			>

			<div class="flex flex-1 items-center justify-between">
				<div use:twemojify={{ className: 'size-5' }} class="flex items-center gap-1">
					{app.nickname}
				</div>
				<div class="text-muted text-sm">{app.fullName}</div>
			</div>
		</li>
	{/each}
</ul>

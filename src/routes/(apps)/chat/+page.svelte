<script lang="ts">
	import { APPS } from '$lib/constants';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import { twemojify } from 'svelte-twemojify';
</script>

<h2 class=" flex items-center gap-2 px-4 py-2 text-3xl font-bold">
	<a href="/"><CaretLeft class="size-6" /></a>
	Friends
</h2>

<ul class="space-y-1 px-2">
	{#each APPS as app}
		<li
			class="relative flex items-center gap-2 rounded-md bg-white/70 px-4 py-2 select-none first:rounded-t-2xl last:rounded-b-2xl hover:bg-gray-100"
		>
			<div class="aspect-square h-10 w-10 overflow-hidden rounded-full bg-gray-300">
				<img class="aspect-square size-full" alt={app.label} src={app.pfp} />
			</div>

			<a href={app.href}
				><span class="absolute inset-0"><span class="sr-only">{app.nickname}</span></span></a
			>

			<div class="flex w-full items-center justify-between">
				<div use:twemojify={{ className: 'size-5' }} class="flex items-center gap-1">
					{app.nickname}
				</div>
				<div class="text-muted text-sm">{app.fullName}</div>
			</div>
		</li>
	{/each}
</ul>

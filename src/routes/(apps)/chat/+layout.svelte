<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';
	import Link from '$components/link.svelte';

	let { children } = $props();
</script>

<main class="h-full" in:fade={{ delay: 200 }} out:fly={{ x: '-100%', duration: 200 }}>
	<div>
		{@render children()}
	</div>

	<div class="hidden items-center justify-center border-l border-gray-300 bg-white/70 sm:flex">
		<div>
			<ChatCircleDots weight="fill" class="mx-auto size-25" />
			<p class="font-archivo text-2xl select-none">
				Welcome to&nbsp;<span class="font-pacifico">rubble</span>
			</p>
			<p>See <Link href="/changelog">what's new</Link> in this update</p>
		</div>
	</div>
</main>

<style>
	@media (min-width: 640px) {
		main {
			display: grid;
			grid-template-columns: 1fr 2fr;
		}
	}
</style>

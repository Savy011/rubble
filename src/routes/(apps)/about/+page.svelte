<script lang="ts">
	import Link from '$lib/components/link.svelte';
	import { twemojify } from 'svelte-twemojify';
	import Heart from 'phosphor-svelte/lib/HeartStraight';
</script>

<header class="mb-4 space-y-3">
	<div class="mx-auto size-18 rounded-full bg-white p-2" use:twemojify>🪨</div>
	<h1 class="font-pacifico text-center text-5xl">rubble</h1>
</header>

<section class="text-center">
	<h4 class="mb-3 text-xl font-bold">Message Credits</h4>
</section>

<footer>
	<p class="flex items-center justify-center gap-0.5 text-center">
		We are your Daileees to the end
		<Heart class="fill-orchid-bloom inline" weight="fill" />
		<Heart class="fill-banana-cream inline" weight="fill" />
		<Heart class="fill-beach-glass inline" weight="fill" />
	</p>
</footer>

<script lang="ts">
	import ChatCircleDots from 'phosphor-svelte/lib/ChatCircleDots';
	import Link from '$components/link.svelte';
	import { fly } from 'svelte/transition';
</script>

<div
	in:fly={{ x: '100%', duration: 200, delay: 200 }}
	out:fly={{ x: '100%', duration: 200 }}
	class="hidden items-center justify-center border-l border-gray-300 bg-white/70 md:flex"
>
	<div>
		<ChatCircleDots weight="fill" class="mx-auto size-25" />
		<p class="font-archivo text-2xl select-none">
			Welcome to&nbsp;<span class="font-pacifico">rubble</span>
		</p>
		<p>See <Link href="/changelog">what's new</Link> in this update</p>
	</div>
</div>

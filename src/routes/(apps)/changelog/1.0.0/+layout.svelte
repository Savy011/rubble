<script lang="ts">
	import AppAnimationWrapper from '$components/app-animation-wrapper.svelte';
	import { fly } from 'svelte/transition';

	let { children } = $props();
</script>

<div in:fly={{ duration: 200, delay: 200, x: '100%' }} out:fly={{ duration: 200, x: '100%' }}>
	{@render children()}
</div>

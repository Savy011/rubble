<script lang="ts">
	import AppAnimationWrapper from '$components/app-animation-wrapper.svelte';

	let { children } = $props();
</script>

<AppAnimationWrapper class="font-fixel overflow-y-scroll">
	{@render children()}
</AppAnimationWrapper>

<script lang="ts">
	import { fly } from 'svelte/transition';

	let { children, data } = $props();
</script>

{#key data.url}
	<div
		class="app relative lg:border-l lg:border-gray-300"
		in:fly={{ x: '100%', duration: 200, delay: 200 }}
		out:fly={{ x: '100%', duration: 200 }}
	>
		{@render children()}
	</div>
{/key}

<style>
	.app {
		display: grid;
		grid-template-rows: 56px 1fr 48px;
	}

	@media (max-width: 768px) {
		.app {
			width: 100%;
			height: calc(100% - 24px);
			position: fixed;
		}
	}
</style>

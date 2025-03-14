<script lang="ts">
	let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
		width: 100%;
		height: calc(100% - 30px);
		margin-top: 30px;
		position: fixed;
		display: grid;
		grid-template-rows: 56px 1fr 48px;
	}
</style>

<script lang="ts">
	import { Dialog, type WithoutChildrenOrChild } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = WithoutChildrenOrChild<Dialog.OverlayProps> & {
		duration?: number;
		children?: Snippet;
	};

	let { ref = $bindable(null), duration = 400, children, ...restProps }: Props = $props();
</script>

<Dialog.Overlay
	bind:ref
	class="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
	forceMount
	{...restProps}
>
	{#snippet child({ props, open })}
		{#if open}
			<div {...props} transition:fade={{ duration }}>
				{@render children?.()}
			</div>
		{/if}
	{/snippet}
</Dialog.Overlay>

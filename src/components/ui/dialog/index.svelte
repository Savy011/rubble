<script lang="ts">
	import { Dialog } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import Plus from 'phosphor-svelte/lib/Plus';
	import X from 'phosphor-svelte/lib/X';
	import DialogOverlay from './dialog-overlay.svelte';

	type Props = Dialog.RootProps & {
		open: boolean;
		buttonText?: string;
		children?: Snippet;
		title: Snippet;
		description?: Snippet;
		buttonLeft?: Snippet;
		buttonRight?: Snippet;
		escapeKeydownBehavior?: 'close' | 'ignore' | 'defer-otherwise-ignore' | 'defer-otherwise-close';
		interactOutsideBehavior?:
			| 'close'
			| 'ignore'
			| 'defer-otherwise-ignore'
			| 'defer-otherwise-close';
		disableClose?: boolean;
	};

	let {
		open = $bindable(false),
		buttonText,
		children,
		title,
		description,
		buttonLeft,
		buttonRight,
		escapeKeydownBehavior = 'close',
		interactOutsideBehavior = 'close',
		disableClose = false,
		...restProps
	}: Props = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	{#if buttonText}
		<Dialog.Trigger
			class="-mr-3 flex cursor-pointer items-center justify-center rounded-xl bg-gray-700/20 p-2 px-3 transition-[brightness] duration-400 ease-in-out hover:brightness-20"
			><Plus class="mr-2" />{buttonText}</Dialog.Trigger
		>
	{/if}
	<Dialog.Portal>
		<DialogOverlay duration={200} />
		<Dialog.Content
			{escapeKeydownBehavior}
			{interactOutsideBehavior}
			class="fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-2 md:w-full"
		>
			<div class=" space-y-1 shadow-lg sm:rounded-2xl">
				<div class="rounded-sm rounded-t-2xl bg-amber-50 py-2 pr-2 pl-4">
					<div class="flex min-h-9 items-center justify-between">
						<Dialog.Title class="text-lg leading-none font-semibold select-none"
							>{@render title()}</Dialog.Title
						>
						{#if !disableClose}
							<Dialog.Close
								class="cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-black/30"
								><X class="size-5" /></Dialog.Close
							>
						{/if}
					</div>
					{#if description}
						<div>
							<Dialog.Description class="text-sm">{@render description()}</Dialog.Description>
						</div>
					{/if}
				</div>

				<div class="font-fixel min-h-6 rounded-sm bg-amber-50 py-2 pr-2 pl-4">
					{@render children?.()}
				</div>

				{#if buttonLeft && buttonRight}{:else if buttonRight}
					<div class="flex gap-1">
						<div class="flex-1 rounded-sm rounded-bl-2xl bg-amber-50"></div>
						{@render buttonRight()}
					</div>
				{:else}
					<div class="min-h-8 rounded-t-sm rounded-b-2xl bg-amber-50 px-4 py-2"></div>
				{/if}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

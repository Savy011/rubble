<script lang="ts">
	import { Switch as SwitchPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { cn } from '$lib/utils/style';

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		'data-[state=unchecked]:shadow-mini-inset peer data-[state=checked]:bg-orchid-bloom inline-flex h-[24px] min-h-[24px] w-[48px] shrink-0 cursor-pointer items-center rounded-xl px-[3px] transition-colors hover:brightness-90 hover:transition-[brightness] focus-visible:ring-[1px] focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-hidden disabled:cursor-not-allowed  disabled:opacity-50 data-[state=unchecked]:bg-gray-400',
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		class="data-[state=unchecked]:shadow-mini dark:shadow-popover dark:order-black/30 pointer-events-none block size-[18px] shrink-0 rounded-full bg-white transition-[tranform_colors] data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-gray-200 dark:bg-white "
	/>
</SwitchPrimitive.Root>

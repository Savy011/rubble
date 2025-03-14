<script lang="ts">
	import { APPS } from '$lib/constants';
</script>

<main class="h-full">
	<div>
		<a href="/">{'<'}</a>
	</div>

	<h2 class="bg-white px-4 py-2 text-2xl font-bold">Friends</h2>

	<ul>
		{#each APPS as app}
			<div class="border-b border-black/30 bg-white p-2">
				<li class="relative flex items-center gap-4 rounded-md px-4 py-1 hover:bg-gray-200">
					<div class="size-10 overflow-hidden rounded-full bg-gray-300">
						<img alt={app.label} src={app.pfp} />
					</div>
					<a href={app.href}><span class="absolute inset-0"></span>{app.nickname}</a>
				</li>
			</div>
		{/each}
	</ul>

	<div class="sticky bottom-0">Hello</div>
</main>

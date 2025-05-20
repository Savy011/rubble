<script lang="ts">
	import IMG from '$lib/assets/images/sticker_placeholder_3.webp';

	import moment from 'moment';
</script>

<div class="mx-2 mb-1 flex max-h-32 rounded-2xl bg-white/70 p-2">
	<img src={IMG} class="mx-auto max-h-28" alt="Bandit jumping with happiness!" />
</div>

<main class="font-fixel mx-2 rounded-2xl bg-white/70 px-6 py-2">
	<ol class="mx-4 list-decimal">
		<li>Add Placeholder Logo</li>
		<li>Add Splash Screen</li>
		<li>Add first run information dialog</li>
		<li>Add Member Chats:</li>
		<ul class="mx-4 list-disc">
			<li>Soojin: Full Chats</li>
			<li>Monday: Full Chats</li>
			<li>Soeun: Upto {moment(1700724720000).format('YYYY-MM-DD hh:mma')}</li>
			<li>Jiyoon: Full Chats</li>
			<li>Jaehee: Upto {moment(1735100160000).format('YYYY-MM-DD hh:mma')}</li>
			<li>Zoa: Full Chats</li>
		</ul>

		<li>Add setting for changing user name.</li>
		<li>Add Setting for pinning member chats to homepage.</li>
		<li>
			Implement UI to handle text messages (with translations), images (with a placeholder image),
			stickers, lives.
		</li>
		<ul class="mx-4 list-disc">
			<li>placeholder UI for audios.</li>
		</ul>
		<li>Add Calender widget to highlight Weeekly related date.</li>
		<li>Implement 90% of Mobile UI.</li>
		<li>Implement Desktop UI that just works&trade;.</li>
		<li>Add Project Progress Tracker.</li>
	</ol>
</main>

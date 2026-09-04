<script>
	import Trackers from '$lib/features/Trackers.svelte'
	import { Hourglass, Inbox } from '@lucide/svelte'
	import ButtonPopup from '@shared/ButtonPopup.svelte'
</script>

<Trackers />

{#each Array(9) as _, i}
	<br />
	<br />
	<br />
	{i}askdfhas ldfjh ajsdf laskj sadf asdf s
{/each}

<div id="tracker-button">
	<ButtonPopup color={'var(--blue)'}>
		{#snippet trigger()}
			<Hourglass class="icon" />
			<!-- <Play fill="currentColor" style="height: 12px;" /> -->
			<!-- <Muscle class="icon" /> -->
			<!-- <span class="hour-min">
				0:00:
				<span class="seconds">00</span>
			</span> -->
		{/snippet}

		<Trackers />
	</ButtonPopup>
</div>

<div id="inbox-button">
	<ButtonPopup color={'var(--blue)'}>
		{#snippet trigger()}
			<Inbox class="icon" />
			&nbsp;23
		{/snippet}

		<p>inbox</p>
	</ButtonPopup>
</div>

<style>
	#inbox-button {
		position: absolute;
		z-index: 100;
		bottom: calc(var(--navbar-size) + env(safe-area-inset-bottom));
		right: 0;
		margin: 0 10px 20px 0;
		width: 80px;
		height: 50px;
		font-size: 14px;
	}

	#tracker-button {
		position: absolute;
		z-index: 100;
		bottom: calc(var(--navbar-size) + env(safe-area-inset-bottom));
		margin: 0 0 20px 10px;
		/* width: 110px; */
		width: 70px;
		height: 50px;
		font-size: 14px;
	}

	.hour-min {
		display: inline-flex;
		align-items: baseline;
	}

	.seconds {
		font-size: 12px;
	}
</style>

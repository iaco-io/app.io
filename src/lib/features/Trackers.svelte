<script lang="ts">
	import {
		uc_trackerColor,
		uc_trackerIcon,
		uc_trackerTitle,
		userStore,
		ut_trackers,
		uv_userId
	} from '$lib/db/userStore'
	import {
		Antenna,
		BedDouble,
		Bird,
		Carrot,
		FaceSlightlyFrowning,
		Plus,
		Timer,
		Turtle,
		Tv,
		Wind
	} from '@lucide/svelte'
	import Button from '@shared/Button.svelte'
	import { getColor } from '@shared/colors'
	import { getIcon } from '@shared/icons'
	import Muscle from '@shared/Muscle.svelte'
	import { getTable, ValueView } from 'tinybase/ui-svelte'
	import { EditableValueView } from 'tinybase/ui-svelte-dom'
	import { createTracker } from './tracker'

	const trackers = getTable(ut_trackers, userStore)
	let trackerTitle = $state('')
</script>

<div class="tracker-list" style="height: 40px;">
	<input bind:value={trackerTitle} />
	<Button
		color="var(--blue)"
		onclick={() => {
			createTracker(trackerTitle, 'timer', 'var(--mint)')
		}}
	>
		<Plus class="icon" color="var(--blue)" />
		<Timer class="icon" color="var(--blue)" />
	</Button>
</div>

<div class="tracker-list">
	{#each Object.values(trackers.current) as tracker}
		{@const Icon = getIcon(tracker[uc_trackerIcon])}

		<Button onclick={() => {}} color={getColor(tracker[uc_trackerColor])}>
			<Icon class="icon" color={getColor(tracker[uc_trackerColor])} />
			{tracker[uc_trackerTitle]}
		</Button>
	{/each}
</div>

<div class="tracker-list">
	<Button onclick={() => {}} color="var(--red)">
		<FaceSlightlyFrowning class="icon" color="var(--red)" /> o!
	</Button>
	<Button onclick={() => {}} color="var(--pink)">
		<Tv class="icon" color="var(--pink)" /> tv
	</Button>
	<Button onclick={() => {}} color="var(--brown)">
		<Antenna class="icon" color="var(--brown)" /> t.
	</Button>
</div>

<div class="tracker-list">
	<Button onclick={() => {}} color="var(--orange)">
		<Carrot class="icon" color="var(--orange)" /> food
	</Button>
	<Button onclick={() => {}} color="var(--green)">
		<Muscle class="icon" color="var(--green)" /> gym
	</Button>
	<Button onclick={() => {}} color="var(--purple)">
		<BedDouble class="icon" color="var(--purple)" /> .zZ
	</Button>
</div>

<div class="tracker-list">
	<Button onclick={() => {}} color="var(--yellow)">
		<Bird class="icon" color="var(--yellow)" /> ócio
	</Button>
	<Button onclick={() => {}} color="var(--blue)">
		<Wind class="icon" color="var(--blue)" />io
	</Button>
	<Button onclick={() => {}} color="var(--mint)">
		<Turtle class="icon" color="var(--mint)" /> app
	</Button>
</div>

<style>
	.tracker-list {
		display: flex;
		height: 60px;
		gap: 5px;
		padding: 5px;
		margin: 10px;
	}
</style>

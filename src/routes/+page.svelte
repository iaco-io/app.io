<script>
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
	import Muscle from '@shared/Muscle.svelte'

	import {
		uc_trackerColor,
		uc_trackerIcon,
		uc_trackerTitle,
		userStore,
		ut_trackers,
		uv_userId
	} from '$lib/db/userStore'
	import { createTracker } from '$lib/features/tracker'
	import ButtonPopup from '@shared/ButtonPopup.svelte'
	import { getColor } from '@shared/colors'
	import { getIcon } from '@shared/icons'
	import { getTable, ValueView } from 'tinybase/ui-svelte'
	import { EditableValueView } from 'tinybase/ui-svelte-dom'

	const trackers = getTable(ut_trackers, userStore)
	let trackerTitle = $state('')
</script>

<br />
<br />
<br />

<ButtonPopup color={'var(--blue)'}>
	{#snippet trigger()}Open me{/snippet}
	<p>aaa</p>
	<p>b</p>
</ButtonPopup>

<p>id: <ValueView valueId={uv_userId} store={userStore} /></p>
<EditableValueView valueId={uv_userId} store={userStore} />

<div style="height: 40px;">
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

<div>
	{#each Object.values(trackers.current) as tracker}
		{@const Icon = getIcon(tracker[uc_trackerIcon])}

		<Button onclick={() => {}} color={getColor(tracker[uc_trackerColor])}>
			<Icon class="icon" color={getColor(tracker[uc_trackerColor])} />
			{tracker[uc_trackerTitle]}
		</Button>
	{/each}
</div>

<div>
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

<div>
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

<div>
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
	div {
		display: flex;
		height: 60px;
		gap: 5px;
		padding: 5px;
		margin: 10px;
	}
</style>

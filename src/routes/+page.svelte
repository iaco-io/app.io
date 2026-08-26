<script>
	import {
		Antenna,
		BedDouble,
		Bird,
		Carrot,
		FaceSlightlyFrowning,
		MicSignal,
		Music2,
		Turtle,
		Tv
	} from '@lucide/svelte'
	import Button from '@shared/Button.svelte'
	import Muscle from '@shared/Muscle.svelte'
</script>

<br />
<br />
<br />
<br />
<br />
<br />

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
		<Bird class="icon" color="var(--yellow)" />
		<Music2 size="12" style="stroke-width: 2.2px" class="icon" color="var(--yellow)" /> ócio
	</Button>
	<Button onclick={() => {}} color="var(--blue)">
		<MicSignal class="icon" color="var(--blue)" />io
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

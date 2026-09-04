<script lang="ts">
	import { Cable } from '@lucide/svelte'
	import Button from '@shared/Button.svelte'

	let pc: RTCPeerConnection | null = null
	let channel: RTCDataChannel | null = null

	let offer = $state('')
	let answer = $state('')

	let remoteOffer = $state('')
	let remoteAnswer = $state('')

	let message = $state('')
	let log: string[] = $state([])

	function addLog(text: string) {
		console.log(text)
		log = [...log, text]
	}

	function debugSdp(label: string, sdp: RTCSessionDescription | null) {
		if (!sdp?.sdp) return

		addLog('--- ' + label + ' candidates ---')

		const candidates = sdp.sdp.split('\n').filter((line) => line.startsWith('a=candidate'))

		for (const candidate of candidates) {
			addLog(candidate)
		}

		addLog('--- end candidates ---')
	}

	function setupChannel() {
		if (!channel) return

		channel.onopen = () => {
			addLog('Channel opened')
		}

		channel.onmessage = (e) => {
			addLog('Peer: ' + e.data)
		}

		channel.onerror = (e) => {
			addLog('Channel error')
			console.error(e)
		}
	}

	function createPeer() {
		pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302'
				}
				// {
				//   urls: 'turn:openrelay.metered.ca:80',
				//   username: 'openrelayproject',
				//   credential: 'openrelayproject',
				// }
			]
		})

		pc.oniceconnectionstatechange = () => {
			addLog('ICE: ' + pc!.iceConnectionState)
		}

		pc.onconnectionstatechange = () => {
			addLog('Connection: ' + pc!.connectionState)
		}

		pc.onsignalingstatechange = () => {
			addLog('Signaling: ' + pc!.signalingState)
		}

		pc.onicecandidate = (e) => {
			if (e.candidate) {
				addLog('Found candidate: ' + e.candidate.candidate)
			} else {
				addLog('ICE gathering finished')
			}
		}

		pc.ondatachannel = (e) => {
			addLog('Received data channel')

			channel = e.channel

			setupChannel()
		}
	}

	async function makeOffer() {
		createPeer()

		channel = pc!.createDataChannel('chat')

		setupChannel()

		const desc = await pc!.createOffer()

		await pc!.setLocalDescription(desc)

		await waitIce()

		debugSdp('OFFER', pc!.localDescription)

		offer = JSON.stringify(pc!.localDescription, null, 2)
	}

	async function acceptOffer() {
		createPeer()

		await pc!.setRemoteDescription(JSON.parse(remoteOffer))

		const desc = await pc!.createAnswer()

		await pc!.setLocalDescription(desc)

		await waitIce()

		debugSdp('ANSWER', pc!.localDescription)

		answer = JSON.stringify(pc!.localDescription, null, 2)
	}

	async function acceptAnswer() {
		await pc!.setRemoteDescription(JSON.parse(remoteAnswer))

		addLog('Remote answer accepted')
	}

	function send() {
		if (!channel) {
			addLog('No channel')
			return
		}

		channel.send(message)

		addLog('Me: ' + message)

		message = ''
	}

	function waitIce() {
		return new Promise<void>((resolve) => {
			if (pc!.iceGatheringState === 'complete') {
				resolve()
				return
			}

			pc!.onicegatheringstatechange = () => {
				addLog('ICE gathering: ' + pc!.iceGatheringState)

				if (pc!.iceGatheringState === 'complete') {
					resolve()
				}
			}
		})
	}

	let hidden = $state(true)
</script>

<div style="margin: 0 30%; height: 50px; width: 40%;">
	<Button
		onclick={() => {
			hidden = !hidden
		}}
		color="orange"
	>
		<Cable class="icon" />
		show/hide
	</Button>
</div>

{#if !hidden}
	<h3>WebRTC Manual Signaling Test</h3>

	<button onclick={makeOffer}> Create Offer </button>

	<button onclick={acceptOffer}> Accept Offer </button>

	<button onclick={acceptAnswer}> Accept Answer </button>

	<h5>Offer</h5>

	<textarea bind:value={offer}></textarea>

	<h5>Paste Remote Offer</h5>

	<textarea bind:value={remoteOffer}></textarea>

	<h5>Answer</h5>

	<textarea bind:value={answer}></textarea>

	<h5>Paste Remote Answer</h5>

	<textarea bind:value={remoteAnswer}></textarea>

	<input bind:value={message} placeholder="message" />

	<button onclick={send}> Send </button>

	<hr />

	<div class="msgs">
		{#each log as line}
			<div>{line}</div>
		{/each}
	</div>
{/if}

<style>
	h3 {
		margin: 5px;
	}

	h5,
	input {
		margin: 0;
		margin-top: 15px;
	}

	textarea {
		width: 100%;
		height: 20px;
	}

	.msgs {
		overflow: scroll;
		height: 100px;
		font-family: monospace;
		font-size: 12px;
	}
</style>

<script lang="ts">
	import { BookOpen, HeartHandshake, HeartPlus, User, Wind } from '@lucide/svelte'
	import AuroraBg from '@shared/AuroraBg.svelte'
	import NavBar from '@shared/NavBar.svelte'
	import '@shared/style.css'
	import { onMount } from 'svelte'
	import '../style.css'
	import { initAllPersisters } from '$lib/db/persisters'

	let { children } = $props()

	let isDarkTheme = $state(false)
	onMount(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)')
		isDarkTheme = media.matches
		const update = () => (isDarkTheme = media.matches)
		media.addEventListener('change', update)
		return () => media.removeEventListener('change', update)
	})

	onMount(() => {
		initAllPersisters()
	})

	function handleExternalUrl(event: MouseEvent) {
		const target = event.target as HTMLElement
		const link = target.closest('a')

		if (!link) return

		if (link.origin !== window.location.origin) {
			event.preventDefault()
			window.open(link.href, '_blank', 'noopener,noreferrer')
		}
	}
</script>

<svelte:window onclick={handleExternalUrl} />

<div class="big-window">
	<AuroraBg
		colorStops={['#00deee', '#4ea4f5', '#c476fa']}
		amplitude={0.8}
		blend={0.5}
		speed={1}
		{isDarkTheme}
		style={'top: 0; opacity: 0.3; max-height: 100px;'}
	/>
</div>

<div class="small-window">
	<AuroraBg
		colorStops={['#00deee', '#4ea4f5', '#c476fa']}
		amplitude={0.8}
		blend={0.5}
		speed={1}
		{isDarkTheme}
		style={'bottom: 0; opacity: 0.3; max-height: 100px; transform: rotate(180deg);'}
	/>
</div>

<NavBar
	tabs={[
		{
			title: 'ohana',
			href: '/ohana',
			icon: HeartHandshake
		},
		{
			title: 'care',
			href: '/care',
			icon: HeartPlus
		},
		{
			title: 'agenda',
			href: '/',
			icon: BookOpen
		},
		{
			title: 'me',
			href: '/me',
			icon: User
		},
		{
			title: 'zen',
			href: '/zen',
			icon: Wind
		}
	]}
/>

<main>
	{@render children()}
</main>

<style>
	.big-window {
		display: none;
	}

	@media (min-width: 601px) {
		.small-window {
			display: none;
		}

		.big-window {
			display: unset;
		}

		main {
			padding: 0 0 0 var(--tab-size);
		}
	}
</style>

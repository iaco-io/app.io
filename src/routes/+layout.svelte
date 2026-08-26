<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import { BookOpen, HeartHandshake, HeartPlus, User, Wind } from '@lucide/svelte'
	import AuroraBg from '@shared/AuroraBg.svelte'
	import NavBar from '@shared/NavBar.svelte'
	import '@shared/style.css'
	import { onMount } from 'svelte'
	import '../style.css'

	let { children } = $props()

	let isDarkTheme = $state(false)
	onMount(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)')
		isDarkTheme = media.matches
		const update = () => (isDarkTheme = media.matches)
		media.addEventListener('change', update)
		return () => media.removeEventListener('change', update)
	})

	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLElement
		const link = target.closest('a')

		if (!link) return

		if (link.origin !== window.location.origin) {
			event.preventDefault()
			window.open(link.href, '_blank', 'noopener,noreferrer')
		}
	}
</script>

<svelte:window onclick={handleClick} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AuroraBg
	colorStops={['#00deee', '#4ea4f5', '#c476fa']}
	amplitude={0.8}
	blend={0.5}
	speed={1}
	{isDarkTheme}
	style={'top: 0; opacity: 0.3; max-height: 100px;'}
/>

<div class="mobile-only">
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
	@media (min-width: 701px) {
		.mobile-only {
			display: none;
		}
	}
	main {
		scrollbar-width: none;
		overflow: scroll;
		min-height: 100px;
		height: 100dvh;
		width: 100vw;
		padding: 0 0 0 var(--tab-size);
		box-sizing: border-box;
	}

	@media (max-width: 700px) {
		main {
			height: 100dvh;
			width: 100vw;
			padding: 0 0 0 0;
			box-sizing: border-box;
		}
	}
</style>

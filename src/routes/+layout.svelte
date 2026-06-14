<script lang="ts">
	import '../app.css';
	import NeuralBackground from '$lib/components/NeuralBackground.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="root">
	<NeuralBackground />
	<div class="gradient-overlay" />

	<div class="content">
		<header>
			<div class="nav-left">
				{#if $page.url.pathname !== '/'}
					<a href="/" class="back">← Back</a>
				{/if}
			</div>
			<h1>{$page.data?.title ?? ''}</h1>
			<div class="nav-right"></div>
		</header>

		{@render children()}
	</div>
</div>

<style>
	.root {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
	}

	.gradient-overlay {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 85% 65% at 50% 50%, transparent 25%, var(--bg) 100%);
		pointer-events: none;
	}

	.content {
		position: relative;
		z-index: 1;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 1.5rem 2.5rem;
		background: rgba(4, 4, 14, 0.6);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border);
	}

	.nav-left {
		display: flex;
		align-items: center;
	}

	.back {
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		color: var(--fg-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.back:hover {
		color: var(--fg);
		text-decoration: none;
	}

	h1 {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: 1.1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--accent);
		text-align: center;
		white-space: nowrap;
	}

	.nav-right {
		display: flex;
		justify-content: flex-end;
	}

	:global(body) {
		padding-top: 72px;
	}
</style>

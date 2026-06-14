<script lang="ts">
	import '../app.css';
	import NeuralBackground from '$lib/components/NeuralBackground.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="root">
	<NeuralBackground />
	<div class="gradient-overlay" />
	<div class="content">
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
</style>

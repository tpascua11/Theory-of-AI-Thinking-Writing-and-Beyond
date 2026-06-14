<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Prophecy Method</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="page">
	<section class="docs">
		{@html data.content}
	</section>
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.docs {
		max-width: 780px;
		margin: 0 auto;
		padding: 60px 48px 80px;
	}

	.docs :global(h1) {
		font-family: 'Cinzel', Georgia, serif;
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--fg);
		margin-bottom: 1rem;
	}

	.docs :global(h2) {
		font-family: 'Cinzel', Georgia, serif;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin: 2.5rem 0 0.75rem;
		text-transform: uppercase;
	}

	.docs :global(h3) {
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--fg);
		margin: 2rem 0 0.5rem;
		text-transform: uppercase;
	}

	.docs :global(p) {
		color: var(--fg-muted);
		font-size: 0.95rem;
		line-height: 1.8;
		margin-bottom: 1rem;
	}

	.docs :global(blockquote) {
		border-left: 2px solid var(--accent);
		padding: 0.25rem 0 0.25rem 1.25rem;
		margin: 1.25rem 0;
	}

	.docs :global(blockquote p) {
		color: var(--fg-muted);
		font-style: italic;
	}

	.docs :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 2rem 0;
	}

	.docs :global(pre) {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1rem 1.25rem;
		overflow-x: auto;
		margin: 1rem 0 1.5rem;
	}

	.docs :global(pre code) {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.85rem;
		color: #A8ADBD;
		background: none;
		padding: 0;
	}

	.docs :global(code) {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.82rem;
		color: var(--accent);
		background: var(--bg-surface);
		padding: 0.1em 0.4em;
		border-radius: 4px;
	}

	.docs :global(strong) {
		color: var(--fg);
		font-weight: 600;
	}

	.docs :global(ul), .docs :global(ol) {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	.docs :global(li) {
		color: var(--fg-muted);
		font-size: 0.95rem;
		line-height: 1.8;
		margin-bottom: 0.25rem;
	}

	@media (max-width: 700px) {
		.docs { padding: 40px 20px 60px; }
	}
</style>

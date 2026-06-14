<svelte:head>
	<title>Theory of AI Thinking, Writing & Beyond</title>
	<meta
		name="description"
		content="Exploring the cognitive and creative architecture of artificial intelligence."
	/>
</svelte:head>

<section class="hero">
	<div class="content">
		<h1>Theory of AI Thinking, Writing &amp; Beyond</h1>
		<div class="cards">
			<a href="/brain-and-soul" class="card"></a>
			<a href="/" class="card"></a>
			<a href="/" class="card"></a>
			<a href="/" class="card"></a>
			<a href="/" class="card"></a>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		text-align: center;
		max-width: 800px;
		padding: 2rem;
	}

	h1 {
		font-size: clamp(1.25rem, 2.5vw, 2rem);
		font-weight: 600;
		color: var(--accent);
		margin-bottom: 2.5rem;
	}

	.cards {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.card {
		width: 100px;
		height: 120px;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: var(--bg-surface);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: border-color 0.2s, transform 0.2s;
	}

	.card:hover {
		border-color: var(--accent);
		transform: translateY(-3px);
	}
</style>

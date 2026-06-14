<svelte:head>
	<title>Theory of AI Thinking, Writing & Beyond</title>
	<meta
		name="description"
		content="Exploring the cognitive and creative architecture of artificial intelligence."
	/>
</svelte:head>

<section class="hero">
	<div class="content">
		<div class="cards">
			<a href="/brain-and-soul" class="card">
				<span class="subtitle">Character</span>
				<svg viewBox="0 0 50 50" width="72" height="72" aria-hidden="true">
					<!-- outer ring -->
					<circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
					<!-- inner growth lines -->
					<line x1="38" y1="10" x2="5" y2="22"  stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="5"  y1="22" x2="18" y2="44" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="18" y1="44" x2="12" y2="10" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="12" y1="10" x2="45" y2="22" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="45" y1="22" x2="32" y2="44" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="32" y1="44" x2="38" y2="10" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="42" y1="35" x2="8"  y2="35" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="8"  y1="35" x2="25" y2="5"  stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<line x1="25" y1="5"  x2="42" y2="35" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
					<!-- 9 core dots -->
					<circle cx="25" cy="5"  r="2.5" fill="#7CB35C"/>
					<circle cx="38" cy="10" r="2.5" fill="#8A99A8"/>
					<circle cx="45" cy="22" r="2.5" fill="#E0558C"/>
					<circle cx="42" cy="35" r="2.5" fill="#E8B53A"/>
					<circle cx="32" cy="44" r="2.5" fill="#9B59D0"/>
					<circle cx="18" cy="44" r="2.5" fill="#4A6FE3"/>
					<circle cx="8"  cy="35" r="2.5" fill="#2BA8A0"/>
					<circle cx="5"  cy="22" r="2.5" fill="#F07F2D"/>
					<circle cx="12" cy="10" r="2.5" fill="#D04040"/>
					<!-- center -->
					<circle cx="25" cy="25" r="2.5" fill="rgba(255,255,255,0.6)"/>
				</svg>
				<span>Brain and Soul</span>
			</a>
			<a href="/prophecy-method" class="card">
				<span class="subtitle">Story</span>
				<svg viewBox="0 0 50 50" width="72" height="72" aria-hidden="true">
					<!-- stone tablet outer shape -->
					<rect x="11" y="5" width="28" height="40" rx="6" ry="6" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="0.9"/>
					<!-- inner inset border (depth) -->
					<rect x="14" y="8" width="22" height="34" rx="4" ry="4" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
					<!-- prophecy seal at top -->
					<circle cx="25" cy="14" r="3" fill="none" stroke="rgba(232,181,58,0.45)" stroke-width="0.7"/>
					<circle cx="25" cy="14" r="1.4" fill="#E8B53A" opacity="0.75"/>
					<!-- separator line -->
					<line x1="15" y1="20" x2="35" y2="20" stroke="rgba(255,255,255,0.07)" stroke-width="0.6"/>
					<!-- carved rune lines — varying lengths for organic feel -->
					<line x1="16" y1="24" x2="34" y2="24" stroke="rgba(155,89,208,0.4)"  stroke-width="0.7"/>
					<line x1="16" y1="28" x2="30" y2="28" stroke="rgba(155,89,208,0.3)"  stroke-width="0.7"/>
					<line x1="16" y1="32" x2="34" y2="32" stroke="rgba(155,89,208,0.4)"  stroke-width="0.7"/>
					<line x1="16" y1="36" x2="26" y2="36" stroke="rgba(155,89,208,0.22)" stroke-width="0.7"/>
					<!-- hairline crack for ancient stone texture -->
					<path d="M 26 5 L 28 14 L 25 21" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.6"/>
				</svg>
				<span>Prophecy Method</span>
			</a>
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

	.cards {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
	}

	.card {
		width: 160px;
		height: 200px;
		border-radius: 16px;
		border: 1px solid var(--border);
		background: var(--bg-surface);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: border-color 0.2s, transform 0.2s;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 14px;
		padding-bottom: 16px;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		color: var(--fg-muted);
		text-decoration: none;
	}

	.subtitle {
		font-size: 0.6rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
		opacity: 0.7;
	}

	.card:hover {
		border-color: var(--accent);
		transform: translateY(-4px);
	}
</style>

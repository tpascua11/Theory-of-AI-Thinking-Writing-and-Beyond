<script lang="ts">
	import SoulWheel from '$lib/components/SoulWheel.svelte';
	import { SOULS, wingsOf, simpleOf, hardOf } from '$lib/soul-data';

	let { data } = $props();
	let selected = $state<number | null>(null);
	let showInfluence = $state(false);
	let copied = $state([false, false]);

	const soulBlocks = $derived.by(() => {
		if (selected === null) return [null, null];
		const sel = selected;
		const [w1, w2] = wingsOf(sel);
		const simpleT = simpleOf(sel);
		const hardT = hardOf(sel);

		const raw = (id: number) => `["${SOULS[id].words[0]}","${SOULS[id].words[1]}"]`;
		const html = (id: number) =>
			`<span class="str">"${SOULS[id].words[0]}"</span>, <span class="str">"${SOULS[id].words[1]}"</span>`;

		const make = (surfaceId: number, depthId: number) => ({
			surfaceId,
			raw: `SOUL:\n{\n  DRIVE: ${raw(sel)},\n  SURFACE: ${raw(surfaceId)},\n  DEPTH: ${raw(depthId)},\n  GROWTH:\n  {\n    SIMPLE: ${raw(simpleT)},\n    HARD: ${raw(hardT)}\n  }\n}`,
			code: `<span class="key">SOUL</span>:\n{\n  <span class="key">DRIVE</span>: [${html(sel)}],\n  <span class="key">SURFACE</span>: [${html(surfaceId)}],\n  <span class="key">DEPTH</span>: [${html(depthId)}],\n  <span class="key">GROWTH</span>:\n  {\n    <span class="key">SIMPLE</span>: [${html(simpleT)}],\n    <span class="key">HARD</span>: [${html(hardT)}]\n  }\n}`
		});

		return [make(w1, w2), make(w2, w1)];
	});

	async function copyCode(raw: string, idx: number) {
		try {
			await navigator.clipboard.writeText(raw);
		} catch {
			const ta = document.createElement('textarea');
			ta.value = raw;
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			document.body.removeChild(ta);
		}
		copied[idx] = true;
		setTimeout(() => { copied[idx] = false; }, 2000);
	}
</script>

<svelte:head>
	<title>Brain & Soul — Ninefold Resonance</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="page">
	<main class="stage" aria-live="polite">
		<div class="wheel-wrap">
			<SoulWheel
				{selected}
				{showInfluence}
				onselect={(id) => { selected = id; }}
				onreset={() => { selected = null; }}
			/>
			<button class="influence-toggle" onclick={() => { showInfluence = !showInfluence; }}>
				<span class="toggle-track" class:active={showInfluence}>
					<span class="toggle-thumb"></span>
				</span>
				<span>OUTER INFLUENCE</span>
			</button>
		</div>

		<div class="panels" aria-live="polite">
			{#each [0, 1] as idx}
				<div class="code-block">
					{#if soulBlocks[idx]}
						<button class="copy-btn" class:copied={copied[idx]} onclick={() => copyCode(soulBlocks[idx]!.raw, idx)}>
							{copied[idx] ? 'Copied!' : '📋 Copy'}
						</button>
						<div class="code-label">{selected} — {soulBlocks[idx]!.surfaceId}</div>
						<div class="code-body">{@html soulBlocks[idx]!.code}</div>
					{:else}
						<div class="code-empty">select a core to decode...</div>
					{/if}
				</div>
			{/each}
		</div>
		{#if selected !== null}
			<p class="panels-note">// place at the top of your character sheet — what comes after is yours. the character will build out further from this as their starting soul.</p>
		{/if}
	</main>

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

.stage {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px 48px 40px;
	}

	.wheel-wrap {
		width: 100%;
		max-width: 780px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.panels {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		width: 100%;
		max-width: 780px;
		margin-top: 16px;
	}

	.influence-toggle {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 16px;
		font-family: 'Cinzel', Georgia, serif;
		font-size: 11px;
		letter-spacing: 0.3em;
		color: var(--fg-muted);
		cursor: pointer;
		transition: color 0.3s;
		background: none;
		border: none;
	}

	.influence-toggle:hover { color: var(--fg); }

	.toggle-track {
		width: 36px;
		height: 18px;
		background: var(--border);
		border-radius: 9px;
		position: relative;
		transition: background 0.3s;
		display: inline-block;
		flex-shrink: 0;
	}

	.toggle-track.active { background: #2BA8A0; }

	.toggle-thumb {
		width: 14px;
		height: 14px;
		background: var(--fg);
		border-radius: 50%;
		position: absolute;
		top: 2px;
		left: 2px;
		transition: transform 0.3s;
		display: block;
	}

	.toggle-track.active .toggle-thumb { transform: translateX(18px); }

	.code-block {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		position: relative;
		min-height: 120px;
	}

	.copy-btn {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 10;
		background: none;
		border: 1px solid var(--border);
		cursor: pointer;
		color: var(--fg-muted);
		font-size: 11px;
		padding: 3px 9px;
		border-radius: 4px;
		transition: all 0.2s;
		opacity: 0.5;
	}

	.copy-btn:hover { opacity: 1; border-color: var(--fg-muted); color: var(--fg); }
	.copy-btn.copied { opacity: 1; border-color: #7CB35C; color: #7CB35C; }

	.code-label {
		font-family: 'Cinzel', Georgia, serif;
		font-size: 11px;
		letter-spacing: 0.25em;
		color: var(--fg-muted);
		opacity: 0.6;
		padding: 10px 14px 0;
		text-transform: uppercase;
	}

	.code-body {
		padding: 8px 12px 12px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 11px;
		line-height: 1.6;
		color: #A8ADBD;
		white-space: pre;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.code-body::-webkit-scrollbar { display: none; }
	.code-body :global(.key) { color: var(--accent); }
	.code-body :global(.str) { color: #7CB35C; }

	.code-empty {
		min-height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--fg-muted);
		opacity: 0.3;
		font-style: italic;
		font-size: 11px;
		text-align: center;
	}

	.panels-note {
		width: 100%;
		max-width: 780px;
		margin-top: 8px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 11px;
		color: var(--fg-muted);
		opacity: 0.4;
		letter-spacing: 0.02em;
	}

	@media (max-width: 700px) {
		.stage { padding: 8px 18px 32px; }
		.panels { grid-template-columns: 1fr; }
	}

	.docs {
		max-width: 780px;
		margin: 0 auto;
		padding: 60px 48px 80px;
		border-top: 1px solid var(--border);
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

	.docs :global(table) {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
		margin: 1rem 0 1.5rem;
	}

	.docs :global(th) {
		text-align: left;
		padding: 0.5rem 0.75rem;
		color: var(--fg-muted);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		border-bottom: 1px solid var(--border);
	}

	.docs :global(td) {
		padding: 0.5rem 0.75rem;
		color: var(--fg-muted);
		border-bottom: 1px solid var(--border);
		line-height: 1.6;
	}

	.docs :global(tr:last-child td) {
		border-bottom: none;
	}

	.docs :global(code) {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.82rem;
		color: var(--accent);
		background: var(--bg-surface);
		padding: 0.1em 0.4em;
		border-radius: 4px;
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
		background: none;
		padding: 0;
		font-size: 0.85rem;
		color: #A8ADBD;
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
</style>

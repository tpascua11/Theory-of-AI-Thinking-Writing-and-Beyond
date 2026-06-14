<script lang="ts">
	import { CX, CY, R, RING, SOULS, SIMPLE, pos, wingsOf, simpleOf, hardOf, kinOf } from '$lib/soul-data';

	let {
		selected,
		showInfluence,
		onselect,
		onreset
	}: {
		selected: number | null;
		showInfluence: boolean;
		onselect: (id: number) => void;
		onreset: () => void;
	} = $props();

	const cores = RING.map((id) => ({ id, ...pos(id), ...SOULS[id] }));

	const wingArcs = RING.map((a, i) => {
		const b = RING[(i + 1) % 9];
		const p1 = pos(a), p2 = pos(b);
		return {
			a, b,
			x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
			c1: SOULS[a].color, c2: SOULS[b].color,
			d: `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R} ${R} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
		};
	});

	const NODE_R = 78;
	const growthLines = SIMPLE.map(([a, b]) => {
		const p1 = pos(a), p2 = pos(b);
		const dx = p2.x - p1.x, dy = p2.y - p1.y;
		const d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
		return {
			a, b, color: SOULS[a].color,
			x1: p1.x + ux * (NODE_R + 4), y1: p1.y + uy * (NODE_R + 4),
			x2: p2.x - ux * (NODE_R + 10), y2: p2.y - uy * (NODE_R + 10)
		};
	});

	function nodeState(id: number) {
		if (selected === null) return '';
		if (id === selected) return 'lit';
		return kinOf(selected).has(id) ? 'kin' : 'dim';
	}

	function wingState(w: { a: number; b: number }) {
		if (selected === null) return '';
		return w.a === selected || w.b === selected ? 'active' : 'faded';
	}

	function growthState(g: { a: number; b: number }) {
		if (selected === null) return '';
		return g.a === selected || g.b === selected ? 'active' : 'faded';
	}

	const INF_EXTEND = 260;

	const influenceLines = $derived(
		showInfluence
			? RING.map((id) => {
					const p = pos(id);
					const vx = p.x - CX, vy = p.y - CY;
					const vd = Math.hypot(vx, vy);
					return { id, color: SOULS[id].color, x2: p.x + (vx / vd) * INF_EXTEND, y2: p.y + (vy / vd) * INF_EXTEND };
				})
			: []
	);

	const roleTags = $derived(
		RING.map((id) => {
			const p = pos(id);
			let label = '', show = false;
			if (selected !== null && id !== selected && kinOf(selected).has(id)) {
				show = true;
				if (wingsOf(selected).includes(id)) label = 'wing';
				else if (simpleOf(selected) === id) label = 'simple';
				else label = 'hard';
			}
			const vx = p.x - CX, vy = p.y - CY, vd = Math.hypot(vx, vy);
			return { id, label, show, x: p.x + (vx / vd) * 118, y: p.y + (vy / vd) * 118 + 5 };
		})
	);
</script>

<svg viewBox="0 0 1000 1000" role="group" aria-label="The Ninefold Resonance wheel">
	<defs>
		{#each wingArcs as w}
			<linearGradient
				id={'wing' + w.a + w.b}
				gradientUnits="userSpaceOnUse"
				x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2}
			>
				<stop offset="0" stop-color={w.c1} />
				<stop offset="1" stop-color={w.c2} />
			</linearGradient>
		{/each}
		<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
			markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
			<path d="M0,0 L10,5 L0,10 z" fill="#C9CDD8" />
		</marker>
	</defs>

	{#each wingArcs as w}
		<path
			class="wing {wingState(w)}"
			d={w.d}
			fill="none"
			stroke={'url(#wing' + w.a + w.b + ')'}
			stroke-width="9"
		/>
	{/each}

	{#each growthLines as g}
		<line
			class="growth {growthState(g)}"
			x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}
			stroke={g.color}
			stroke-width="3.5"
			marker-end="url(#arrow)"
		/>
	{/each}

	{#if showInfluence}
		{#each influenceLines as inf}
			<line class="inf-line" x1={CX} y1={CY} x2={inf.x2} y2={inf.y2} stroke={inf.color} />
		{/each}
	{/if}

	{#each cores as c}
		<g
			class="node {nodeState(c.id)}"
			style="--c:{c.color}"
			tabindex="0"
			role="button"
			aria-label={'Core ' + c.id + ': ' + c.words.join(', ')}
			onclick={() => onselect(c.id)}
			onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onselect(c.id); } }}
		>
			<circle class="ring" cx={c.x} cy={c.y} r="85" fill="none" stroke={c.color} stroke-width="2" opacity="0.35" />
			<circle cx={c.x} cy={c.y} r="78" fill="#1B1F2A" stroke={c.color} stroke-width="4" />
			<text x={c.x} y={c.y - 26} text-anchor="middle" fill={c.color}
				font-family="Cinzel, Georgia, serif" font-size="36" font-weight="700">{c.id}</text>
			<text x={c.x} y={c.y + 8} text-anchor="middle" fill="#EDEAE2" font-size="19">{c.words[0]}</text>
			<text x={c.x} y={c.y + 34} text-anchor="middle" fill="#EDEAE2" font-size="19">{c.words[1]}</text>
		</g>
	{/each}

	{#each roleTags as t}
		<text
			class="role-tag"
			class:show={t.show}
			x={t.x} y={t.y}
			text-anchor="middle"
		>{t.label}</text>
	{/each}

	<g
		class="node-zero"
		tabindex="0"
		role="button"
		aria-label="Core 0, the Subjective. Wakes all cores."
		onclick={() => onreset()}
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onreset(); } }}
	>
		<circle class="halo" cx={CX} cy={CY} r="85" fill="none" stroke="#FFFFFF" stroke-width="2" />
		<circle cx={CX} cy={CY} r="78" fill="#1B1F2A" stroke="#FFFFFF" stroke-width="4" />
		<text x={CX} y={CY - 24} text-anchor="middle" fill="#FFFFFF"
			font-family="Cinzel, Georgia, serif" font-size="36" font-weight="700">0</text>
		<text x={CX} y={CY + 18} text-anchor="middle" fill="#EDEAE2" font-size="26">?, ?</text>
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		max-height: 80vh;
	}

	.node { cursor: pointer; transition: opacity .5s ease, filter .5s ease; outline: none; }
	.node.lit { filter: drop-shadow(0 0 16px var(--c)) drop-shadow(0 0 38px color-mix(in srgb, var(--c) 45%, transparent)); }
	.node.kin { filter: drop-shadow(0 0 9px color-mix(in srgb, var(--c) 70%, transparent)); }
	.node.dim { filter: saturate(.22) brightness(.5) drop-shadow(0 0 13px color-mix(in srgb, var(--c) 38%, transparent)); opacity: .9; }

	.node-zero { cursor: pointer; transition: filter .5s ease; outline: none; }
	.node-zero:hover, .node-zero:focus-visible { filter: drop-shadow(0 0 18px rgba(255,255,255,.55)); }

	.halo { animation: breathe 5.2s ease-in-out infinite; transform-origin: center; }
	@keyframes breathe { 0%, 100% { opacity: .28; } 50% { opacity: .6; } }

	.wing, .growth { transition: opacity .5s ease, filter .5s ease; }
	.wing.faded, .growth.faded { opacity: .07; }
	.wing.active { opacity: 1; filter: drop-shadow(0 0 6px rgba(255,255,255,.18)); }
	.growth.active { opacity: 1; filter: drop-shadow(0 0 6px rgba(255,255,255,.18)); }

	.role-tag {
		font-family: 'Cinzel', Georgia, serif;
		font-size: 13px;
		letter-spacing: .3em;
		fill: #8E93A3;
		text-transform: uppercase;
		opacity: 0;
		transition: opacity .5s ease;
		pointer-events: none;
		user-select: none;
	}
	.role-tag.show { opacity: 1; }

	.inf-line { stroke-width: 1.4; stroke-dasharray: 8 10; opacity: .45; }

	@media (prefers-reduced-motion: reduce) {
		.node, .wing, .growth, .role-tag, .node-zero { transition: none; }
		.halo { animation: none; opacity: .4; }
	}
</style>

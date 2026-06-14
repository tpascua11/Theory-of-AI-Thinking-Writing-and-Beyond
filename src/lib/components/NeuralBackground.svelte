<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		let raf: number;
		let W = 0,
			H = 0;

		const N = 72;
		const MAX_D = 155;

		type Pt = { x: number; y: number; vx: number; vy: number; r: number };
		type Pulse = { ai: number; bi: number; t: number; spd: number };

		let pts: Pt[] = [];
		let pulses: Pulse[] = [];

		function resize() {
			W = canvas.width = canvas.offsetWidth;
			H = canvas.height = canvas.offsetHeight;
			pts = Array.from({ length: N }, () => ({
				x: Math.random() * W,
				y: Math.random() * H,
				vx: (Math.random() - 0.5) * 0.38,
				vy: (Math.random() - 0.5) * 0.38,
				r: Math.random() * 1.5 + 1.2
			}));
		}

		function isDark() {
			return document.documentElement.classList.contains('dark');
		}

		function tick() {
			for (const p of pts) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > W) p.vx *= -1;
				if (p.y < 0 || p.y > H) p.vy *= -1;
			}

			if (Math.random() < 0.04 && pulses.length < 28) {
				const ai = Math.floor(Math.random() * N);
				let bi = -1,
					best = Infinity;
				for (let i = 0; i < N; i++) {
					if (i === ai) continue;
					const dx = pts[ai].x - pts[i].x;
					const dy = pts[ai].y - pts[i].y;
					const d2 = dx * dx + dy * dy;
					if (d2 < MAX_D * MAX_D && d2 < best) {
						best = d2;
						bi = i;
					}
				}
				if (bi !== -1) pulses.push({ ai, bi, t: 0, spd: 0.007 + Math.random() * 0.011 });
			}
		}

		function draw() {
			ctx.clearRect(0, 0, W, H);

			const dark = isDark();
			const nodeRgb = dark ? '110,231,247' : '79,102,255';
			const lineRgb = dark ? '110,231,247' : '79,102,255';
			const pulseColor = dark ? 'rgba(192,132,252,0.95)' : 'rgba(139,92,246,0.88)';
			const lineMax = dark ? 0.38 : 0.22;

			// lines
			for (let i = 0; i < N; i++) {
				for (let j = i + 1; j < N; j++) {
					const dx = pts[i].x - pts[j].x;
					const dy = pts[i].y - pts[j].y;
					const d2 = dx * dx + dy * dy;
					if (d2 < MAX_D * MAX_D) {
						const alpha = (1 - Math.sqrt(d2) / MAX_D) * lineMax;
						ctx.beginPath();
						ctx.strokeStyle = `rgba(${lineRgb},${alpha})`;
						ctx.lineWidth = 0.75;
						ctx.moveTo(pts[i].x, pts[i].y);
						ctx.lineTo(pts[j].x, pts[j].y);
						ctx.stroke();
					}
				}
			}

			// pulses
			pulses = pulses.filter((p) => {
				p.t += p.spd;
				if (p.t > 1) return false;
				const a = pts[p.ai],
					b = pts[p.bi];
				const x = a.x + (b.x - a.x) * p.t;
				const y = a.y + (b.y - a.y) * p.t;

				const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
				glow.addColorStop(0, pulseColor);
				glow.addColorStop(1, 'transparent');
				ctx.beginPath();
				ctx.arc(x, y, 8, 0, Math.PI * 2);
				ctx.fillStyle = glow;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(x, y, 2.2, 0, Math.PI * 2);
				ctx.fillStyle = pulseColor;
				ctx.fill();

				return true;
			});

			// nodes
			for (const p of pts) {
				const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
				glow.addColorStop(0, `rgba(${nodeRgb},${dark ? 0.4 : 0.25})`);
				glow.addColorStop(1, `rgba(${nodeRgb},0)`);
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
				ctx.fillStyle = glow;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${nodeRgb},${dark ? 0.88 : 0.7})`;
				ctx.fill();
			}
		}

		function loop() {
			tick();
			draw();
			raf = requestAnimationFrame(loop);
		}

		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		resize();
		loop();

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>

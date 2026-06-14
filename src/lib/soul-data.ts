export const CX = 500, CY = 500, R = 330;

export const ANGLES: Record<number, number> = {
	9: -90, 1: -50, 2: -10, 3: 30, 4: 70, 5: 110, 6: 150, 7: 190, 8: 230
};

export const RING = [9, 1, 2, 3, 4, 5, 6, 7, 8];

export interface Soul {
	words: [string, string];
	color: string;
	triad: string;
}

export const SOULS: Record<number, Soul> = {
	1: { words: ['Integrity', 'Correction'],      color: '#8A99A8', triad: 'BODY' },
	2: { words: ['Needed', 'Love'],               color: '#E0558C', triad: 'HEART' },
	3: { words: ['Significance', 'Success'],      color: '#E8B53A', triad: 'HEART' },
	4: { words: ['Identity', 'Compassion'],       color: '#9B59D0', triad: 'HEART' },
	5: { words: ['Understanding', 'Observation'], color: '#4A6FE3', triad: 'HEAD' },
	6: { words: ['Trust', 'Connection'],          color: '#2BA8A0', triad: 'HEAD' },
	7: { words: ['Possibility', 'Freedom'],       color: '#F07F2D', triad: 'HEAD' },
	8: { words: ['Power', 'Resolve'],             color: '#D04040', triad: 'BODY' },
	9: { words: ['Ease', 'Harmony'],              color: '#7CB35C', triad: 'BODY' },
};

export const SIMPLE: [number, number][] = [
	[1, 7], [7, 5], [5, 8], [8, 2], [2, 4], [4, 1], [3, 6], [6, 9], [9, 3]
];

export const pos = (id: number) => {
	const a = ANGLES[id] * Math.PI / 180;
	return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
};

export const wingsOf = (id: number): [number, number] => {
	const i = RING.indexOf(id);
	return [RING[(i + 8) % 9], RING[(i + 1) % 9]];
};

export const simpleOf = (id: number) => SIMPLE.find(p => p[0] === id)![1];
export const hardOf   = (id: number) => SIMPLE.find(p => p[1] === id)![0];
export const kinOf    = (id: number) => new Set([...wingsOf(id), simpleOf(id), hardOf(id)]);

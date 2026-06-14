import { readFileSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';

export function load() {
	const raw = readFileSync(resolve('DOCS/SOUL_BRAIN_DOCS.md'), 'utf-8');
	const content = marked(raw);
	return { content };
}

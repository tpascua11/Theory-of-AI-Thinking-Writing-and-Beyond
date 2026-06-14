import { readFileSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';

export function load() {
	const raw = readFileSync(resolve('DOCS/PROPHECY_METHOD.md'), 'utf-8');
	const content = marked(raw);
	return { title: 'Prophecy Method', content };
}

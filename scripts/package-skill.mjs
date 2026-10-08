#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const stage = resolve(dist, '.stage', 'frontend-standards');
rmSync(resolve(dist, '.stage'), { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
for (const entry of ['SKILL.md', 'README.md', 'CHANGELOG.md', 'LICENSE', 'NOTICE.md', 'SOURCES.md', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'scripts', '.github', 'site']) {
  const from = resolve(root, entry);
  if (existsSync(from)) cpSync(from, resolve(stage, entry), { recursive: true, filter: (source) => !source.includes('/node_modules/') && !source.includes('/dist/') && !source.includes('/.git/') });
}
mkdirSync(dist, { recursive: true });
const output = resolve(dist, 'frontend-standards.zip');
rmSync(output, { force: true });
if (process.platform === 'darwin') execFileSync('ditto', ['-c', '-k', '--keepParent', stage, output]);
else execFileSync('zip', ['-r', '-q', output, 'frontend-standards'], { cwd: resolve(dist, '.stage') });
rmSync(resolve(dist, '.stage'), { recursive: true, force: true });
console.log(output);

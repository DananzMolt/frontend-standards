#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';

const skillDir = resolve(process.argv[2] ?? '.');
const fail = (message) => { console.error(`Validation failed: ${message}`); process.exitCode = 1; };
const skillPath = resolve(skillDir, 'SKILL.md');
if (!existsSync(skillPath)) fail('SKILL.md is missing.');
else {
  const text = readFileSync(skillPath, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) fail('SKILL.md must start with YAML frontmatter.');
  else {
    for (const field of ['name', 'description']) {
      if (!new RegExp(`^${field}:\\s*\\S+`, 'm').test(frontmatter[1])) fail(`frontmatter requires ${field}.`);
    }
    const name = frontmatter[1].match(/^name:\s*([^\n]+)/m)?.[1].trim().replace(/^['"]|['"]$/g, '');
    if (name !== 'frontend-standards') fail('frontmatter name must be frontend-standards.');
    if (skillDir.split('/').at(-1) !== 'frontend-standards') fail('skill directory must be named frontend-standards.');
  }
  if (/@[\w./-]+-(?:alpha|beta|canary|next|rc)(?:[.-]\w+)?\b/i.test(text)) fail('skill guidance must not recommend prerelease dependencies.');
  for (const library of ['Next.js', 'Base UI', 'Base UI Drawer', 'Motion for React', 'Auto Animate', 'Phosphor Icons', 'Google Sans', 'TanStack Query', 'Boneyard', 'NumberFlow', 'Sonner', 'Zustand', 'Virtuoso', 'dnd-kit', 'Recharts', 'Liveline']) {
    if (!text.includes(library)) fail(`curated library missing: ${library}`);
  }
  for (const match of text.matchAll(/\[[^\]]+\]\((?!https?:|mailto:|#)([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (target && !existsSync(resolve(dirname(skillPath), target))) fail(`broken local link: ${target}`);
  }
}
if (!process.exitCode) console.log('frontend-standards validation passed.');

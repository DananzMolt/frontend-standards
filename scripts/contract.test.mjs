import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);

test('validator exists and protects the curated stack', () => {
  const validator = new URL('./validate-skill.mjs', import.meta.url);
  assert.equal(existsSync(validator), true);
  const source = readFileSync(new URL('./SKILL.md', root), 'utf8');
  for (const name of ['Next.js', 'Base UI', 'Vaul', 'Motion for React', 'Auto Animate', 'Phosphor Icons', 'Google Sans', 'TanStack Query', 'Boneyard', 'NumberFlow', 'Sonner', 'Zustand', 'Virtuoso', 'dnd-kit', 'Recharts', 'Liveline']) {
    assert.match(source, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('skill makes recoverable UI state URL-owned', () => {
  const source = readFileSync(new URL('./SKILL.md', root), 'utf8');
  assert.match(source, /Query parameters are the default owner/);
});

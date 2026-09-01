# Frontend Standards maintenance

`SKILL.md` is canonical. When asked to update this skill: read the complete current skill and supporting files; inspect the requested change for conflicts or duplication; update `SKILL.md` and only affected supporting files; bump the frontmatter version; add a changelog entry; run `node scripts/validate-skill.mjs .`; run `node scripts/package-skill.mjs`; update `site/` whenever libraries, features, installation, or message changes; run its build and relevant checks; and commit clearly.

Never silently remove a standard. Never pin dependency versions in skill guidance. For frontend work, check official sources for current compatible stable releases.

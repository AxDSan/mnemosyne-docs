# Mnemosyne Documentation

The documentation site for [Mnemosyne](https://github.com/mnemosyne-oss/mnemosyne), a local-first memory layer for AI agents.

**Live:** [docs.mnemosyne.site](https://docs.mnemosyne.site)

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

Before opening a pull request:

```bash
npm run check          # lint, build, and smoke-test the output
```

The site is a **static export**. A broken MDX import, an unresolvable route, or a bad component reference fails the build rather than producing a runtime error, so `npm run build` is a real correctness gate.

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Static export to `dist/` |
| `npm run lint` | ESLint |
| `npm run smoke:local` | Smoke-test `dist/` without deploying |
| `npm run smoke` | Smoke-test the live site |
| `npm run check` | All of the above, in the order CI runs them |

Requires Node 20 or later.

---

## How content works

**Page bodies live in `content/`. Nothing else.**

Every route under `src/app/(docs)/` is a three-line shim that re-exports its counterpart:

```mdx
{/* Route shim. Do not edit.
    Content lives in content/getting-started/quick-start.mdx */}
export { default } from "../../../../../content/getting-started/quick-start.mdx";
```

This is enforced in CI. A route file containing prose fails the build.

The rule exists because the two trees were once full copies of each other and drifted in **opposite** directions: `src/` rendered the page body at one version while `content/` supplied the title and description at another, so every page displayed two different wrong versions simultaneously. `src/` also accumulated factual corrections that were never back-ported, which meant regenerating from the nominal "source of truth" would have reintroduced known-wrong text.

### Adding a page

1. Create `content/<section>/<page>.mdx`, starting with a `# Title` H1.
2. Create the shim at `src/app/(docs)/<section>/<page>/page.mdx`.
3. Add the slug to `pageOrder` in `src/lib/content.ts`.
4. Add an entry to `searchIndex` in `src/components/search.tsx`.
5. Add the page to its section in `src/components/sidebar.tsx`.

All five matter. `pageOrder` drives prev/next navigation **and the sitemap**, so a page missing there is not indexed. A slug in `pageOrder` with no route 404s in navigation; a route with no `content/` file renders untitled and breaks its neighbours' prev/next chain.

### Generated pages

Two artifacts are written by the main repository's `scripts/generate-docs.py` and must not be edited by hand:

- `content/api/tool-schema.mdx`
- the `GENERATED_CONFIG_TABLE` block in `content/getting-started/configuration.mdx`

Both derive from the Mnemosyne source. Hand edits are overwritten on the next run. To change them, change the code or the generator.

---

## Accuracy

This site makes factual claims about a codebase that lives elsewhere. Verify against [`mnemosyne-oss/mnemosyne`](https://github.com/mnemosyne-oss/mnemosyne) before writing one; tool counts, environment variable names, CLI syntax, and benchmark figures have all been wrong here before.

Two habits prevent most of it.

**Do not scatter version numbers through prose.** "Get Mnemosyne v3.12.0 running in five minutes" carries no information and rots silently. Worse, a global find-and-replace across such strings has already destroyed real data once: the sync feature table was mass-rewritten from v3.6.0 to v3.12.0, erasing the since-version information the table existed to convey. Version numbers belong in feature-availability statements ("sync landed in v3.6.0", checked against the changelog) and in `version.txt`, which holds the latest **published** release rather than whatever the source tree says.

**Check environment variables and tools against the source.** Several documented environment variables never existed, and an entire REST API page described a server with no implementation.

Current ground truth is recorded in [AGENTS.md](AGENTS.md).

---

## Structure

```
content/              MDX page bodies. The only place prose lives.
src/app/(docs)/       Route shims, one per page
src/components/       Sidebar, search, code blocks, callouts
src/lib/              Page registry, prev/next, SEO metadata
public/               Static assets, llms.txt, favicons, OG images
audits/               Historical documentation audit reports
scripts/              Smoke test and audit checkpoint helpers
version.txt           Latest published Mnemosyne release, read at build time
```

| File | Purpose |
|---|---|
| `src/lib/content.ts` | `pageOrder`, prev/next navigation, reading time |
| `src/lib/seo.ts` | Per-page metadata, Open Graph, structured data |
| `src/app/sitemap.ts` | Sitemap, derived from `pageOrder` |
| `src/components/sidebar.tsx` | Navigation tree |
| `src/components/search.tsx` | Search index and the ⌘K palette |
| `mdx-components.tsx` | Components available to every MDX page |
| `next.config.ts` | Static export and MDX configuration |

---

## Stack

Next.js 16 with the App Router, static export via `output: "export"`. MDX through `@next/mdx`. Tailwind CSS v4. TypeScript. Deployed on Vercel.

---

## License

MIT. See [LICENSE](LICENSE).

## Author

**Abdias Moya** — [@AxDSan](https://github.com/AxDSan)

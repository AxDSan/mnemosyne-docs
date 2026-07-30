<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Content rules

## `content/` is the only place page bodies live

Every route under `src/app/(docs)/**/page.mdx` is a **three-line shim** that
re-exports its file in `content/`:

```mdx
{/* Route shim. Do not edit.
    Content lives in content/getting-started/quick-start.mdx */}
export { default } from "../../../../../content/getting-started/quick-start.mdx";
```

Do not put prose in a route file. If you find prose there, it is a bug: move it
into `content/` and replace the route with a shim.

This rule exists because the two trees were previously full copies of each
other, and they drifted in **both** directions. `src/` rendered the page body
and was stuck on one version while `content/` supplied the title and
description from another, so every page displayed two different wrong versions
at once. `src/` also accumulated factual corrections that were never
back-ported, so regenerating from `content/` would have silently reintroduced
known-wrong text.

## Adding a page

1. Create `content/<section>/<page>.mdx` with a `# Title` H1.
2. Create the shim at `src/app/(docs)/<section>/<page>/page.mdx`.
3. Add the slug to `pageOrder` in `src/lib/content.ts`. This drives prev/next
   **and the sitemap**, so a page missing here is not indexed.
4. Add an entry to `searchIndex` in `src/components/search.tsx`.
5. Add the page to the relevant section in `src/components/sidebar.tsx`.

A slug in `pageOrder` with no route produces a 404 in prev/next navigation. A
route with no `content/` file renders with no title, no description, and breaks
the prev/next chain for its neighbours. Keep all three in step.

## Generated files: do not hand-edit

| File | Written by |
|---|---|
| `content/api/tool-schema.mdx` | `../mnemosyne/scripts/generate-docs.py` |
| the `GENERATED_CONFIG_TABLE` block in `content/getting-started/configuration.mdx` | same |

Those are derived from the Mnemosyne source. Editing them by hand is reverted
on the next generator run. To change them, change the code or the generator.

Note that MDX rejects HTML comments. The generator emits a blockquote notice
rather than `<!-- ... -->` for this reason. Do not "fix" it back.

## Version references

Do not sprinkle version numbers through prose. A sentence like "Get Mnemosyne
v3.12.0 running in under 5 minutes" carries no information and goes stale
silently, and a global find-and-replace across such strings has already
destroyed real data once: the sync feature table was mass-rewritten from
v3.6.0 to v3.12.0, erasing the since-version information the table existed to
convey.

Version numbers belong in exactly two places:

- **Feature availability**, where the version is the point: "Sync landed in
  v3.6.0." Verify against `../mnemosyne/CHANGELOG.md` before writing one.
- **`version.txt`**, which drives the homepage badge. It should hold the latest
  **published** release, which is not necessarily the version in the Mnemosyne
  source tree. Check with `pip index versions mnemosyne-memory`.

## Before claiming anything about Mnemosyne

Verify it against `../mnemosyne`. Tool counts, environment variable names,
CLI syntax, defaults, and benchmark figures have all been wrong on this site.
Current ground truth:

- **36 tools advertised, 28 callable over MCP**, 8 implemented only in the
  Hermes provider. A page saying 6, 15, 17, 23, 25, or 37 is stale.
- Sync subcommands are **hyphenated top-level commands** (`sync-serve`), and
  `mnemosyne sync` requires `--db-path` as well as `--remote`.
- There is **no general-purpose REST API**. See `content/api/rest.mdx`.
- Environment variables must exist in `mnemosyne/core/config.py` or be a real
  `os.environ` read. Several documented ones were invented.

## Checks before you commit

```bash
npm run build     # must succeed; static export, so a broken import is a build error
npm run lint
```

# Mnemosyne Documentation

The official documentation site for [Mnemosyne](https://github.com/mnemosyne-oss/mnemosyne) — the native memory system for AI agents.

**Live site:** [docs.mnemosyne.site](https://docs.mnemosyne.site)

## Tech Stack

- **Next.js 16** (static export via `output: "export"`)
- **MDX** for content authoring (`@next/mdx` + `next-mdx-remote`)
- **Tailwind CSS v4** with custom design tokens
- **TypeScript** throughout
- Deployed on Vercel

## Project Structure

```
content/              # MDX source files (single source of truth)
src/app/(docs)/       # Next.js App Router pages (route + render MDX)
src/components/        # UI components (sidebar, search, code-block, etc.)
src/lib/               # Content utilities, SEO, related-pages logic
public/                # Static assets, llms.txt, favicons, OG images
scripts/               # Build helpers (smoke-test, harden)
version.txt            # Current Mnemosyne version (read at build time)
```

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to dist/
npm run lint     # eslint
```

## Content Authoring

All docs live as `.mdx` files in `content/`. To add a new page:

1. Create `content/<section>/<page>.mdx` with a `# Title` H1
2. Create the route shim at `src/app/(docs)/<section>/<page>/page.mdx` (re-export only, never duplicate; see AGENTS.md)
3. Add the slug to `pageOrder` in `src/lib/content.ts` (controls prev/next nav)
4. Add an entry to `searchIndex` in `src/components/search.tsx`
5. Add the page to the relevant section in `src/components/sidebar.tsx`

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/content.ts` | Page registry, prev/next nav, reading-time calc |
| `src/components/sidebar.tsx` | Left sidebar navigation tree |
| `src/components/search.tsx` | ⌘K search with client-side filtering |
| `src/app/layout.tsx` | Root layout, fonts, metadata, SEO |
| `src/app/page.tsx` | Landing page |
| `next.config.ts` | Static export config + MDX setup |

## License

MIT — see [LICENSE](https://github.com/mnemosyne-oss/mnemosyne/blob/main/LICENSE) in the main repo.

## Author

**Abdias Moya** — [@axdsan](https://github.com/axdsan)

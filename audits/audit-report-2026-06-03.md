# Documentation Audit Report — 2026-06-03

**Version:** v3.1.0 → v3.4.0  
**Pages in scope:** 143 (all tracked)  
**Pages audited:** 67 source pages (Pass 1: hard errors only)  
**Issues found:** 57  
**Issues fixed:** 57  
**Build:** Clean (npx next build, all pages compiled)

---

## Pass 1: Hard Errors (57 findings)

### Deployment (13 fixed)

All 4 deployment guides (docker, fly-io, systemd, cron) had critical runtime bugs:

| Guide | Finding | Severity |
|-------|---------|----------|
| docker | No MNEMOSYNE_MCP_TOKEN when binding 0.0.0.0 | BROKEN |
| docker | Healthcheck /health endpoint doesn't exist | BROKEN |
| docker | Missing [mcp] extras (no starlette/uvicorn) | BROKEN |
| fly-io | Fictional MNEMOSYNE_HOST env var | BROKEN |
| fly-io | Fictional MNEMOSYNE_PORT env var | BROKEN |
| fly-io | No MCP_TOKEN with 0.0.0.0 bind | BROKEN |
| fly-io | Missing [mcp] extras | BROKEN |
| systemd | Fictional --db-path CLI argument | BROKEN |
| systemd | No MCP_TOKEN with 0.0.0.0 bind | BROKEN |
| systemd | Missing [mcp] extras | BROKEN |
| cron | mnemosyne-backup binary doesn't exist | BROKEN |
| cron | create_backup receives str not Path | BROKEN |
| systemd | Logrotate path mismatch | WRONG |

**Root cause:** All 3 server guides bound to 0.0.0.0 without setting the mandatory MNEMOSYNE_MCP_TOKEN (mcp_server.py line 73-85 raises RuntimeError). The MCP server has no /health endpoint (only /sse and /messages). Extras weren't specified so SSE transport fails at ImportError.

### Version Rot (33 fixed)

| Category | Count | Files |
|----------|-------|-------|
| "Mnemosyne v2" claims in body text | 5 | getting-started.mdx, installation.mdx, page.mdx, quick-start.mdx, from-hindsight.mdx |
| Stale duplicate pages at v3.1.2 | 2 | getting-started/page.mdx, quick-start.mdx |
| "(v2.1)" annotations in API docs | 10 | python-sdk.mdx, tool-schema.mdx |
| "(since v2.3)" annotations | 4 | tiered-degradation.mdx, veracity-signal.mdx, multi-agent.mdx |
| Code example "Deployed v2.5.0" | 3 | getting-started files |
| Wrong class name "Memory" | 1 | semantic.mdx → Mnemosyne |
| Comparison page version bumps v3.1.2→v3.4.0 | 7 | All comparison pages |

### Core API (11 fixed)

| Page | Finding | Severity |
|------|---------|----------|
| mcp-server.mdx | Description says "6 tools" (actually 24) | BROKEN |
| mcp-server.mdx | Only 6 of 24 tools listed in table | BROKEN |
| hermes-plugin.mdx | Says "23 tools" (plugin registers 17) | BROKEN |
| hermes-plugin.mdx | Missing graph_query/graph_link schemas | BROKEN |
| hermes-plugin.mdx | "Requires Hermes v2.0" → v3.0 | STALE |
| python-sdk.mdx | Missing CompressionPlugin from built-in list | BROKEN |
| python-sdk.mdx | "V2 Properties" → "Subsystem Properties" | STALE |
| python-sdk.mdx | 9 (v2.1)/(v2.3) annotations removed | STALE |
| tool-schema.mdx | "All 23 tools" → 24 | BROKEN |
| tool-schema.mdx | Missing mnemosyne_triple_end schema | BROKEN |
| tool-schema.mdx | 3 (v2.1) annotations removed | STALE |

---

## What Was NOT Done (67 pages — Pass 2 + Pass 3)

67 pages remain marked `stale_version` in the checkpoint — they were audited at v2.5.0/v2.8.0 but need re-audit at v3.4.0:

- **Pass 2 (schema expansion):** New env vars added since v3.0, new tools (graph_query, graph_link, triple_end), new SDK methods, config.yaml key expansions
- **Pass 3 (polish):** Missing MEMORIA context in architecture pages, contradictory claims between configurable-scoring and FTS5/ranking pages, stale consolidation description mentioning TinyLlama

These should be addressed in the next audit cycle.

---

## Health

- **Clean pages:** 59 (audited and verified)
- **Stale version:** 67 (need re-audit at v3.4.0)
- **Drifted mirrors:** 0 (all synced)
- **Build:** Clean — all pages compile
- **Checkpoint:** Updated at `.audit-state.json`

## Commits

- **mnemosyne-docs:** `1a4a9312` — checkpoint: 59 clean, 0 drifted, 67 stale_version, v3.4.0, all mirrors synced

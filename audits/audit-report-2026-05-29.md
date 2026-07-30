# Docs Audit Report — 2026-05-29

**Checkpoint version:** v2.8.0
**Actual codebase:** v3.1.2 (5 versions behind)
**Pages tracked:** 140 (46 clean, 90 unaudited, 4 stale-version)

---

## Critical Findings (must fix)

### 1. Dockerfile — `requirements.txt` doesn't exist

`deployment/docker.mdx` Dockerfile does `COPY requirements.txt . && pip install -r requirements.txt`. The mnemosyne repo has NO `requirements.txt` — it uses `pyproject.toml` (PEP 621). Dockerfile needs:

```
COPY . .
RUN pip install .
```

Also: CMD says `python -m mnemosyne` which isn't the correct entrypoint. Should be `python -m mnemosyne.mcp_server` (for MCP) or document both modes. Health check at port 8090 won't work — MCP SSE listens on the configured port.

### 2. Tool Schema — 11 undocumented tools, wrong names

**Name mismatch:** Doc calls tool `mnemosyne_get_stats`, code uses `mnemosyne_stats`. That tool call literally fails if agents use the docs.

**Missing tools (11):** `mnemosyne_shared_remember`, `mnemosyne_shared_recall`, `mnemosyne_shared_forget`, `mnemosyne_shared_stats`, `mnemosyne_validate`, `mnemosyne_get`, `mnemosyne_graph_query`, `mnemosyne_graph_link`, `mnemosyne_forget` (no schema block — just table mention), `mnemosyne_scratchpad_clear` (same), `mnemosyne_remove` (no schema block).

**Missing params:**
- `remember`: missing `veracity`, `metadata`, `author_id`, `author_type`, `channel_id`
- `recall`: missing `temporal_weight`, `query_time`, `temporal_halflife`
- `triple_add`: missing `valid_from`
- `sleep`: missing `all_sessions`

**Param name mismatch:** `recall` param in provider schema uses `limit` (not `top_k`)

**MCP/Hermes split claim is inaccurate** — the MCP server actually exposes triple tools too, and the Hermes provider exposes everything.

### 3. Configuration — 20+ missing env vars

**Missing from docs but used in code:**
- `MNEMOSYNE_EMBEDDING_API_URL` / `MNEMOSYNE_EMBEDDING_API_KEY` (preferred names, v3.1.1)
- `MNEMOSYNE_EMBEDDINGS_VIA_API` (opt-in to API embeddings)
- `MNEMOSYNE_LENIENT_FACT_MATCH` (replaced STRICT_FACT_MATCH, v3.1.2)
- `MNEMOSYNE_PROACTIVE_LINKING` (graph linking feature flag)
- `MNEMOSYNE_SKIP_CONTEXTS` (skip in cron/subagent contexts)
- `MNEMOSYNE_SLEEP_PROMPT` (custom consolidation prompt)
- `MNEMOSYNE_EXTRACTION_MODEL` / `MNEMOSYNE_EXTRACTION_PROMPT`
- `MNEMOSYNE_BLOB_DIR` (content-addressed blob storage)
- `MNEMOSYNE_MCP_TOKEN` (bearer auth for MCP SSE)
- `MNEMOSYNE_NO_EMBEDDINGS` (disable dense retrieval)
- `MNEMOSYNE_AUTO_MIGRATE` (disable automatic schema migrations)
- `MNEMOSYNE_SHMR_*` (4 SHMR config vars)
- `MNEMOSYNE_POLYPHONIC_RECALL` (feature flag)

**Broken env var:** `MNEMOSYNE_AUTO_SLEEP_ENABLED` in docs — ZERO `os.environ.get()` calls for it in code. Controlled via constructor arg only.

### 4. All version references — stale

Every page referencing "v2.8.0" needs to be v3.1.2. All 6 comparison pages, beam-overview.mdx, getting-started.mdx. ~20 pages total.

### 5. Docker port mismatch

Dockerfile exposes 8090, systemd uses --port 8090. But `python -m mnemosyne` has no `--host` or `--port` flags (it's the REPL/CLI). The MCP server uses `--host` and `--port` for SSE transport. Actual default port is 8080 for the MCP server.

### 6. BEAM overview — no MEMORIA section

The architecture page describes v2.8.0 BEAM tiers (Working, Episodic, Scratchpad) but completely misses MEMORIA (structured fact extraction, 5 new tables, ability-routed retrieval). Major omission for v3.x.

### 7. Python SDK — missing major features

Missing from Python SDK page:
- `memoria_retrieve()` (structured retrieval)
- `remember_batch()`
- `validate()`, `get()`, `graph_query()`, `graph_link()`
- `consolidate_to_episodic()`
- Shared surface methods
- `sleep_all_sessions()`

Also lists `get_context()` which doesn't exist on the Mnemosyne class.

### 8. Episodic Memory page — missing MEMORIA reference

No mention of `memoria_facts`, `memoria_timelines`, `memoria_kg` tables. Schema doesn't include MEMORIA columns.

### 9. Cron page — references non-existent `Memory` class

`from mnemosyne import Memory` doesn't exist. It's `Mnemosyne`. Also references `hermes mnemosyne sleep` which may not be the current CLI command.

---

## Priority: Fix now (Phase 4)

Based on severity, I'll fix in this order:

1. Tool schema page — wrong name `mnemosyne_get_stats` breaks actual tool calls
2. Dockerfile — `requirements.txt` doesn't exist, breaks deployment
3. Version bumps across critical pages
4. Configuration page — missing env vars
5. BEAM overview — add MEMORIA note
6. Python SDK — missing methods
7. Comparison pages — version bump

---

## Stats

- **Pages audited this cycle:** 14 critical + 3 comparison + codebase surface
- **Discrepancies found:** ~45 (major) + ~30 minor
- **Tools in docs:** 14 / **actual:** 23 (47 undocumented)
- **Env vars in docs:** 38 / **actual code:** ~60+ (37% undocumented)
- **Pages with wrong version:** ~12+

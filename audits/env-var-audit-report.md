# Mnemosyne Env Var Audit: Code vs. Config Page

**Date:** 2026-05-31  
**Config page:** `src/app/(docs)/getting-started/configuration/page.mdx`  
**Code locations:** `mnemosyne/` and `hermes_memory_provider/`

---

## Summary

- **Env vars documented on config page:** 62
- **Env vars in code but MISSING from config page:** 25 (including 5 non-`MNEMOSYNE_` prefixed vars used as fallback/utility)
- **Of these, `MNEMOSYNE_`-prefixed vars missing:** 17
- **Deprecated vars (in code, missing from config page):** 1 (`MNEMOSYNE_USE_CAVEMAN`)

---

## Missing Env Vars

### 1. Feature Flags / Recall Pipeline

#### `MNEMOSYNE_ENHANCED_RECALL`
- **Section:** Vector & Retrieval Weights (or new "Feature Flags" section)
- **Default:** `"0"` (disabled)
- **Code:** `mnemosyne/core/beam.py` line 5273
- **Description:** Enables the enhanced recall pipeline with MMR re-ranking, query intent classification, Weibull temporal weighting, 5-tier semantic query cache, and associative retrieval. Feature-gated for backward compatibility.

#### `MNEMOSYNE_POLYPHONIC_RECALL`
- **Section:** Vector & Retrieval Weights (or new "Feature Flags" section)
- **Default:** `"0"` (disabled)
- **Code:** `mnemosyne/core/beam.py` line 4221
- **Description:** Activates the polyphonic recall engine (E5). Runs 4 parallel voices — vector similarity / graph traversal / fact matching / temporal scoring — fused via RRF (k=60), diversity-reranked within a context budget. Each result carries `voice_scores` for per-signal provenance.

#### `MNEMOSYNE_BEAM_MODE`
- **Section:** Vector & Retrieval Weights (or "BEAM Benchmarking")
- **Default:** `""` (not set, disabled)
- **Code:** `mnemosyne/core/polyphonic_recall.py` line 225
- **Description:** Enables BEAM-mode vector scan limits (500000 candidates instead of 50000). Mirrors `MNEMOSYNE_BEAM_OPTIMIZATIONS` for polyphonic recall path which can't import beam.py's flag directly.

#### `MNEMOSYNE_PROACTIVE_LINKING`
- **Section:** Feature Flags
- **Default:** `"0"` (disabled)
- **Code:** `mnemosyne/core/beam.py` line 2624
- **Description:** When set to `1`, creates zero-LLM graph edges at memory ingestion via content similarity (FTS5) and entity overlap strategies. Adds ~5% ingestion overhead but enables graph-traversal recall without external LLM calls.

#### `MNEMOSYNE_LENIENT_FACT_MATCH`
- **Section:** Feature Flags
- **Default:** `"0"` (strict matching is default)
- **Code:** `mnemosyne/core/beam.py` line 1575
- **Description:** When set to `1`, restores the pre-v3.3 permissive fact matching path where any query word matched against any stored fact pulled in unrelated memories. Strict mode (default) requires query words to appear as contiguous substrings or individual tokens in fact text.

---

### 2. Polyphonic Recall Voice Ablation Toggles

#### `MNEMOSYNE_VOICE_VECTOR`
- **Section:** Polyphonic Recall (subsection under Vector & Retrieval Weights)
- **Default:** (not disabled — voice is active by default)
- **Code:** `mnemosyne/core/polyphonic_recall.py` line 206
- **Description:** A/B ablation toggle. Set to `0`/`false`/`no`/`off` to disable the vector similarity voice in polyphonic recall. Returns empty results so RRF fusion sees no vector contribution.

#### `MNEMOSYNE_VOICE_GRAPH`
- **Section:** Polyphonic Recall
- **Default:** (not disabled — voice is active by default)
- **Code:** `mnemosyne/core/polyphonic_recall.py` line 509
- **Description:** A/B ablation toggle. Set to `0` to disable the graph traversal voice in polyphonic recall. Two strategies: entity-based (search gists/facts by extracted entities) and graph traversal (multi-hop BFS via `find_related_memories`).

#### `MNEMOSYNE_VOICE_FACT`
- **Section:** Polyphonic Recall
- **Default:** (not disabled — voice is active by default)
- **Code:** `mnemosyne/core/polyphonic_recall.py` line 575
- **Description:** A/B ablation toggle. Set to `0` to disable the structured fact matching voice in polyphonic recall.

#### `MNEMOSYNE_VOICE_TEMPORAL`
- **Section:** Polyphonic Recall
- **Default:** (not disabled — voice is active by default)
- **Code:** `mnemosyne/core/polyphonic_recall.py` line 625
- **Description:** A/B ablation toggle. Set to `0` to disable the time-aware scoring voice in polyphonic recall. Boosts recent memories using exponential decay based on age.

---

### 3. Scoring / Bonus A/B Toggles

#### `MNEMOSYNE_GRAPH_BONUS`
- **Section:** Recall Scoring
- **Default:** (enabled by default)
- **Code:** `mnemosyne/core/beam.py` lines 4843, 4964
- **Description:** A/B toggle. Set to `0`/`false`/`no`/`off` to disable the graph edge count bonus during episodic scoring. Well-connected memories (more graph edges) receive a score boost.

#### `MNEMOSYNE_FACT_BONUS`
- **Section:** Recall Scoring
- **Default:** (enabled by default)
- **Code:** `mnemosyne/core/beam.py` lines 4854, 4973
- **Description:** A/B toggle. Set to `0` to disable the fact-matching bonus during episodic recall scoring. Checks if facts from the episodic graph match query terms via set-overlap.

#### `MNEMOSYNE_BINARY_BONUS`
- **Section:** Recall Scoring
- **Default:** (enabled by default)
- **Code:** `mnemosyne/core/beam.py` line 4873
- **Description:** A/B toggle. Set to `0` to disable the binary vector Hamming distance bonus during recall. Computes XOR + popcount for binary vector similarity.

#### `MNEMOSYNE_VERACITY_MULTIPLIER`
- **Section:** Veracity Weights (modifier on existing veracity weight feature)
- **Default:** (enabled by default — multipliers are applied)
- **Code:** `mnemosyne/core/beam.py` lines 5052, 5070, 5713
- **Description:** A/B toggle. Set to `0` to disable veracity-based score multipliers during recall entirely. When disabled, all veracity levels score equally.

#### `MNEMOSYNE_CROSS_TIER_DEDUP`
- **Section:** Recall Scoring
- **Default:** (enabled by default)
- **Code:** `mnemosyne/core/beam.py` line 5473
- **Description:** A/B toggle. Set to `0` to disable cross-tier deduplication (working memory ↔ episodic memory) in recall results. Used for ablation experiments to isolate the dedup's contribution.

---

### 4. Hermes Integration / Provider

#### `MNEMOSYNE_PREFETCH_CONTENT_CHARS`
- **Section:** Hermes Integration (or new "Provider" section)
- **Default:** `"0"` (no truncation)
- **Code:** `hermes_memory_provider/__init__.py` line 92; `integrations/hermes/src/mnemosyne_hermes/__init__.py` line 66
- **Description:** Per-memory prefetch content character limit. Set to a positive integer to cap per-memory content length during prefetch, tightening prompt budgets. `0` means no truncation.

#### `MNEMOSYNE_SKIP_CONTEXTS`
- **Section:** Hermes Integration (or Multi-Agent Identity)
- **Default:** `"cron,flush,subagent,background,skill_loop"`
- **Code:** `hermes_memory_provider/__init__.py` line 649; `integrations/hermes/src/mnemosyne_hermes/__init__.py` line 162
- **Description:** Comma-separated list of agent contexts where Mnemosyne should skip initialization. Set to empty string to enable all contexts.

#### `MNEMOSYNE_SYNC_ROLES`
- **Section:** Hermes Integration
- **Default:** `"user,assistant"` (saves both)
- **Code:** `hermes_memory_provider/__init__.py` line 641; `integrations/hermes/src/mnemosyne_hermes/__init__.py`
- **Description:** Comma-separated list of conversation roles to autosave in `sync_turn()`. Set to `"user"` for user turns only, or `""` to disable conversation autosave entirely. Identity signal capture is gated by user sync — excluding user also disables identity extraction.

---

### 5. Deprecated / Legacy

#### `MNEMOSYNE_USE_CAVEMAN`
- **Section:** Compression (deprecated)
- **Default:** `""` (not set — disabled)
- **Code:** `mnemosyne/core/plugins.py` line 358
- **Description:** **DEPRECATED.** Enables AAAK compression pre-processing for small local LLMs. Shows a deprecation warning. Use the compression plugin config instead: `mnemosyne.plugins.compression.enabled: true`.

---

### 6. Non-MNEMOSYNE_ Prefixed Vars (Fallback / Utility)

#### `OPENAI_API_KEY`
- **Section:** Embeddings (tertiary fallback)
- **Default:** `""`
- **Code:** `mnemosyne/core/embeddings.py` line 39
- **Description:** Fallback API key for remote embedding API. Consulted after `MNEMOSYNE_EMBEDDING_API_KEY` and `OPENROUTER_API_KEY` in the fallback chain.

#### `SSL_CERT_FILE`
- **Section:** Embeddings (underlying transport)
- **Default:** (none — OS default)
- **Code:** `mnemosyne/core/embeddings.py` line 157
- **Description:** Custom SSL certificate file path for embedding HTTP requests. Takes priority over `REQUESTS_CA_BUNDLE`. Used for custom CA setups.

#### `REQUESTS_CA_BUNDLE`
- **Section:** Embeddings (underlying transport)
- **Default:** (none — OS default)
- **Code:** `mnemosyne/core/embeddings.py` line 157
- **Description:** Custom CA bundle path for embedding HTTP requests. Fallback when `SSL_CERT_FILE` is not set.

#### `AUTO_SAVE_BANK`
- **Section:** OpenWebUI Integration
- **Default:** `"default"`
- **Code:** `mnemosyne/integrations/auto_save_openwebui.py` line 315
- **Description:** Named memory bank for the auto-save OpenWebUI integration.

#### `AUTO_SAVE_INTERVAL`
- **Section:** OpenWebUI Integration
- **Default:** `"300"` (seconds)
- **Code:** `mnemosyne/integrations/auto_save_openwebui.py` line 316
- **Description:** Polling interval in seconds for the auto-save OpenWebUI integration.

#### `OPENWEBUI_URL`
- **Section:** OpenWebUI Integration
- **Default:** `"http://localhost:3000"`
- **Code:** `mnemosyne/integrations/auto_save_openwebui.py` line 312
- **Description:** Base URL for the OpenWebUI instance to auto-save conversations from.

#### `OPENWEBUI_API_KEY`
- **Section:** OpenWebUI Integration
- **Default:** `""`
- **Code:** `mnemosyne/integrations/auto_save_openwebui.py` line 313
- **Description:** API key for the OpenWebUI instance.

---

## Verification

Each env var listed was confirmed via `grep` for `os.environ.get`, `_env_truthy`, or `_env_disabled` in the following source directories:
- `/root/.hermes/projects/mnemosyne/mnemosyne/core/`
- `/root/.hermes/projects/mnemosyne/mnemosyne/extraction/`
- `/root/.hermes/projects/mnemosyne/hermes_memory_provider/`
- `/root/.hermes/projects/mnemosyne/integrations/hermes/src/mnemosyne_hermes/`
- `/root/.hermes/projects/mnemosyne/mnemosyne/integrations/`

All env vars listed as "documented" on the config page were verified against the actual code and confirmed correct.

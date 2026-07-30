# Mnemosyne Env Var Audit: Code vs. Docs

**Date:** 2026-05-29  
**Source code:** `/root/mnemosyne/mnemosyne/`  
**Docs:** `/root/.hermes/projects/mnemosyne-docs/content/getting-started/configuration.mdx`  
**Code version:** 3.1.2 (mnemosyne/__init__.py)

---

## CRITICAL FINDINGS

### 1. Env var documented but MISSING from code

| Env Var | Docs Default | Status |
|---------|-------------|--------|
| `MNEMOSYNE_AUTO_SLEEP_ENABLED` | `false` | ❌ **Not found anywhere in the codebase.** No `os.environ.get("MNEMOSYNE_AUTO_SLEEP_ENABLED")` call exists. The auto-sleep feature appears to be configured only via the YAML config (`auto_sleep:` key) or the `Mnemosyne(..., auto_sleep=True)` constructor arg — not via an env var. The docs claim this env var exists but it does not. |

---

### 2. Docs-verified vars that MATCH correctly (27 of 38 documented vars)

These all have correct names, defaults, and descriptions in the docs:

#### Storage & Memory Tiers
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_DATA_DIR` | `~/.hermes/mnemosyne/data` | Same | ✅ |
| `MNEMOSYNE_WM_MAX_ITEMS` | `10000` | Same | ✅ |
| `MNEMOSYNE_WM_TTL_HOURS` | `24` | Same | ✅ |
| `MNEMOSYNE_EP_LIMIT` | `50000` | Same | ✅ |
| `MNEMOSYNE_SLEEP_BATCH` | `5000` | Same | ✅ |
| `MNEMOSYNE_SP_MAX` | `1000` | Same | ✅ |
| `MNEMOSYNE_RECENCY_HALFLIFE` | `168` | Same (1 week) | ✅ |

#### Vector & Retrieval Weights
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_VEC_TYPE` | `int8` | Same | ✅ |
| `MNEMOSYNE_VEC_WEIGHT` | `0.5` | Same | ✅ |
| `MNEMOSYNE_FTS_WEIGHT` | `0.3` | Same | ✅ |
| `MNEMOSYNE_IMPORTANCE_WEIGHT` | `0.2` | Same | ✅ |
| `MNEMOSYNE_TEMPORAL_HALFLIFE_HOURS` | `24` | Same | ✅ |
| `MNEMOSYNE_BEAM_OPTIMIZATIONS` | falsy (unset) | `false` | ✅ |

#### Tiered Degradation
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_TIER2_DAYS` | `30` | Same | ✅ |
| `MNEMOSYNE_TIER3_DAYS` | `180` | Same | ✅ |
| `MNEMOSYNE_TIER1_WEIGHT` | `1.0` | Same | ✅ |
| `MNEMOSYNE_TIER2_WEIGHT` | `0.5` | Same | ✅ |
| `MNEMOSYNE_TIER3_WEIGHT` | `0.25` | Same | ✅ |
| `MNEMOSYNE_DEGRADE_BATCH` | `100` | Same | ✅ |
| `MNEMOSYNE_TIER3_MAX_CHARS` | `300` | Same | ✅ |

#### Veracity Weights
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_STATED_WEIGHT` | `1.0` | Same | ✅ |
| `MNEMOSYNE_INFERRED_WEIGHT` | `0.7` | Same | ✅ |
| `MNEMOSYNE_TOOL_WEIGHT` | `0.5` | Same | ✅ |
| `MNEMOSYNE_IMPORTED_WEIGHT` | `0.6` | Same | ✅ |
| `MNEMOSYNE_UNKNOWN_WEIGHT` | `0.8` | Same | ✅ |

#### Host LLM Backend
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_HOST_LLM_ENABLED` | `false` | Same | ✅ |
| `MNEMOSYNE_HOST_LLM_PROVIDER` | `""` | `—` | ✅ |
| `MNEMOSYNE_HOST_LLM_MODEL` | `""` | `—` | ✅ |
| `MNEMOSYNE_HOST_LLM_N_CTX` | `32000` | Same | ✅ |

#### Multi-Agent Identity
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_AUTHOR_ID` | `None` | `—` | ✅ |
| `MNEMOSYNE_AUTHOR_TYPE` | `None` | `—` | ✅ |
| `MNEMOSYNE_CHANNEL_ID` | `None` | `—` | ✅ |

#### Logging & MCP
| Env Var | Code Default | Docs Default | Match |
|---------|-------------|-------------|-------|
| `MNEMOSYNE_LOG_TOOLS` | falsy (unset) | `false` | ✅ |
| `MNEMOSYNE_MCP_BANK` | `"default"` | Same | ✅ |

---

### 3. Minor default value format discrepancies

| Env Var | Code Default (raw) | Docs Default | Notes |
|---------|-------------------|-------------|-------|
| `MNEMOSYNE_SMART_COMPRESS` | `"1"` (string) → tested against `not in ("0", "false", "no")` | `true` | ✅ Functionally equivalent. The code treats truthy as enabled by default. |
| `MNEMOSYNE_LLM_ENABLED` | `"true"` string → checked via `.lower() in ("1", "true", "yes")` | `true` | ✅ Same behavior. |

---

### 4. Env vars in code that are NOT documented in configuration.mdx

These are env vars actively read by the codebase that have no mention in the configuration docs:

#### 🚨 Important operational vars (should be documented)
| Env Var | Code Location | Code Default | Description from code |
|---------|--------------|-------------|---------------------|
| `MNEMOSYNE_SLEEP_PROMPT` | `core/local_llm.py:55` | `""` (empty = built-in) | Custom consolidation prompt template w/ `{source}`, `{memories}`, `{memory_count}` placeholders |
| `MNEMOSYNE_FORCE_LOCAL` | `core/local_llm.py:530` | `""` (unset) | Set to `1` to skip remote LLM and force local inference |
| `MNEMOSYNE_AUTO_MIGRATE` | `core/beam.py:1969` | `"1"` | Set to `"0"` to disable automatic schema migrations |
| `MNEMOSYNE_NO_EMBEDDINGS` | `core/embeddings.py:177` | unset | Disable dense retrieval entirely |
| `MNEMOSYNE_EXTRACTION_MODEL` | `extraction/client.py:16` | `google/gemini-2.5-flash` | Model for structured memory extraction |
| `MNEMOSYNE_MCP_TOKEN` | `mcp_server.py:61,78` | `""` | Bearer token for authenticating non-loopback MCP SSE connections |

#### 🧪 Feature flags / experimental (internal)
| Env Var | Code Location | Default | Description |
|---------|--------------|---------|-------------|
| `MNEMOSYNE_PROACTIVE_LINKING` | `core/beam.py:2595` | `"0"` | Enable proactive graph linking during `remember()` |
| `MNEMOSYNE_POLYPHONIC_RECALL` | `core/beam.py:4192` | `"0"` | Enable polyphonic (multi-voice) recall engine |
| `MNEMOSYNE_ENHANCED_RECALL` | `core/beam.py:5244` | `"0"` | Enable enhanced recall with LLM reranking |
| `MNEMOSYNE_BEAM_MODE` | `core/polyphonic_recall.py:217` | `""` | Internal flag for BEAM benchmark scan limits |

#### 🔧 Embedding API config (should be documented with Embeddings section)
| Env Var | Code Location | Default | Description |
|---------|--------------|---------|-------------|
| `MNEMOSYNE_EMBEDDING_API_KEY` | `core/embeddings.py:39` | `""` (falls to `OPENROUTER_API_KEY`, then `OPENAI_API_KEY`) | API key for remote embedding API |
| `MNEMOSYNE_EMBEDDING_API_URL` | `core/embeddings.py:40` | `https://openrouter.ai/api/v1` (falls to `OPENROUTER_BASE_URL`) | Base URL for embedding API |
| `MNEMOSYNE_EMBEDDING_DIM` | `core/embeddings.py:103` | auto (384) | Override embedding dimension |
| `MNEMOSYNE_EMBEDDINGS_VIA_API` | `core/embeddings.py:65` | `""` | Explicit opt-in to route embeddings through API |

#### 🔬 SHMR tuning (should be in SHMR section)
| Env Var | Code Location | Default | Description |
|---------|--------------|---------|-------------|
| `MNEMOSYNE_SHMR_MODEL` | `core/shmr.py:32` | `""` | Model name for SHMR harmony scoring |
| `MNEMOSYNE_SHMR_MIN_CLUSTER_SIZE` | `core/shmr.py:33` | `2` | Min memories to form a cluster |
| `MNEMOSYNE_SHMR_TEMPERATURE` | `core/shmr.py:34` | `0.2` | LLM temperature for SHMR harmony analysis |

#### 🗑 Deprecated
| Env Var | Code Location | Description |
|---------|--------------|-------------|
| `MNEMOSYNE_USE_CAVEMAN` | `core/plugins.py:358` | Deprecated fallback for compression plugin. Emits deprecation warning. |

#### 🧩 Extraction (not in docs)
| Env Var | Code Location | Default | Description |
|---------|--------------|---------|-------------|
| `MNEMOSYNE_EXTRACTION_PROMPT` | `core/extraction.py:42` | embedded prompt string | Custom extraction prompt template |

#### 📁 Blob storage (not in docs)
| Env Var | Code Location | Default | Description |
|---------|--------------|---------|-------------|
| `MNEMOSYNE_BLOB_DIR` | `core/content_sanitizer.py:34` | `~/.hermes/mnemosyne/blobs` | Root directory for content-addressed blob storage |

#### 🔌 Non-MNEMOSYNE_ vars used by the codebase
| Env Var | Used In | Description |
|---------|---------|-------------|
| `HERMES_HOME` | `install.py:29`, `diagnose.py:156` | Override for Hermes home directory |
| `OPENROUTER_API_KEY` | `core/embeddings.py:39`, `extraction/client.py:20` | OpenRouter API key |
| `OPENROUTER_BASE_URL` | `core/embeddings.py:40,54,132`, `extraction/client.py:21` | OpenRouter base URL |
| `OPENAI_API_KEY` | `core/embeddings.py:39` (fallback) | OpenAI API key |
| `SSL_CERT_FILE` / `REQUESTS_CA_BUNDLE` | `core/embeddings.py:157` | Custom CA bundle for embedding API calls |

#### 🔌 Integration-specific (auto_save_openwebui.py — CLI script, not core)
| Env Var | Default | Description |
|---------|---------|-------------|
| `OPENWEBUI_URL` | `http://localhost:3000` | Auto-save target URL |
| `OPENWEBUI_API_KEY` | `""` | OpenWebUI API key |
| `AUTO_SAVE_BANK` | `openwebui` | Target memory bank |
| `AUTO_SAVE_INTERVAL` | `60` (seconds) | Poll interval |

---

## SUMMARY

| Category | Count |
|----------|-------|
| Docs vars that match code correctly | 27 |
| Docs vars MISSING from code | **1 (`MNEMOSYNE_AUTO_SLEEP_ENABLED`)** |
| Default value discrepancies | 0 (all functional matches) |
| Description discrepancies | 0 |
| Code vars NOT in docs (notable) | **20+** — including several important operational vars |
| Code vars in docs but code default format differs slightly | 2 (functionally equivalent) |

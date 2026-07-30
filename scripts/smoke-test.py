#!/usr/bin/env python3
"""Smoke test for docs.mnemosyne.site (or local build output).

Mode 1: LIVE mode — hit production URLs (default)
Mode 2: LOCAL mode — read from dist/ static files (no deploy needed)
  python3 scripts/smoke-test.py --local

Exits 0 on pass, 1 on failure.
"""
import sys
import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--local", action="store_true", help="Test local dist/ instead of live site")
args = parser.parse_args()

if args.local:
    DIST = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")
    def fetch(path):
        """Read a local dist/ file, stripping the trailing slash."""
        # /getting-started/ → getting-started.html
        clean = path.strip("/")
        fp = os.path.join(DIST, clean + ".html")
        if not os.path.exists(fp):
            return None, f"not found: {fp}"
        with open(fp) as f:
            return f.read(), None
else:
    import httpx
    BASE = "https://docs.mnemosyne.site"
    client = httpx.Client(follow_redirects=True, timeout=15)
    def fetch(path):
        url = BASE + path
        try:
            r = client.get(url)
        except Exception as e:
            return None, str(e)
        if r.status_code != 200:
            return None, f"HTTP {r.status_code}"
        return r.text, None


PAGES = [
    {"path": "/getting-started/quick-start/", "contains": ["Prerequisites"]},
    {"path": "/getting-started/configuration/", "contains": ["MNEMOSYNE_DATA_DIR", "MNEMOSYNE_MCP_TOKEN", "BAAI/bge-small-en-v1.5"]},
    {"path": "/api/tool-schema/", "contains": ["mnemosyne_remember", "mnemosyne_recall", "over MCP"]},
    {"path": "/api/mcp-server/", "contains": ["stdio", "SSE"]},
    {"path": "/api/python-sdk/", "contains": ["Mnemosyne", "remember", "recall", "top_k"]},
    {"path": "/architecture/beam-overview/", "contains": ["working", "episodic", "scratchpad"]},
    {"path": "/operations/monitoring/", "contains": ["hermes mnemosyne stats", "mnemosyne_diagnose"]},
    {"path": "/operations/performance/", "contains": ["vec_episodes", "WM_MAX_ITEMS"]},
    {"path": "/retrieval/ranking/", "contains": ["0.5", "0.3", "0.2"]},
    {"path": "/comparisons/zep/", "contains": ["over MCP"]},
]

failed = 0
for page in PAGES:
    body, err = fetch(page["path"])
    if err:
        print(f"  FAIL  {page['path']} — {err}")
        failed += 1
        continue

    missing = [text for text in page["contains"] if text not in body]
    if missing:
        print(f"  FAIL  {page['path']} — missing: {missing}")
        failed += 1
        continue

    print(f"  OK    {page['path']}")

print()
if failed:
    print(f"FAILED: {failed} of {len(PAGES)} pages")
    sys.exit(1)
else:
    print(f"ALL {len(PAGES)} pages passed")
    sys.exit(0)

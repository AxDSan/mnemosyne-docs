#!/usr/bin/env python3
"""Fail if any generated page rendered without a body.

A page that builds but renders nothing is a few KB of layout shell. Nothing
about that fails a build: the route is generated, the layout renders, the
navigation is present, and only the content is missing.

`/api` and `/getting-started` shipped blank exactly that way. Both had real
content in a `page.mdx` sitting at a route segment that also contained child
segments, which this Next version does not render. The fix is a `page.tsx`
that imports the MDX; the check below is what would have caught it.

Routes that intentionally redirect to a child are exempt. That set is derived
from the source, so adding or removing a redirect stub needs no edit here.
"""
from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
ROUTES = ROOT / "src" / "app" / "(docs)"

# A body-less page is roughly the shell size. Real pages on this site are
# comfortably above 20 KB; the shell is about 15.6 KB. 18 KB splits them
# with room to spare in both directions.
SHELL_CEILING = 18_000

# Next emits these as part of the export; they have no body by design.
ALWAYS_EXEMPT = {"404.html", "_not-found.html", "index.html"}


def redirecting_slugs() -> set[str]:
    """Slugs whose route component calls redirect(), so a blank page is correct."""
    out = set()
    if not ROUTES.is_dir():
        return out
    for page in ROUTES.rglob("page.tsx"):
        text = page.read_text(encoding="utf-8")
        if re.search(r"\bredirect\s*\(", text):
            out.add(str(page.parent.relative_to(ROUTES)))
    return out


def main() -> int:
    if not DIST.is_dir():
        print(f"ERROR: {DIST} does not exist. Run `npm run build` first.")
        return 1

    exempt = redirecting_slugs()
    if exempt:
        print(f"Exempt (redirect stubs): {', '.join(sorted(exempt))}")

    blank = []
    for html in sorted(DIST.rglob("*.html")):
        if html.name in ALWAYS_EXEMPT:
            continue
        slug = str(html.relative_to(DIST)).removesuffix(".html")
        if slug in exempt:
            continue
        size = html.stat().st_size
        if size < SHELL_CEILING:
            blank.append((slug, size))

    if blank:
        print("")
        print("FAIL: these pages rendered no body (layout shell only):")
        for slug, size in blank:
            print(f"  /{slug}  ({size:,} bytes)")
        print("")
        print("If the route is a `page.mdx` at a segment that also has child")
        print("segments, that is the cause. Replace it with a `page.tsx` that")
        print("imports the content/ file and renders it.")
        return 1

    checked = sum(1 for _ in DIST.rglob("*.html"))
    print(f"OK: {checked} pages checked, none blank.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

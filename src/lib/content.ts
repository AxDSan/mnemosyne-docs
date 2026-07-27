import { readFileSync } from "fs";
import { join } from "path";

export interface DocPage {
  slug: string[];
  title: string;
  description: string;
  section: string;
  content: string;
  readingTime: number;
  lastUpdated?: string;
}

const CONTENT_DIR = join(process.cwd(), "content");

// Full navigation order for prev/next links
export const pageOrder: string[] = [
  "getting-started/quick-start",
  "getting-started/installation",
  "getting-started/updating",
  "getting-started/configuration",
  "getting-started/first-steps",
  "architecture/beam-overview",
  "architecture/system-design",
  "architecture/data-flow",
  "architecture/sleep-consolidation",
  "architecture/aaak-compression",
  "architecture/tiered-degradation",
  "architecture/veracity-signal",
  "architecture/entity-extraction",
  "architecture/fact-extraction",
  "architecture/llm-backends",
  "architecture/pattern-detection",
  "architecture/plugin-system",
  "architecture/streaming",
  "memory-systems/working",
  "memory-systems/episodic",
  "memory-systems/semantic",
  "memory-systems/scratchpad",
  "memory-systems/temporal-graph",
  "memory-systems/memory-banks",
  "retrieval/hybrid-search",
  "retrieval/vector-search",
  "retrieval/fts5-search",
  "retrieval/configurable-scoring",
  "retrieval/ranking",
  "retrieval/temporal-recall",
  "api/overview",
  "api/python-sdk",
  "api/hermes-plugin",
  "api/rest",
  "api/mcp-server",
  "api/tool-schema",
  "integration/hermes",
  "deployment/overview",
  "deployment/fly-io",
  "deployment/docker",
  "deployment/systemd",
  "deployment/cron",
  "operations/monitoring",
  "operations/backups",
  "operations/migration",
  "operations/sync",
  "operations/performance",
  "operations/benchmarking",
  "operations/troubleshooting",
  "security/overview",
  "security/encryption",
  "security/access-control",
  "security/data-privacy",
  "use-cases/overview",
  "use-cases/multi-agent",
  "use-cases/long-running",
  "use-cases/knowledge-base",
  "comparisons/hindsight",
  "comparisons/mem0",
  "comparisons/letta",
  "comparisons/zep",
  "comparisons/cognee",
  "comparisons/honcho",
  "comparisons/supermemory",
  "migration/overview",
  "migration/from-mem0",
  "migration/from-letta",
  "migration/from-zep",
  "migration/from-cognee",
  "migration/from-hindsight",
  "migration/from-holographic",
  "migration/from-honcho",
  "migration/from-supermemory",
  "partners/overview",
  "partners/atlas-cloud",
];

const sectionMap: Record<string, string> = {
  "getting-started": "Getting Started",
  architecture: "Architecture",
  "memory-systems": "Memory Systems",
  retrieval: "Retrieval",
  api: "API",
  deployment: "Deployment",
  operations: "Operations",
  security: "Security",
  "use-cases": "Use Cases",
  "comparisons": "Comparisons",
  "migration": "Migration",
  "integration": "Integration",
  "partners": "Partners",
};

export function pageExists(path: string): boolean {
  return pageOrder.includes(path);
}

export function getAllPaths(): string[] {
  return pageOrder;
}

export function getPageBySlug(slug: string[]): DocPage | null {
  const path = slug.join("/");
  if (!pageExists(path)) return null;

  try {
    const filePath = join(CONTENT_DIR, `${path}.mdx`);
    const content = readFileSync(filePath, "utf-8");

    // Extract title from first h1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug[slug.length - 1];

    // Extract description from first paragraph after title
    const descMatch = content.match(/^#\s+.+\n\n(.+)$/m);
    const description = descMatch ? descMatch[1].slice(0, 160) : "";

    const section = sectionMap[slug[0]] || "Documentation";

    // Estimate reading time (200 wpm)
    const words = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return {
      slug,
      title,
      description,
      section,
      content,
      readingTime,
      lastUpdated: undefined, // let per-page metadata drive this
    };
  } catch {
    return null;
  }
}

export function getPageNav(
  currentPath: string
): { prev?: { title: string; href: string }; next?: { title: string; href: string } } {
  const idx = pageOrder.indexOf(currentPath);
  if (idx === -1) return {};

  const result: { prev?: { title: string; href: string }; next?: { title: string; href: string } } = {};

  if (idx > 0) {
    const prevPath = pageOrder[idx - 1];
    const prevPage = getPageBySlug(prevPath.split("/"));
    if (prevPage) {
      result.prev = { title: prevPage.title, href: `/${prevPath}` };
    }
  }

  if (idx < pageOrder.length - 1) {
    const nextPath = pageOrder[idx + 1];
    const nextPage = getPageBySlug(nextPath.split("/"));
    if (nextPage) {
      result.next = { title: nextPage.title, href: `/${nextPath}` };
    }
  }

  return result;
}

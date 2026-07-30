// ─────────────────────────────────────────────────────────────
// Centralized SEO metadata for all Mnemosyne Docs pages
// ─────────────────────────────────────────────────────────────

export type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  section: string;
  slug: string;
  priority: number;
  changeFreq: ChangeFreq;
}

export const SITE_CONFIG = {
  siteUrl: "https://docs.mnemosyne.site",
  siteName: "Mnemosyne",
  twitterHandle: "@axdsan",
  author: "Abdias Moya",
  authorUrl: "https://github.com/axdsan",
} as const;

// ─────────────────────────────────────────────────────────────
// Page Metadata — keyed by URL slug path
// ─────────────────────────────────────────────────────────────

export const PAGE_METADATA: Record<string, PageMeta> = {
  "/": {
    title: "Mnemosyne Docs — AI Agent Memory System",
    description:
      "Mnemosyne is the native memory system for AI agents. Persistent, structured, context-aware memory built on SQLite with hybrid vector + full-text search.",
    keywords: [
      "AI memory",
      "agent memory",
      "Mnemosyne",
      "persistent memory",
      "vector search",
      "AI agent framework",
    ],
    section: "home",
    slug: "/",
    priority: 1.0,
    changeFreq: "weekly",
  },

  // ── Getting Started ──────────────────────────────────────
  "/getting-started/quick-start": {
    title: "Quick Start — Get Mnemosyne Running in 5 Minutes",
    description:
      "Install Mnemosyne and perform your first memory operations in under 5 minutes. Covers pip install, configuration, and storing your first AI memories.",
    keywords: [
      "quick start",
      "install Mnemosyne",
      "first memory operation",
      "get started",
      "tutorial",
    ],
    section: "getting-started",
    slug: "/getting-started/quick-start",
    priority: 0.8,
    changeFreq: "weekly",
  },
  "/getting-started/installation": {
    title: "Installation Guide — Mnemosyne Setup & Dependencies",
    description:
      "Complete installation instructions for Mnemosyne including Python version requirements, optional dependencies, embedding providers, and troubleshooting tips.",
    keywords: [
      "installation",
      "setup",
      "dependencies",
      "pip install",
      "uv install",
      "Python",
    ],
    section: "getting-started",
    slug: "/getting-started/installation",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/getting-started/configuration": {
    title: "Configuration — Mnemosyne Settings & Environment",
    description:
      "Configure Mnemosyne with environment variables, config files, and runtime options. Covers database paths, embedding models, memory tier sizes, and more.",
    keywords: [
      "configuration",
      "settings",
      "environment variables",
      "config file",
      "embedding model",
    ],
    section: "getting-started",
    slug: "/getting-started/configuration",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/getting-started/first-steps": {
    title: "First Steps — Building with Mnemosyne Memories",
    description:
      "Learn the fundamentals of Mnemosyne after installation: storing memories, querying, understanding the BEAM tiers, and integrating with your AI agent workflow.",
    keywords: [
      "first steps",
      "tutorial",
      "store memory",
      "query memory",
      "agent workflow",
    ],
    section: "getting-started",
    slug: "/getting-started/first-steps",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Architecture ─────────────────────────────────────────
  "/architecture/beam-overview": {
    title: "BEAM Architecture — Memory Tier System Overview",
    description:
      "Overview of BEAM (Biological-inspired Episodic-Associative Memory), Mnemosyne's four-tier architecture: Working, Episodic, Semantic, and Scratchpad memory.",
    keywords: [
      "BEAM architecture",
      "memory tiers",
      "episodic memory",
      "semantic memory",
      "working memory",
      "scratchpad",
    ],
    section: "architecture",
    slug: "/architecture/beam-overview",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "/architecture/system-design": {
    title: "System Design — Mnemosyne Internal Architecture",
    description:
      "Deep dive into Mnemosyne's system design: SQLite storage engine, memory manager, retrieval pipeline, and how components interact for reliable agent memory.",
    keywords: [
      "system design",
      "architecture",
      "SQLite engine",
      "memory manager",
      "retrieval pipeline",
    ],
    section: "architecture",
    slug: "/architecture/system-design",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/architecture/data-flow": {
    title: "Data Flow — How Memories Move Through Mnemosyne",
    description:
      "Trace the lifecycle of a memory from agent input through storage, indexing, consolidation, and retrieval. Understand Mnemosyne's data flow and processing stages.",
    keywords: [
      "data flow",
      "memory lifecycle",
      "indexing",
      "consolidation",
      "retrieval pipeline",
    ],
    section: "architecture",
    slug: "/architecture/data-flow",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/architecture/sleep-consolidation": {
    title: "Sleep Consolidation — Automatic Memory Optimization",
    description:
      "Learn how Mnemosyne's sleep consolidation process restructures and optimizes memories during idle periods, mimicking human sleep-dependent memory consolidation.",
    keywords: [
      "sleep consolidation",
      "memory optimization",
      "background process",
      "memory restructuring",
      "biological memory",
    ],
    section: "architecture",
    slug: "/architecture/sleep-consolidation",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/architecture/aaak-compression": {
    title: "AAAK Compression — Advanced Memory Compaction",
    description:
      "Understand AAAK compression in Mnemosyne: how memories are summarized, deduplicated, and compressed to maintain efficient long-term storage without losing key information.",
    keywords: [
      "AAAK compression",
      "memory compression",
      "deduplication",
      "summarization",
      "storage efficiency",
    ],
    section: "architecture",
    slug: "/architecture/aaak-compression",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Memory Systems ───────────────────────────────────────
  "/memory-systems/working": {
    title: "Working Memory — Short-Term Agent Context Buffer",
    description:
      "Explore Mnemosyne's Working Memory tier: a short-term, high-speed buffer for the most recent agent observations, conversations, and tool results.",
    keywords: [
      "working memory",
      "short-term memory",
      "context buffer",
      "recent observations",
      "agent context",
    ],
    section: "memory-systems",
    slug: "/memory-systems/working",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/memory-systems/episodic": {
    title: "Episodic Memory — Time-Stamped Agent Experiences",
    description:
      "Learn about Episodic Memory in Mnemosyne: time-stamped sequences of events and experiences that let agents recall what happened, when, and in what order.",
    keywords: [
      "episodic memory",
      "time-stamped events",
      "experience recall",
      "temporal memory",
      "event sequences",
    ],
    section: "memory-systems",
    slug: "/memory-systems/episodic",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/memory-systems/semantic": {
    title: "Semantic Memory — Long-Term Knowledge & Facts Store",
    description:
      "Discover Mnemosyne's Semantic Memory: the long-term knowledge store for facts, concepts, and relationships that agents accumulate and query over time.",
    keywords: [
      "semantic memory",
      "knowledge store",
      "facts database",
      "long-term memory",
      "concept relationships",
    ],
    section: "memory-systems",
    slug: "/memory-systems/semantic",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/memory-systems/scratchpad": {
    title: "Scratchpad Memory — Temporary Agent Workspace",
    description:
      "Understand the Scratchpad tier in Mnemosyne: a temporary workspace for intermediate computations, planning steps, and transient data that agents need during tasks.",
    keywords: [
      "scratchpad",
      "temporary workspace",
      "agent planning",
      "intermediate results",
      "transient memory",
    ],
    section: "memory-systems",
    slug: "/memory-systems/scratchpad",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/memory-systems/temporal-graph": {
    title: "Temporal Graph — Time-Based Memory Relationships",
    description:
      "Explore Mnemosyne's Temporal Graph: a time-aware relationship network connecting memories with temporal edges for causal and chronological reasoning.",
    keywords: [
      "temporal graph",
      "time-based relationships",
      "causal reasoning",
      "chronological memory",
      "graph database",
    ],
    section: "memory-systems",
    slug: "/memory-systems/temporal-graph",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Retrieval ────────────────────────────────────────────
  "/retrieval/hybrid-search": {
    title: "Hybrid Search — Vector + Full-Text Retrieval Combined",
    description:
      "Learn how Mnemosyne's hybrid search combines dense vector similarity with SQLite FTS5 full-text search for retrieval that is both semantically relevant and precise.",
    keywords: [
      "hybrid search",
      "vector search",
      "full-text search",
      "FTS5",
      "semantic retrieval",
      "combined search",
    ],
    section: "retrieval",
    slug: "/retrieval/hybrid-search",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "/retrieval/vector-search": {
    title: "Vector Search — Semantic Similarity with Embeddings",
    description:
      "Deep dive into Mnemosyne's vector search: how embeddings are generated, stored, and queried for semantic similarity matching across all memory tiers.",
    keywords: [
      "vector search",
      "embeddings",
      "semantic similarity",
      "cosine similarity",
      "embedding model",
    ],
    section: "retrieval",
    slug: "/retrieval/vector-search",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/retrieval/fts5-search": {
    title: "FTS5 Search — SQLite Full-Text Search in Mnemosyne",
    description:
      "Understand Mnemosyne's FTS5 full-text search implementation: indexing strategies, query syntax, ranking algorithms, and when to prefer text search over vectors.",
    keywords: [
      "FTS5",
      "full-text search",
      "SQLite FTS",
      "text search",
      "keyword search",
      "BM25",
    ],
    section: "retrieval",
    slug: "/retrieval/fts5-search",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/retrieval/ranking": {
    title: "Ranking & Relevance — Scoring Retrieved Memories",
    description:
      "Learn how Mnemosyne scores and ranks retrieved memories using recency weighting, relevance scoring, and tier-based boosting for optimal context injection.",
    keywords: [
      "ranking",
      "relevance scoring",
      "recency weighting",
      "memory scoring",
      "result ranking",
    ],
    section: "retrieval",
    slug: "/retrieval/ranking",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── API ──────────────────────────────────────────────────
  "/api/overview": {
    title: "API Overview — Mnemosyne Integration Interfaces",
    description:
      "Overview of all Mnemosyne API interfaces: Python SDK, REST API, Hermes plugin, and tool schema. Choose the right integration method for your AI agent project.",
    keywords: [
      "API overview",
      "integration",
      "Python SDK",
      "REST API",
      "Hermes plugin",
      "tool schema",
    ],
    section: "api",
    slug: "/api/overview",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "/api/python-sdk": {
    title: "Python SDK — Mnemosyne Python API Reference",
    description:
      "Complete reference for the Mnemosyne Python SDK: Memory class, store/query/delete operations, configuration, and code examples for building AI agents with memory.",
    keywords: [
      "Python SDK",
      "API reference",
      "Python API",
      "Memory class",
      "store memory",
      "query memory",
    ],
    section: "api",
    slug: "/api/python-sdk",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/api/hermes-plugin": {
    title: "Hermes Plugin — Mnemosyne Agent Framework Integration",
    description:
      "Guide to the Mnemosyne Hermes plugin: auto-context injection, seamless memory operations, and zero-config integration with the Hermes AI agent framework.",
    keywords: [
      "Hermes plugin",
      "agent framework",
      "auto context",
      "memory injection",
      "Hermes integration",
    ],
    section: "api",
    slug: "/api/hermes-plugin",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/api/rest": {
    title: "REST API — Mnemosyne HTTP Endpoints Reference",
    description:
      "REST API reference for Mnemosyne: HTTP endpoints for memory CRUD, search, health checks, and batch operations. Includes authentication, request formats, and examples.",
    keywords: [
      "REST API",
      "HTTP endpoints",
      "API reference",
      "CRUD operations",
      "memory API",
    ],
    section: "api",
    slug: "/api/rest",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/api/tool-schema": {
    title: "Tool Schema — Mnemosyne Agent Tool Definitions",
    description:
      "Learn about Mnemosyne's tool schema: structured definitions that let AI agents call memory operations as tools, with input/output specs and usage examples.",
    keywords: [
      "tool schema",
      "agent tools",
      "function calling",
      "tool definitions",
      "memory tools",
    ],
    section: "api",
    slug: "/api/tool-schema",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Deployment ───────────────────────────────────────────
  "/deployment/overview": {
    title: "Deployment Overview — Running Mnemosyne in Production",
    description:
      "Overview of Mnemosyne deployment options: Docker, Fly.io, systemd services, and cron jobs. Choose the right deployment strategy for your AI agent infrastructure.",
    keywords: [
      "deployment",
      "production",
      "Docker",
      "Fly.io",
      "systemd",
      "hosting",
    ],
    section: "deployment",
    slug: "/deployment/overview",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "/deployment/fly-io": {
    title: "Deploy to Fly.io — Cloud Hosting Mnemosyne",
    description:
      "Step-by-step guide to deploying Mnemosyne on Fly.io: app setup, persistent volumes, configuration secrets, scaling, and health checks for cloud-native memory.",
    keywords: [
      "Fly.io",
      "cloud deployment",
      "hosting",
      "persistent volumes",
      "cloud memory",
    ],
    section: "deployment",
    slug: "/deployment/fly-io",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/deployment/docker": {
    title: "Docker Deployment — Containerized Mnemosyne",
    description:
      "Run Mnemosyne in Docker: official images, Docker Compose setup, volume mounting for persistent storage, multi-stage builds, and production best practices.",
    keywords: [
      "Docker",
      "container",
      "Docker Compose",
      "containerized deployment",
      "dockerfile",
    ],
    section: "deployment",
    slug: "/deployment/docker",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/deployment/systemd": {
    title: "Systemd Service — Linux Daemon Deployment",
    description:
      "Deploy Mnemosyne as a systemd service on Linux: unit file configuration, auto-restart, log management, and resource limits for reliable long-running agents.",
    keywords: [
      "systemd",
      "Linux service",
      "daemon",
      "auto-restart",
      "process management",
    ],
    section: "deployment",
    slug: "/deployment/systemd",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/deployment/cron": {
    title: "Cron Jobs — Scheduled Mnemosyne Tasks",
    description:
      "Configure cron jobs for Mnemosyne: scheduled memory consolidation, cleanup tasks, backup routines, and automated maintenance using crontab and systemd timers.",
    keywords: [
      "cron",
      "scheduled tasks",
      "crontab",
      "automation",
      "scheduled maintenance",
    ],
    section: "deployment",
    slug: "/deployment/cron",
    priority: 0.6,
    changeFreq: "monthly",
  },

  // ── Operations ───────────────────────────────────────────
  "/operations/monitoring": {
    title: "Monitoring — Mnemosyne Health & Metrics Dashboard",
    description:
      "Set up monitoring for Mnemosyne: health endpoints, Prometheus metrics, memory usage stats, query latency tracking, and alerting for production deployments.",
    keywords: [
      "monitoring",
      "health checks",
      "Prometheus",
      "metrics",
      "alerting",
      "observability",
    ],
    section: "operations",
    slug: "/operations/monitoring",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/operations/backups": {
    title: "Disaster Recovery — Backup, Restore & Integrity Verification",
    description:
      "Mnemosyne disaster recovery module: compressed gzip backups with checksums, automated emergency restore, integrity verification, health checks, backup rotation, and CLI cheat sheet.",
    keywords: [
      "disaster recovery",
      "backups",
      "data recovery",
      "SQLite backup",
      "emergency restore",
      "integrity check",
      "health check",
      "backup rotation",
    ],
    section: "operations",
    slug: "/operations/backups",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/getting-started/updating": {
    title: "Updating Mnemosyne — Version Upgrades & Data Migration",
    description:
      "Complete guide to updating Mnemosyne from any version. Covers schema migrations, data export/import, rollback procedures, and troubleshooting.",
    keywords: [
      "updating",
      "upgrade",
      "migration",
      "version upgrade",
      "schema migration",
      "pip install upgrade",
      "data migration",
    ],
    section: "getting-started",
    slug: "/getting-started/updating",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/operations/performance": {
    title: "Performance Tuning — Optimizing Mnemosyne Speed",
    description:
      "Optimize Mnemosyne performance: index tuning, query optimization, cache configuration, WAL mode settings, and benchmarking strategies for sub-100ms retrieval.",
    keywords: [
      "performance",
      "optimization",
      "tuning",
      "caching",
      "benchmarking",
      "query speed",
    ],
    section: "operations",
    slug: "/operations/performance",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/operations/troubleshooting": {
    title: "Troubleshooting — Fixing Common Mnemosyne Issues",
    description:
      "Solve common Mnemosyne problems: database locks, slow queries, memory leaks, embedding errors, and connection issues with step-by-step debugging guides.",
    keywords: [
      "troubleshooting",
      "debugging",
      "error resolution",
      "common issues",
      "database locks",
    ],
    section: "operations",
    slug: "/operations/troubleshooting",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Security ─────────────────────────────────────────────
  "/security/overview": {
    title: "Security Overview — Mnemosyne Protection Model",
    description:
      "Overview of Mnemosyne security: encryption at rest, access control, data privacy, and the local-first architecture that keeps your agent data safe by default.",
    keywords: [
      "security",
      "encryption",
      "access control",
      "data privacy",
      "local-first",
    ],
    section: "security",
    slug: "/security/overview",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "/security/encryption": {
    title: "Encryption — Securing Mnemosyne Data at Rest",
    description:
      "Configure encryption at rest in Mnemosyne: SQLCipher integration, key management, encryption performance impact, and best practices for sensitive agent data.",
    keywords: [
      "encryption",
      "SQLCipher",
      "encryption at rest",
      "key management",
      "data security",
    ],
    section: "security",
    slug: "/security/encryption",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/security/access-control": {
    title: "Access Control — Mnemosyne Permission Management",
    description:
      "Implement access control in Mnemosyne: role-based permissions, API key management, scope restrictions, and multi-tenant isolation for shared deployments.",
    keywords: [
      "access control",
      "permissions",
      "RBAC",
      "API keys",
      "multi-tenant",
    ],
    section: "security",
    slug: "/security/access-control",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/security/data-privacy": {
    title: "Data Privacy — GDPR & Privacy Compliance for Agents",
    description:
      "Understand Mnemosyne's privacy model: data retention policies, PII handling, right-to-deletion support, and compliance features for privacy-sensitive deployments.",
    keywords: [
      "data privacy",
      "GDPR",
      "PII",
      "data retention",
      "compliance",
      "right to deletion",
    ],
    section: "security",
    slug: "/security/data-privacy",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Use Cases ────────────────────────────────────────────
  "/use-cases/overview": {
    title: "Use Cases — Real-World Mnemosyne Applications",
    description:
      "Explore real-world use cases for Mnemosyne: multi-agent orchestration, long-running tasks, knowledge bases, and more patterns for persistent AI agent memory.",
    keywords: [
      "use cases",
      "applications",
      "multi-agent",
      "knowledge base",
      "patterns",
    ],
    section: "use-cases",
    slug: "/use-cases/overview",
    priority: 0.8,
    changeFreq: "monthly",
  },
  "/use-cases/multi-agent": {
    title: "Multi-Agent Systems — Shared Memory Orchestration",
    description:
      "Build multi-agent systems with Mnemosyne: shared memory pools, agent-specific namespaces, cross-agent communication, and coordinated task execution patterns.",
    keywords: [
      "multi-agent",
      "shared memory",
      "agent coordination",
      "namespaces",
      "agent orchestration",
    ],
    section: "use-cases",
    slug: "/use-cases/multi-agent",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/use-cases/long-running": {
    title: "Long-Running Agents — Persistent Memory Across Sessions",
    description:
      "Enable long-running AI agents with Mnemosyne: session persistence, context recovery, memory consolidation over time, and resumable multi-day agent workflows.",
    keywords: [
      "long-running agents",
      "session persistence",
      "context recovery",
      "multi-day tasks",
      "resumable workflows",
    ],
    section: "use-cases",
    slug: "/use-cases/long-running",
    priority: 0.7,
    changeFreq: "monthly",
  },
  "/use-cases/knowledge-base": {
    title: "Knowledge Base — Building an Agent Knowledge Graph",
    description:
      "Build AI-powered knowledge bases with Mnemosyne: document ingestion, semantic indexing, graph relationships, and intelligent retrieval for research and analysis.",
    keywords: [
      "knowledge base",
      "knowledge graph",
      "document ingestion",
      "semantic indexing",
      "research agent",
    ],
    section: "use-cases",
    slug: "/use-cases/knowledge-base",
    priority: 0.7,
    changeFreq: "monthly",
  },

  // ── Integration ────────────────────────────────────────────
  "/integration/hermes": {
    title: "Hermes Integration — Using Mnemosyne as Your Memory Provider",
    description:
      "Complete guide to integrating Mnemosyne with the Hermes Agent framework. Covers installation, config, memory control, profile isolation, and troubleshooting.",
    keywords: [
      "hermes integration",
      "mnemosyne provider",
      "memory setup",
      "profile isolation",
      "hermes memory",
    ],
    section: "integration",
    slug: "/integration/hermes",
    priority: 0.8,
    changeFreq: "monthly",
  },
};

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

/** Look up metadata for a page by its slug path (e.g., '/getting-started/quick-start') */
export function getPageMeta(slug: string): PageMeta | undefined {
  return PAGE_METADATA[slug];
}

/** Build the full canonical URL for a given slug */
export function getCanonicalUrl(slug: string): string {
  const clean = slug.startsWith("/") ? slug : `/${slug}`;
  return `${SITE_CONFIG.siteUrl}${clean}`;
}

/** Return all registered slug paths */
export function getAllSlugs(): string[] {
  return Object.keys(PAGE_METADATA);
}

/** Return unique section names across all pages */
export function getSections(): string[] {
  const sections = new Set<string>();
  for (const meta of Object.values(PAGE_METADATA)) {
    sections.add(meta.section);
  }
  return Array.from(sections);
}

/** Return all page metadata entries as an array */
export function getAllPages(): PageMeta[] {
  return Object.values(PAGE_METADATA);
}

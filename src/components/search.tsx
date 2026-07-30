"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  section: string;
}

const searchIndex: SearchResult[] = [
  // Getting Started
  { title: "Quick Start", href: "/getting-started/quick-start", excerpt: "Get Mnemosyne running in 5 minutes", section: "Getting Started" },
  { title: "Installation", href: "/getting-started/installation", excerpt: "pip install mnemosyne-memory or use as Hermes plugin", section: "Getting Started" },
  { title: "Configuration", href: "/getting-started/configuration", excerpt: "All environment variables, YAML config, and provider setup", section: "Getting Started" },
  { title: "First Steps", href: "/getting-started/first-steps", excerpt: "Write, read, and search memories after installation", section: "Getting Started" },
  { title: "Updating Mnemosyne", href: "/getting-started/updating", excerpt: "Upgrade guidance across 3.x releases, schema migrations, and rollback", section: "Getting Started" },
  // Architecture
  { title: "BEAM Architecture Overview", href: "/architecture/beam-overview", excerpt: "Biological-inspired Episodic-Associative Memory core architecture", section: "Architecture" },
  { title: "System Architecture", href: "/architecture/system-design", excerpt: "High-level system design and data flow", section: "Architecture" },
  { title: "Data Flow", href: "/architecture/data-flow", excerpt: "How information moves through Mnemosyne's memory tiers", section: "Architecture" },
  { title: "Sleep Consolidation", href: "/architecture/sleep-consolidation", excerpt: "Automatic promotion of Working Memory to Episodic Memory", section: "Architecture" },
  { title: "AAAK Compression", href: "/architecture/aaak-compression", excerpt: "Adaptive Associative Abstraction Kernel for text substitution", section: "Architecture" },
  { title: "Tiered Degradation", href: "/architecture/tiered-degradation", excerpt: "Three-tier memory lifecycle from hot to cold with automatic compression", section: "Architecture" },
  { title: "Veracity Signal", href: "/architecture/veracity-signal", excerpt: "Track memory trustworthiness with confidence levels and audit inferred content", section: "Architecture" },
  { title: "Entity Extraction", href: "/architecture/entity-extraction", excerpt: "Lightweight entity extraction with regex patterns and Levenshtein fuzzy matching", section: "Architecture" },
  { title: "Fact Extraction", href: "/architecture/fact-extraction", excerpt: "LLM-driven structured fact extraction with graceful fallback chain", section: "Architecture" },
  { title: "LLM Backends", href: "/architecture/llm-backends", excerpt: "Route consolidation and fact extraction through host-provided LLM backends", section: "Architecture" },
  { title: "Pattern Detection", href: "/architecture/pattern-detection", excerpt: "Detect temporal, content, and sequence patterns with dictionary-based compression", section: "Architecture" },
  { title: "Plugin System", href: "/architecture/plugin-system", excerpt: "Extensible plugin architecture with lifecycle hooks and auto-discovery", section: "Architecture" },
  { title: "Streaming & Delta Sync", href: "/architecture/streaming", excerpt: "Real-time event streaming and incremental synchronization", section: "Architecture" },
  // Memory Systems
  { title: "Working Memory", href: "/memory-systems/working", excerpt: "Short-term agent context and conversation history", section: "Memory Systems" },
  { title: "Episodic Memory", href: "/memory-systems/episodic", excerpt: "Long-term experience storage and retrieval", section: "Memory Systems" },
  { title: "Semantic Memory", href: "/memory-systems/semantic", excerpt: "Structured knowledge and facts", section: "Memory Systems" },
  { title: "Scratchpad", href: "/memory-systems/scratchpad", excerpt: "Temporary workspace for reasoning", section: "Memory Systems" },
  { title: "Temporal Knowledge Graph", href: "/memory-systems/temporal-graph", excerpt: "Graph structure for time-aware subject-predicate-object triple queries", section: "Memory Systems" },
  { title: "Memory Banks", href: "/memory-systems/memory-banks", excerpt: "Named namespace isolation with per-bank SQLite databases", section: "Memory Systems" },
  // Retrieval
  { title: "Hybrid Retrieval", href: "/retrieval/hybrid-search", excerpt: "Combining vector and full-text search", section: "Retrieval" },
  { title: "Vector Search", href: "/retrieval/vector-search", excerpt: "Dense embedding-based similarity search", section: "Retrieval" },
  { title: "FTS5 Search", href: "/retrieval/fts5-search", excerpt: "SQLite full-text search capabilities", section: "Retrieval" },
  { title: "Configurable Scoring", href: "/retrieval/configurable-scoring", excerpt: "Tune hybrid search scoring weights for vector, keyword, and importance", section: "Retrieval" },
  { title: "Ranking & Scoring", href: "/retrieval/ranking", excerpt: "How Mnemosyne ranks and scores retrieval results across search modes", section: "Retrieval" },
  { title: "Temporal Recall", href: "/retrieval/temporal-recall", excerpt: "Time-aware memory scoring with configurable exponential decay", section: "Retrieval" },
  // API
  { title: "API Overview", href: "/api/overview", excerpt: "Complete API documentation overview", section: "API" },
  { title: "Python SDK", href: "/api/python-sdk", excerpt: "Complete reference for the Mnemosyne Python API", section: "API" },
  { title: "Hermes Plugin", href: "/api/hermes-plugin", excerpt: "Integration with Hermes agent framework", section: "API" },
  { title: "REST API", href: "/api/rest", excerpt: "HTTP endpoints for memory CRUD, search, session context, and consolidation", section: "API" },
  { title: "MCP Server", href: "/api/mcp-server", excerpt: "Model Context Protocol server with 28 callable tools and dual transports", section: "API" },
  { title: "MCP Tool Schema", href: "/api/tool-schema", excerpt: "Full tool schema reference: 37 declared, 28 callable over MCP", section: "API" },
  // Deployment
  { title: "Deployment Overview", href: "/deployment/overview", excerpt: "Deploy Mnemosyne to production", section: "Deployment" },
  { title: "Fly.io Deployment", href: "/deployment/fly-io", excerpt: "Serverless deployment with persistent SQLite volumes", section: "Deployment" },
  { title: "Docker Deployment", href: "/deployment/docker", excerpt: "Containerized deployment with bind mounts for persistence", section: "Deployment" },
  { title: "Systemd Deployment", href: "/deployment/systemd", excerpt: "Run Mnemosyne as a systemd service on Linux", section: "Deployment" },
  { title: "Cron Deployment", href: "/deployment/cron", excerpt: "Run consolidation and maintenance as scheduled batch processes", section: "Deployment" },
  // Operations
  { title: "Monitoring", href: "/operations/monitoring", excerpt: "Monitoring, health checks, and observability", section: "Operations" },
  { title: "Backups", href: "/operations/backups", excerpt: "Backup and restore procedures for agent memory", section: "Operations" },
  { title: "Performance", href: "/operations/performance", excerpt: "Optimize Mnemosyne for your workload", section: "Operations" },
  { title: "Benchmarking", href: "/operations/benchmarking", excerpt: "Run the official BEAM benchmark on your hardware", section: "Operations" },
  { title: "Mnemosyne Sync", href: "/operations/sync", excerpt: "Cross-device memory synchronization with encryption", section: "Operations" },
  { title: "Troubleshooting", href: "/operations/troubleshooting", excerpt: "Common issues and their resolutions", section: "Operations" },
  // Security
  { title: "Security Overview", href: "/security/overview", excerpt: "Encryption, access control, and privacy", section: "Security" },
  { title: "Encryption", href: "/security/encryption", excerpt: "Optional client-side encryption for sync payloads", section: "Security" },
  { title: "Access Control", href: "/security/access-control", excerpt: "Memory isolation using session and scope model", section: "Security" },
  { title: "Data Privacy", href: "/security/data-privacy", excerpt: "Privacy-first design keeping data under your control", section: "Security" },
  // Use Cases
  { title: "Use Case Overview", href: "/use-cases/overview", excerpt: "Real-world patterns and case studies", section: "Use Cases" },
  { title: "Multi-Agent Systems", href: "/use-cases/multi-agent", excerpt: "Identity-aware shared memory for multi-agent systems", section: "Use Cases" },
  { title: "Long-Running Tasks", href: "/use-cases/long-running", excerpt: "Maintain context across sessions for long projects", section: "Use Cases" },
  { title: "Knowledge Base", href: "/use-cases/knowledge-base", excerpt: "Build a structured knowledge base from agent interactions", section: "Use Cases" },
  // Comparisons
  { title: "vs Hindsight", href: "/comparisons/hindsight", excerpt: "Honest technical comparison with Hindsight self-hosted", section: "Comparisons" },
  { title: "vs Mem0", href: "/comparisons/mem0", excerpt: "Honest technical comparison with Mem0 cloud platform", section: "Comparisons" },
  { title: "vs Letta", href: "/comparisons/letta", excerpt: "Honest comparison with Letta's virtual context memory model", section: "Comparisons" },
  { title: "vs Zep", href: "/comparisons/zep", excerpt: "Temporal knowledge graph comparison with Zep's context engine", section: "Comparisons" },
  { title: "vs Cognee", href: "/comparisons/cognee", excerpt: "Triple-store architecture comparison with Cognee's graph memory", section: "Comparisons" },
  { title: "vs Honcho", href: "/comparisons/honcho", excerpt: "Reasoning-based memory comparison with Honcho's Neuromancer", section: "Comparisons" },
  { title: "vs SuperMemory", href: "/comparisons/supermemory", excerpt: "Five-layer context stack comparison with SuperMemory platform", section: "Comparisons" },
  // Migration
  { title: "Cross-Provider Migration", href: "/migration/overview", excerpt: "Import memories from Mem0, Letta, Zep, and more", section: "Migration" },
  { title: "From Mem0", href: "/migration/from-mem0", excerpt: "Migrate memories from Mem0 cloud or self-hosted", section: "Migration" },
  { title: "From Letta (MemGPT)", href: "/migration/from-letta", excerpt: "Import AgentFile (.af) or API memories from Letta", section: "Migration" },
  { title: "From Zep", href: "/migration/from-zep", excerpt: "Session-by-session extraction from Zep temporal graph", section: "Migration" },
  { title: "From Cognee", href: "/migration/from-cognee", excerpt: "Convert Cognee graph nodes to episodic memories and edges to triples", section: "Migration" },
  { title: "From Hindsight", href: "/migration/from-hindsight", excerpt: "Import Hindsight memories preserving timestamps, fact types, and session IDs", section: "Migration" },
  { title: "From Holographic", href: "/migration/from-holographic", excerpt: "Import Hermes Holographic Memory facts with trust scores and entity links", section: "Migration" },
  { title: "From Honcho", href: "/migration/from-honcho", excerpt: "Import Honcho memories iterating peers, sessions, and messages", section: "Migration" },
  { title: "From SuperMemory", href: "/migration/from-supermemory", excerpt: "Import SuperMemory documents preserving container tags and metadata", section: "Migration" },
  // Integration
  { title: "Hermes Integration", href: "/integration/hermes", excerpt: "Using Mnemosyne as your Hermes Agent memory provider", section: "Integration" },
];

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = searchIndex.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.section.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      handleSelect(results[selected]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cream-dark dark:bg-charcoal-light text-warm-gray dark:text-warm-gray-muted text-sm hover:bg-border-warm dark:hover:bg-graphite transition-colors w-48 justify-between"
      >
        <span className="flex items-center gap-2">
          <SearchIcon size={14} />
          <span>Search docs...</span>
        </span>
        <kbd className="hidden sm:inline-block text-xs bg-border-warm dark:bg-graphite px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-charcoal/50 dark:bg-midnight/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl bg-warm-white dark:bg-charcoal rounded-xl shadow-2xl border border-border-warm dark:border-charcoal-light overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-warm dark:border-charcoal-light">
              <SearchIcon size={18} className="text-warm-gray-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent outline-none text-charcoal dark:text-parchment placeholder:text-warm-gray-muted"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-warm-gray-muted hover:text-warm-gray dark:hover:text-parchment"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length === 0 && query && (
                <div className="px-4 py-8 text-center text-warm-gray dark:text-warm-gray-muted">
                  No results found for &quot;{query}&quot;
                </div>
              )}
              {results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-cream dark:hover:bg-charcoal-light transition-colors ${
                    i === selected ? "bg-cream dark:bg-charcoal-light" : ""
                  }`}
                >
                  <FileText size={16} className="mt-0.5 text-warm-gray-muted shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-charcoal dark:text-parchment">
                      {result.title}
                    </div>
                    <div className="text-xs text-warm-gray dark:text-warm-gray-muted mt-0.5">
                      {result.section} — {result.excerpt}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

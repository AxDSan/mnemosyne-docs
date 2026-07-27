"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, BookOpen, Layers, Brain, Search, Code, Rocket, Shield, Briefcase, Settings, Menu, X, Scale, ArrowLeftRight, Cable, Handshake } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  badge?: string;
  items?: { title: string; href: string; badge?: string }[];
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Getting Started",
    icon: <BookOpen size={16} />,
    items: [
      { title: "Quick Start", href: "/getting-started/quick-start" },
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Updating Mnemosyne", href: "/getting-started/updating" },
      { title: "Configuration", href: "/getting-started/configuration" },
      { title: "First Steps", href: "/getting-started/first-steps" },
    ],
  },
  {
    title: "Architecture",
    icon: <Layers size={16} />,
    items: [
      { title: "BEAM Overview", href: "/architecture/beam-overview" },
      { title: "System Design", href: "/architecture/system-design" },
      { title: "Data Flow", href: "/architecture/data-flow" },
      { title: "Sleep Consolidation", href: "/architecture/sleep-consolidation" },
      { title: "AAAK Compression", href: "/architecture/aaak-compression" },
      { title: "Tiered Degradation", href: "/architecture/tiered-degradation", badge: "new" },
      { title: "Veracity Signal", href: "/architecture/veracity-signal", badge: "new" },
      { title: "Entity Extraction", href: "/architecture/entity-extraction" },
      { title: "Fact Extraction", href: "/architecture/fact-extraction" },
      { title: "LLM Backends", href: "/architecture/llm-backends" },
      { title: "Pattern Detection", href: "/architecture/pattern-detection" },
      { title: "Plugin System", href: "/architecture/plugin-system" },
      { title: "Streaming", href: "/architecture/streaming" },
    ],
  },
  {
    title: "Memory Systems",
    icon: <Brain size={16} />,
    items: [
      { title: "Working Memory", href: "/memory-systems/working" },
      { title: "Episodic Memory", href: "/memory-systems/episodic" },
      { title: "Semantic Memory", href: "/memory-systems/semantic" },
      { title: "Scratchpad", href: "/memory-systems/scratchpad" },
      { title: "Temporal Graph", href: "/memory-systems/temporal-graph" },
      { title: "Memory Banks", href: "/memory-systems/memory-banks" },
    ],
  },
  {
    title: "Retrieval",
    icon: <Search size={16} />,
    items: [
      { title: "Hybrid Search", href: "/retrieval/hybrid-search" },
      { title: "Vector Search", href: "/retrieval/vector-search" },
      { title: "FTS5 Search", href: "/retrieval/fts5-search" },
      { title: "Ranking & Scoring", href: "/retrieval/ranking" },
      { title: "Configurable Scoring", href: "/retrieval/configurable-scoring" },
      { title: "Temporal Recall", href: "/retrieval/temporal-recall" },
    ],
  },
  {
    title: "API",
    icon: <Code size={16} />,
    items: [
      { title: "API Overview", href: "/api/overview" },
      { title: "Python SDK", href: "/api/python-sdk" },
      { title: "Hermes Plugin", href: "/api/hermes-plugin" },
      { title: "REST API", href: "/api/rest" },
      { title: "Tool Schema", href: "/api/tool-schema" },
      { title: "MCP Server", href: "/api/mcp-server" },
    ],
  },
  {
    title: "Deployment",
    icon: <Rocket size={16} />,
    items: [
      { title: "Deploy Options", href: "/deployment/overview" },
      { title: "Fly.io", href: "/deployment/fly-io" },
      { title: "Docker", href: "/deployment/docker" },
      { title: "Systemd", href: "/deployment/systemd" },
      { title: "Cron Jobs", href: "/deployment/cron" },
    ],
  },
  {
    title: "Operations",
    icon: <Settings size={16} />,
    items: [
      { title: "Monitoring", href: "/operations/monitoring" },
      { title: "Disaster Recovery", href: "/operations/backups" },
      { title: "Performance", href: "/operations/performance" },
      { title: "Benchmarking", href: "/operations/benchmarking", badge: "new" },
      { title: "Mnemosyne Sync", href: "/operations/sync" },
      { title: "Troubleshooting", href: "/operations/troubleshooting" },
    ],
  },
  {
    title: "Security",
    icon: <Shield size={16} />,
    items: [
      { title: "Security Overview", href: "/security/overview" },
      { title: "Encryption", href: "/security/encryption" },
      { title: "Access Control", href: "/security/access-control" },
      { title: "Data Privacy", href: "/security/data-privacy" },
    ],
  },
  {
    title: "Use Cases",
    icon: <Briefcase size={16} />,
    items: [
      { title: "Use Case Overview", href: "/use-cases/overview" },
      { title: "Multi-Agent", href: "/use-cases/multi-agent" },
      { title: "Long-Running", href: "/use-cases/long-running" },
      { title: "Knowledge Base", href: "/use-cases/knowledge-base" },
    ],
  },
  {
    title: "Comparisons",
    icon: <Scale size={16} />,
    items: [
      { title: "vs Hindsight", href: "/comparisons/hindsight", badge: "new" },
      { title: "vs Mem0", href: "/comparisons/mem0", badge: "new" },
      { title: "vs Letta", href: "/comparisons/letta", badge: "new" },
      { title: "vs Zep", href: "/comparisons/zep", badge: "new" },
      { title: "vs Cognee", href: "/comparisons/cognee", badge: "new" },
      { title: "vs Honcho", href: "/comparisons/honcho", badge: "new" },
      { title: "vs SuperMemory", href: "/comparisons/supermemory", badge: "new" },
    ],
  },
  {
    title: "Migration",
    icon: <ArrowLeftRight size={16} />,
    items: [
      { title: "Migration Overview", href: "/migration/overview", badge: "new" },
      { title: "From Mem0", href: "/migration/from-mem0" },
      { title: "From Letta", href: "/migration/from-letta" },
      { title: "From Zep", href: "/migration/from-zep" },
      { title: "From Cognee", href: "/migration/from-cognee" },
      { title: "From Hindsight", href: "/migration/from-hindsight" },
      { title: "From Holographic", href: "/migration/from-holographic", badge: "new" },
      { title: "From Honcho", href: "/migration/from-honcho" },
      { title: "From SuperMemory", href: "/migration/from-supermemory" },
    ],
  },
  {
    title: "Integration",
    icon: <Cable size={16} />,
    items: [
      { title: "Hermes", href: "/integration/hermes", badge: "new" },
    ],
  },
  {
    title: "Partners",
    icon: <Handshake size={16} />,
    items: [
      { title: "Sponsors & Partners", href: "/partners/overview", badge: "new" },
      { title: "Atlas Cloud", href: "/partners/atlas-cloud", badge: "new" },
    ],
  },
];

function SidebarItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.items && item.items.length > 0;
  const [expanded, setExpanded] = useState(isActive || pathname.startsWith(item.href + "/"));

  return (
    <div>
      <Link
        href={item.href}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-cream-dark dark:bg-charcoal-light text-accent-terracotta dark:text-accent-terracotta-light font-medium"
            : "text-warm-gray dark:text-warm-gray-muted hover:bg-cream-dark dark:hover:bg-charcoal-light hover:text-charcoal dark:hover:text-parchment"
        } ${depth > 0 ? "ml-4" : ""}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren && (
          <ChevronRight
            size={14}
            className={`shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        )}
        <span className="truncate">{item.title}</span>
        {item.items?.some((i) => i.badge) && (
          <span className="ml-auto badge badge-new">New</span>
        )}
      </Link>
      {hasChildren && expanded && (
        <div className="mt-0.5">
          {item.items!.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ml-6 ${
                pathname === sub.href
                  ? "bg-cream-dark dark:bg-charcoal-light text-accent-terracotta dark:text-accent-terracotta-light font-medium"
                  : "text-warm-gray-light dark:text-warm-gray-muted hover:bg-cream-dark dark:hover:bg-charcoal-light hover:text-warm-gray dark:hover:text-parchment"
              }`}
            >
              <span className="truncate">{sub.title}</span>
              {sub.badge && <span className={`ml-auto badge badge-${sub.badge}`}>{sub.badge}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  return (
    <div className={`${mobile ? "" : "w-64 shrink-0"} h-full flex flex-col`}>
      {mobile && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-warm dark:border-charcoal-light shrink-0">
          <Link href="https://mnemosyne.site" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Mnemosyne" className="w-7 h-7 rounded-lg object-cover" />
          </Link>
          {onClose && (
            <button onClick={onClose} className="text-warm-gray dark:text-warm-gray-muted hover:text-charcoal dark:hover:text-parchment">
              <X size={20} />
            </button>
          )}
        </div>
      )}
      <nav className="px-3 py-4 space-y-6 overflow-y-auto flex-1 min-h-0 overscroll-contain">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 px-3 mb-2 text-xs font-semibold text-warm-gray-muted dark:text-warm-gray uppercase tracking-wider">
              {section.icon}
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-cream-dark dark:bg-charcoal-light text-warm-gray dark:text-warm-gray-muted"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>
      {open && mounted && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-warm-white dark:bg-charcoal border-r border-border-warm dark:border-charcoal-light shadow-2xl flex flex-col">
            <Sidebar mobile onClose={() => setOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

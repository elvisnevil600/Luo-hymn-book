import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Sun, Moon, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useFavorites } from "@/hooks/use-favorites";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/page-transition";
import { getHymns, type Hymn } from "@/lib/hymn-cache";

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="0" width="8" height="64" rx="4" fill="currentColor" />
      <rect x="0" y="18" width="48" height="8" rx="4" fill="currentColor" />
    </svg>
  );
}

function DotsDecor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="4" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="60" cy="4" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="104" cy="4" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="116" cy="4" r="2" fill="currentColor" opacity="0.5" />
      <line x1="22" y1="4" x2="57" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
      <line x1="63" y1="4" x2="98" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
    </svg>
  );
}

function HymnRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 animate-pulse">
      <div className="w-7 h-4 rounded-full bg-muted shrink-0" />
      <div className="h-4 rounded-full bg-muted flex-1 max-w-[58%]" />
    </div>
  );
}

export default function Home() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { theme, setTheme } = useTheme();
  const { favorites } = useFavorites();

  useEffect(() => {
    getHymns()
      .then(setHymns)
      .catch((err) => console.error("Failed to load hymns", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredHymns = hymns.filter((hymn) => {
    const q = search.toLowerCase();
    return hymn.title.toLowerCase().includes(q) || hymn.number.toString().includes(q);
  });

  return (
    <PageTransition direction="up">
      <div className="min-h-[100dvh] w-full max-w-[480px] mx-auto bg-background/0 flex flex-col transition-colors duration-300">

        {/* Hero header */}
        <header className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-amber-500 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 pt-11 pb-8 px-6 shadow-lg shadow-primary/10">
          {/* Ray of light effect */}
          <div className="absolute top-[-50%] left-[20%] w-40 h-[200%] bg-gradient-to-b from-white/30 to-transparent rotate-[25deg] blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
          
          {/* Cross watermark */}
          <CrossIcon className="absolute right-6 top-3 w-12 h-16 text-white/10 pointer-events-none" />
          <CrossIcon className="absolute left-4 bottom-2 w-8 h-11 text-white/5 pointer-events-none" />

          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-display text-[11px] tracking-[0.25em] uppercase text-amber-200/90 dark:text-amber-400/80 mb-2 font-medium">
                Luo Hymn Book
              </p>
              <h1 className="font-display text-[24px] font-bold text-white leading-tight tracking-wide drop-shadow-sm">
                Kitap Wend<br />Nyasaye
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 text-white/60 hover:text-white hover:bg-white/10 mt-0.5"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="btn-theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Decorative dots */}
          <DotsDecor className="w-32 text-amber-300/60 dark:text-amber-400/50 mb-5" />

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search hymns..."
              className="w-full pl-10 pr-9 h-11 bg-white/12 dark:bg-white/8 border border-white/15 rounded-2xl text-[15px] text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-amber-400/50 focus-visible:bg-white/16"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search"
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Count label */}
        {!loading && (
          <div className="px-5 pt-3 pb-1 text-[11px] font-display tracking-[0.12em] uppercase text-muted-foreground/60">
            {search
              ? `${filteredHymns.length} result${filteredHymns.length !== 1 ? "s" : ""}`
              : `${hymns.length} Hymns`}
          </div>
        )}

        {/* List */}
        <main className="flex-1 pb-28">
          {loading ? (
            <div className="pt-3">
              {Array.from({ length: 8 }).map((_, i) => <HymnRowSkeleton key={i} />)}
            </div>
          ) : filteredHymns.length > 0 ? (
            <ul className="pt-1">
              {filteredHymns.map((hymn, idx) => (
                <li key={hymn.number}>
                  <Link
                    href={`/hymn/${hymn.number}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-primary/5 dark:hover:bg-primary/10 active:bg-primary/10 transition-colors cursor-pointer"
                    data-testid={`link-hymn-${hymn.number}`}
                  >
                    <span className="text-primary/40 dark:text-primary/50 font-display text-[12px] tracking-wide w-7 shrink-0 text-right tabular-nums">
                      {hymn.number}
                    </span>
                    <span className="text-foreground font-serif text-[16px] flex-1 leading-snug">
                      {hymn.title}
                    </span>
                    {favorites.includes(hymn.number) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                    )}
                  </Link>
                  {idx < filteredHymns.length - 1 && (
                    <div className="ml-16 h-px bg-border/60" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
              <CrossIcon className="w-6 h-8 text-muted-foreground/20 mb-2" />
              <p className="font-display text-[13px] tracking-wide text-muted-foreground">No hymns found</p>
              <p className="text-sm text-muted-foreground/60">Try a different search term</p>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}

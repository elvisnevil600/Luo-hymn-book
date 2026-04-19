import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Heart, ArrowLeft, Search } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
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

export default function Favorites() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();

  useEffect(() => {
    getHymns()
      .then(setHymns)
      .catch((err) => console.error("Failed to load hymns", err))
      .finally(() => setLoading(false));
  }, []);

  const favoriteHymns = hymns.filter((h) => favorites.includes(h.number));

  return (
    <PageTransition direction="left">
      <div className="min-h-[100dvh] w-full max-w-[480px] mx-auto bg-transparent flex flex-col transition-colors duration-300">
        
        {/* Header */}
        <header className="relative overflow-hidden bg-gradient-to-br from-purple-800 to-indigo-900 pt-11 pb-8 px-6 shadow-lg shadow-primary/10 transition-all duration-500">
          <div className="absolute top-[-50%] left-[20%] w-40 h-[200%] bg-gradient-to-b from-white/10 to-transparent rotate-[25deg] blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between">
            <div className="z-10">
              <p className="font-display text-[11px] tracking-[0.25em] uppercase text-amber-200/90 mb-2 font-medium">
                Your Collection
              </p>
              <h1 className="font-display text-[24px] font-bold text-white leading-tight tracking-wide drop-shadow-sm">
                Favorite Hymns
              </h1>
            </div>
            <Heart className="w-8 h-8 text-amber-300/40" fill="currentColor" />
          </div>
        </header>

        <main className="flex-1 pb-28">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground animate-pulse">Loading favorites...</div>
          ) : favoriteHymns.length > 0 ? (
            <ul className="pt-4 px-2">
              {favoriteHymns.map((hymn) => (
                <li key={hymn.number} className="mb-2">
                  <Link
                    href={`/hymn/${hymn.number}`}
                    className="flex items-center gap-4 px-4 py-4 bg-background/40 backdrop-blur-sm border border-border/40 rounded-2xl hover:bg-background/60 active:bg-background/80 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-[13px] group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {hymn.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[16px] leading-snug text-foreground truncate">{hymn.title}</h3>
                    </div>
                    <Heart className="w-4 h-4 text-amber-500" fill="currentColor" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 px-10 text-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
                <Heart className="w-10 h-10 text-muted-foreground/30" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="font-display text-[14px] tracking-wide text-muted-foreground font-medium uppercase">No favorites yet</p>
                <p className="text-sm text-muted-foreground/60 leading-relaxed">Save your favorite hymns by tapping the heart icon on any hymn page.</p>
              </div>
              <Link href="/">
                <button className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-display tracking-widest uppercase shadow-md active:scale-95 transition-all">
                  Browse Hymns
                </button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}

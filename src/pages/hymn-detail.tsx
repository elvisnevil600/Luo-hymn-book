import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Heart, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";
import PageTransition from "@/components/page-transition";
import { getHymns, type Hymn } from "@/lib/hymn-cache";

function LyricsSkeleton() {
  return (
    <div className="animate-pulse space-y-8 pt-2">
      <div className="flex flex-col items-center gap-4">
        <div className="h-3 w-8 rounded-full bg-muted" />
        <div className="h-8 w-52 rounded-lg bg-muted" />
        <div className="h-0.5 w-16 rounded-full bg-muted" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 rounded-full bg-muted w-full" />
          <div className="h-4 rounded-full bg-muted w-5/6" />
          <div className="h-4 rounded-full bg-muted w-4/6" />
          <div className="h-4 rounded-full bg-muted w-5/6" />
        </div>
      ))}
    </div>
  );
}

export default function HymnDetail() {
  const { number } = useParams<{ number: string }>();
  const [hymn, setHymn] = useState<Hymn | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setVisible(false);
    getHymns()
      .then((data) => {
        const found = data.find((h) => h.number === Number(number));
        setHymn(found || null);
      })
      .catch((err) => console.error("Failed to load hymns", err))
      .finally(() => {
        setLoading(false);
        setTimeout(() => setVisible(true), 80);
      });
  }, [number]);

  const handleShare = async () => {
    if (!hymn) return;
    
    const shareData = {
      title: `Wende Nyasaye: ${hymn.title}`,
      text: `${hymn.number}. ${hymn.title}\n\n${hymn.lyrics}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        setCopied(true);
        toast.success("Lyrics copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing", err);
    }
  };

  if (!loading && !hymn) {
    return (
      <PageTransition direction="back">
        <div className="min-h-[100dvh] w-full max-w-[480px] mx-auto bg-background flex flex-col items-center justify-center p-6 text-center gap-4">
          <h2 className="font-display text-xl font-medium">Hymn not found</h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-display tracking-wide border border-border rounded-xl px-4 py-2 hover:bg-muted transition-colors"
            data-testid="btn-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Return to list
          </Link>
        </div>
      </PageTransition>
    );
  }

  const favorited = hymn ? isFavorite(hymn.number) : false;

  const formattedLyrics = hymn
    ? hymn.lyrics.split("\n\n").map((stanza, idx) => {
        const isChorus = stanza.trim().toLowerCase().startsWith("chorus:");

        if (isChorus) {
          const chorusText = stanza.replace(/chorus:\s*/i, "");
          return (
            <div
              key={idx}
              className="my-8 pl-5 border-l-2 border-amber-400/60 dark:border-amber-500/50"
            >
              <span className="block font-display text-[10px] tracking-[0.18em] uppercase text-amber-600/70 dark:text-amber-400/60 mb-2.5">
                Chorus
              </span>
              <p className="italic text-muted-foreground whitespace-pre-line text-[17px] leading-[1.8] tracking-wide">
                {chorusText}
              </p>
            </div>
          );
        }

        return (
          <div
            key={idx}
            className="my-8 whitespace-pre-line text-[18px] leading-[1.9] tracking-wide text-foreground"
          >
            {stanza}
          </div>
        );
      })
    : null;

  return (
    <PageTransition direction="forward">
      <div className="min-h-[100dvh] w-full max-w-[480px] mx-auto bg-background flex flex-col transition-colors duration-300">

        {/* Sticky header */}
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between px-3 py-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full w-10 h-10 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              data-testid="btn-back"
              aria-label="Back to hymns list"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.8} />
            </Link>

            <span className="font-display text-[12px] tracking-[0.12em] uppercase text-muted-foreground/60">
              {loading ? "" : hymn ? `Hymn ${hymn.number}` : ""}
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleShare}
                aria-label="Share hymn"
                disabled={loading || !hymn}
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full w-10 h-10 transition-all ${
                  favorited
                    ? "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => hymn && toggleFavorite(hymn.number)}
                data-testid="btn-favorite"
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                disabled={loading || !hymn}
              >
                <Heart
                  className="w-5 h-5 transition-transform active:scale-125"
                  fill={favorited ? "currentColor" : "none"}
                  strokeWidth={1.8}
                />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 pt-8 pb-16">
          {loading || !visible ? (
            <LyricsSkeleton />
          ) : (
            <div
              className="transition-opacity duration-300"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {/* Hymn number + title */}
              <div className="mb-10 text-center">
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-primary/50 dark:text-primary/60 block mb-3">
                  {hymn?.number}
                </span>
                <h1 className="font-display text-[26px] font-semibold leading-tight text-foreground px-2">
                  {hymn?.title}
                </h1>
                {/* Gold decorative rule */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-amber-400/40 dark:bg-amber-500/40 rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 dark:bg-amber-500/60" />
                  <div className="h-px w-8 bg-amber-400/40 dark:bg-amber-500/40 rounded-full" />
                </div>
              </div>

              {/* Lyrics */}
              <div className="font-serif">{formattedLyrics}</div>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}

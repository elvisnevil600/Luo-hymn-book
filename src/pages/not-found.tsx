import { Link } from "wouter";
import { ArrowLeft, Ghost } from "lucide-react";
import PageTransition from "@/components/page-transition";

export default function NotFound() {
  return (
    <PageTransition direction="up">
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center mb-8">
          <Ghost className="w-12 h-12 text-muted-foreground/30" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl font-bold mb-4 tracking-tight">404</h1>
        <p className="font-serif text-xl text-muted-foreground mb-12 max-w-xs">
          This heavenly page seems to have vanished or never existed.
        </p>
        <Link href="/">
          <button className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-display text-sm tracking-widest uppercase shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <ArrowLeft className="w-4 h-4" /> Go Home
          </button>
        </Link>
      </div>
    </PageTransition>
  );
}

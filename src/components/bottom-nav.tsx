import { Link, useLocation } from "wouter";
import { Music, Heart } from "lucide-react";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { label: "Hymns", icon: Music, path: "/" },
    { label: "Favorites", icon: Heart, path: "/favorites" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe-area shadow-2xl">
      <div className="w-full max-w-[480px] bg-background/80 backdrop-blur-xl border-t border-border/50 px-6 py-2 pb-6 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive ? "text-primary translate-y-[-2px]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`p-2 rounded-2xl transition-colors ${isActive ? "bg-primary/10 shadow-sm" : ""}`}>
                  <Icon className={`w-6 h-6 ${isActive ? "fill-primary/20" : ""}`} />
                </div>
                <span className="text-[10px] font-display font-medium tracking-widest uppercase truncate max-w-[80px]">
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-primary mt-0.5 animate-in fade-in zoom-in duration-500" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import BottomNav from "@/components/bottom-nav";
import Home from "@/pages/home";
import HymnDetail from "@/pages/hymn-detail";
import Favorites from "@/pages/favorites";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const [location] = useLocation();
  const isDetailPage = location.startsWith("/hymn/");

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/hymn/:number" component={HymnDetail} />
        <Route path="/favorites" component={Favorites} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function AppLayout() {
  const [location] = useLocation();
  console.log("Current location:", location);
  const isDetailPage = location.startsWith("/hymn/");

  return (
    <div className="relative">
      <AnimatedRoutes />
      {!isDetailPage && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="hymn-book-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL ? import.meta.env.BASE_URL.replace(/\/$/, "") : ""}>
            <AppLayout />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

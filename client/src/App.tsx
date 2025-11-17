import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Posts from "@/pages/posts";
import PostDetail from "@/pages/post-detail";
import Promotions from "@/pages/promotions";
import PromotionDetail from "@/pages/promotion-detail";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route component={Landing} />
          </>
        ) : (
          <>
            <Route path="/" component={Home} />
            <Route path="/posts" component={Posts} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route path="/promotions" component={Promotions} />
            <Route path="/promotions/:id" component={PromotionDetail} />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </>
        )}
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

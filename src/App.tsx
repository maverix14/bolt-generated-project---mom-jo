import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EntryDetail from "./pages/EntryDetail";
import NewEntry from "./pages/NewEntry";
import Favorites from "./pages/Favorites";
import Shared from "./pages/Shared";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import BabyHealth from "./pages/BabyHealth";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Insights from "./pages/Insights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/entry/:id" element={<EntryDetail />} />
          <Route path="/new" element={<NewEntry />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/baby-health" element={<BabyHealth />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

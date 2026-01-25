import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quran from "./pages/Quran";
import SurahReader from "./pages/SurahReader";
import Prayers from "./pages/Prayers";
import Duas from "./pages/Duas";
import Dhikr from "./pages/Dhikr";
import Ramadan from "./pages/Ramadan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/quran/:surahNumber" element={<SurahReader />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/duas" element={<Duas />} />
          <Route path="/dhikr" element={<Dhikr />} />
          <Route path="/ramadan" element={<Ramadan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

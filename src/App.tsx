import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Quran from "./pages/Quran";
import SurahReader from "./pages/SurahReader";
import Prayers from "./pages/Prayers";
import Duas from "./pages/Duas";
import Dhikr from "./pages/Dhikr";
import Ramadan from "./pages/Ramadan";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Zakat from "./pages/Zakat";
import Azkar from "./pages/Azkar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeleteData from "./pages/DeleteData";
import MasjidFinder from "./pages/MasjidFinder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/quran/:surahNumber" element={<SurahReader />} />
              <Route path="/prayers" element={<Prayers />} />
              <Route path="/duas" element={<Duas />} />
              <Route path="/dhikr" element={<Dhikr />} />
              <Route path="/ramadan" element={<Ramadan />} />
              <Route path="/zakat" element={<Zakat />} />
              <Route path="/azkar" element={<Azkar />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/delete-data" element={<DeleteData />} />
              <Route path="/masjid-finder" element={<MasjidFinder />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

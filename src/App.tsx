
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FacialAnalysis from "./pages/FacialAnalysis";
import EditImage from "./pages/EditImage";
import Preview from "./pages/Preview";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analysis" element={<FacialAnalysis />} />
            <Route path="/edit" element={<EditImage />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
          <ChatBot initialOpen={false} />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

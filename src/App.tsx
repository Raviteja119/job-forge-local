import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSelection from "./pages/RegisterSelection";
import WorkerDetails from "./pages/WorkerDetails";
import EmployerDetails from "./pages/EmployerDetails";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Layout from "./components/common/Layout";
import { AuthProvider } from "./hooks/useAuth";
import { LiveSupportChat } from "./components/LiveSupportChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-selection" element={<RegisterSelection />} />
              <Route path="/register" element={<Register />} />
              <Route path="/worker-details" element={<WorkerDetails />} />
              <Route path="/employer-details" element={<EmployerDetails />} />
              <Route path="/worker-dashboard" element={<WorkerDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <LiveSupportChat />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

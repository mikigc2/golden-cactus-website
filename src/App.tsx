import { Route, Routes, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LandingPage } from "./pages";
import { BlogPostPage } from "./pages/BlogPostPage";
import { BlogListPage } from "./pages/BlogListPage";
import { AIReadinessQuiz } from "./pages/AIReadinessQuiz";
import { AutomationROICalculator } from "./pages/AutomationROICalculator";
import { AutomationAuditQuiz } from "./pages/AutomationAuditQuiz";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={false}>
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/tools/ai-readiness" element={<AIReadinessQuiz />} />
          <Route path="/tools/roi-calculator" element={<AutomationROICalculator />} />
          <Route path="/tools/automation-audit" element={<AutomationAuditQuiz />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

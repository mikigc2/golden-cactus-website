import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

/* ─── Colour tokens ─── */
const C = {
  BG_DARK: "#0e0e0e",
  BG_CARD: "#181818",
  BORDER: "#282828",
  GOLD: "#C9A84C",
  GOLD_DIM: "rgba(201,168,76,0.15)",
  OFF_WHITE: "#F5F0E8",
  TEXT_SECONDARY: "#999999",
  TEXT_DIM: "#666666",
};

/* ─── Types ─── */
interface Option {
  label: string;
  score: number;
  tags?: string[];
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  multiSelect?: boolean;
  maxSelect?: number;
  freeText?: boolean;
  conditionalText?: Record<string, string>;
  conditionalOptions?: Record<string, Option[]>;
}

interface Recommendation {
  icon: string;
  title: string;
  description: string;
  stack?: string;
}

/* ─── Industry detection helper ─── */
function isEcommerce(answers: Record<string, unknown>): boolean {
  const industry = answers["industry"];
  return industry === "E-commerce / Online Retail";
}

/* ─── Questions ─── */
function getQuestions(answers: Record<string, unknown>): Question[] {
  const ecom = isEcommerce(answers);

  return [
    {
      id: "industry",
      text: "What industry is your business in?",
      options: [
        { label: "Construction / Trades", score: 0, tags: ["construction"] },
        { label: "E-commerce / Online Retail", score: 0, tags: ["ecommerce"] },
        { label: "Agency / Consultancy", score: 0, tags: ["agency"] },
        { label: "Professional Services (Legal, Finance, etc.)", score: 0, tags: ["services"] },
        { label: "Hospitality / F&B", score: 0, tags: ["hospitality"] },
        { label: "Healthcare / Wellness", score: 0, tags: ["healthcare"] },
        { label: "Real Estate", score: 0, tags: ["realestate"] },
        { label: "Other", score: 0, tags: ["other"] },
      ],
    },
    {
      id: "team_size",
      text: "How big is your team?",
      options: [
        { label: "Just me", score: 4 },
        { label: "2–5 people", score: 3 },
        { label: "6–20 people", score: 2 },
        { label: "20+ people", score: 1 },
      ],
    },
    {
      id: "time_drain",
      text: "What are your biggest time drains?",
      multiSelect: true,
      maxSelect: 5,
      options: ecom
        ? [
            { label: "Product listing & descriptions", score: 3, tags: ["content"] },
            { label: "Order fulfilment & shipping", score: 3, tags: ["operations"] },
            { label: "Customer support & returns", score: 3, tags: ["support"] },
            { label: "Marketing & ad management", score: 3, tags: ["marketing"] },
            { label: "Inventory management", score: 2, tags: ["operations"] },
            { label: "Social media & content", score: 2, tags: ["content"] },
            { label: "Bookkeeping & invoicing", score: 2, tags: ["admin"] },
            { label: "Data entry & reporting", score: 2, tags: ["admin"] },
          ]
        : [
            { label: "Lead generation & prospecting", score: 3, tags: ["leadgen"] },
            { label: "Customer follow-ups & emails", score: 3, tags: ["followup"] },
            { label: "Quoting & proposals", score: 3, tags: ["quoting"] },
            { label: "Social media & content", score: 2, tags: ["content"] },
            { label: "Scheduling & coordination", score: 2, tags: ["scheduling"] },
            { label: "Data entry & reporting", score: 2, tags: ["admin"] },
            { label: "Bookkeeping & invoicing", score: 2, tags: ["admin"] },
            { label: "Customer support", score: 2, tags: ["support"] },
          ],
    },
    {
      id: "current_sales_leads",
      text: ecom
        ? "How do you currently drive sales? (pick all that apply)"
        : "How do you currently get leads? (pick all that apply)",
      multiSelect: true,
      maxSelect: 6,
      options: ecom
        ? [
            { label: "Organic search (SEO)", score: 1 },
            { label: "Paid ads (Meta, Google)", score: 2 },
            { label: "Social media & influencers", score: 2 },
            { label: "Marketplace (Amazon, Etsy, etc.)", score: 2 },
            { label: "Word of mouth / repeat customers", score: 3 },
            { label: "Don't have a consistent system", score: 4 },
          ]
        : [
            { label: "Word of mouth / referrals", score: 3 },
            { label: "Social media", score: 2 },
            { label: "Paid ads (Meta, Google)", score: 2 },
            { label: "Cold outreach (email, phone)", score: 2 },
            { label: "Website / SEO", score: 1 },
            { label: "Don't have a system", score: 4 },
          ],
    },
    {
      id: "tools_used",
      text: "What tools do you currently use? (pick all that apply)",
      multiSelect: true,
      maxSelect: 6,
      options: [
        { label: "Excel / Google Sheets", score: 2, tags: ["spreadsheets"] },
        { label: "CRM (HubSpot, Salesforce, etc.)", score: 0, tags: ["crm"] },
        { label: "Project management (Trello, Asana, etc.)", score: 0, tags: ["pm"] },
        { label: "Accounting (Xero, QuickBooks, etc.)", score: 0, tags: ["accounting"] },
        { label: "WhatsApp / Messenger for business", score: 1, tags: ["messaging"] },
        { label: "Email marketing (Mailchimp, etc.)", score: 0, tags: ["email"] },
        { label: "Shopify / WooCommerce", score: 0, tags: ["ecom-platform"] },
        { label: "Not really using any tools", score: 3, tags: ["none"] },
      ],
    },
    {
      id: "repetitive_hours",
      text: "How many hours per week does your team spend on repetitive tasks?",
      options: [
        { label: "Less than 5 hours", score: 1 },
        { label: "5–15 hours", score: 2 },
        { label: "15–30 hours", score: 3 },
        { label: "30+ hours", score: 4 },
      ],
    },
    {
      id: "automation_level",
      text: "What's your current level of automation?",
      options: [
        { label: "We do everything manually", score: 4 },
        { label: "Some basic automations (email autoresponders, etc.)", score: 3 },
        { label: "We use AI tools occasionally", score: 2 },
        { label: "We have systems, but they could be better", score: 1 },
      ],
    },
    {
      id: "revenue_range",
      text: "What's your monthly revenue range?",
      options: [
        { label: "Under £5k", score: 1 },
        { label: "£5k – £20k", score: 2 },
        { label: "£20k – £100k", score: 3 },
        { label: "£100k+", score: 4 },
      ],
    },
    {
      id: "automate_first",
      text: "If you could automate one thing tomorrow, what would it be?",
      freeText: true,
      options: [],
    },
    {
      id: "timeline",
      text: "How soon are you looking to implement changes?",
      options: [
        { label: "ASAP — we need this yesterday", score: 4 },
        { label: "Next 1–3 months", score: 3 },
        { label: "Just exploring for now", score: 2 },
        { label: "Not sure yet", score: 1 },
      ],
    },
  ];
}

/* ─── Scoring & Recommendations engine ─── */
function calculateResults(answers: Record<string, unknown>) {
  const questions = getQuestions(answers);
  let totalScore = 0;
  let maxPossible = 0;

  for (const q of questions) {
    if (q.freeText) continue;
    const val = answers[q.id];
    if (q.multiSelect && Array.isArray(val)) {
      const selectedLabels = val as string[];
      totalScore += selectedLabels.reduce((sum, label) => {
        const opt = q.options.find((o) => o.label === label);
        return sum + (opt?.score || 0);
      }, 0);
      const sorted = [...q.options].sort((a, b) => b.score - a.score);
      maxPossible += sorted.slice(0, q.maxSelect || 2).reduce((a, b) => a + b.score, 0);
    } else if (typeof val === "number") {
      totalScore += val;
      maxPossible += Math.max(...q.options.map((o) => o.score));
    }
  }

  // Score out of 100
  const automationScore = Math.max(0, Math.min(100, Math.round((totalScore / maxPossible) * 100)));

  // Estimate savings — factor in team size + revenue
  const hoursAnswer = answers["repetitive_hours"];
  let weeklyHoursPerPerson = 10;
  if (hoursAnswer === 1) weeklyHoursPerPerson = 3;
  else if (hoursAnswer === 2) weeklyHoursPerPerson = 10;
  else if (hoursAnswer === 3) weeklyHoursPerPerson = 22;
  else if (hoursAnswer === 4) weeklyHoursPerPerson = 35;

  // Team multiplier
  const teamAnswer = answers["team_size"];
  let teamMultiplier = 1;
  if (teamAnswer === 4) teamMultiplier = 1; // Just me
  else if (teamAnswer === 3) teamMultiplier = 3; // 2-5 people
  else if (teamAnswer === 2) teamMultiplier = 10; // 6-20 people
  else if (teamAnswer === 1) teamMultiplier = 20; // 20+ people

  // Hourly rate based on revenue (higher revenue = higher value per hour)
  const revenueAnswer = answers["revenue_range"];
  let hourlyRate = 30;
  if (revenueAnswer === 1) hourlyRate = 25; // Under £5k
  else if (revenueAnswer === 2) hourlyRate = 35; // £5k-20k
  else if (revenueAnswer === 3) hourlyRate = 50; // £20k-100k
  else if (revenueAnswer === 4) hourlyRate = 75; // £100k+

  const totalWeeklyHours = weeklyHoursPerPerson * teamMultiplier;
  const savableHours = Math.round(totalWeeklyHours * 0.6);
  const annualSavings = savableHours * 52 * hourlyRate;

  // Determine recommendations based on answers
  const recommendations: Recommendation[] = [];
  const ecom = isEcommerce(answers);
  const timeDrains = answers["time_drain"];
  const drainLabels: string[] = [];

  if (Array.isArray(timeDrains)) {
    for (const label of timeDrains as string[]) {
      drainLabels.push(label.toLowerCase());
    }
  }

  const automationLevel = answers["automation_level"];
  const salesLeads = answers["current_sales_leads"];

  // Always recommend based on biggest pain points
  if (ecom) {
    if (drainLabels.some((d) => d.includes("customer support") || d.includes("returns"))) {
      recommendations.push({
        icon: "🤖",
        title: "AI Customer Support Agent",
        description: "Deploy an AI chatbot that handles 70%+ of customer queries instantly — order tracking, returns, FAQs. Cuts support workload by 60-80%.",
        stack: "AI Chatbot Stack",
      });
    }
    if (drainLabels.some((d) => d.includes("marketing") || d.includes("ad"))) {
      recommendations.push({
        icon: "📈",
        title: "Automated Marketing Engine",
        description: "AI-powered ad management, email sequences triggered by customer behaviour, and automated social media content pipeline.",
        stack: "Lead Generation Stack",
      });
    }
    if (drainLabels.some((d) => d.includes("product listing") || d.includes("content") || d.includes("social"))) {
      recommendations.push({
        icon: "✍️",
        title: "AI Content & SEO Pipeline",
        description: "Automated product descriptions, blog content for SEO, and social media posts. Get found by Google and AI search engines.",
        stack: "AI Search & Content Visibility Stack",
      });
    }
    if (drainLabels.some((d) => d.includes("order") || d.includes("shipping") || d.includes("inventory"))) {
      recommendations.push({
        icon: "📦",
        title: "Operations Automation",
        description: "Connect your store, fulfilment, and inventory into one automated flow. Reduce manual order processing by 90%.",
        stack: "Integration Stack",
      });
    }
  } else {
    if (drainLabels.some((d) => d.includes("lead") || d.includes("prospecting"))) {
      recommendations.push({
        icon: "📣",
        title: "AI Lead Generation System",
        description: "Automated prospecting, qualification, and follow-up. Finds and nurtures leads while you sleep — 3-5x more pipeline with zero extra headcount.",
        stack: "Lead Generation Stack",
      });
    }
    if (drainLabels.some((d) => d.includes("follow-up") || d.includes("email") || d.includes("support"))) {
      recommendations.push({
        icon: "🤖",
        title: "AI Customer Communication",
        description: "Automated follow-ups, AI chatbot for enquiries, and smart email sequences. Never lose a lead to slow response times again.",
        stack: "AI Chatbot Stack",
      });
    }
    if (drainLabels.some((d) => d.includes("quoting") || d.includes("proposal"))) {
      recommendations.push({
        icon: "⚡",
        title: "Automated Quoting System",
        description: "AI-powered quote generation from enquiry to proposal in minutes, not hours. Customised templates, automatic follow-ups, and conversion tracking.",
        stack: "Custom Automation",
      });
    }
    if (drainLabels.some((d) => d.includes("social") || d.includes("content"))) {
      recommendations.push({
        icon: "✍️",
        title: "AI Content & Visibility Engine",
        description: "Automated blog content, social media pipeline, and GEO optimisation so AI search engines recommend your business.",
        stack: "AI Search & Content Visibility Stack",
      });
    }
    if (drainLabels.some((d) => d.includes("scheduling") || d.includes("coordination"))) {
      recommendations.push({
        icon: "📅",
        title: "Smart Scheduling & Workflow",
        description: "Automated booking, team coordination, and task management. Eliminate scheduling back-and-forth entirely.",
        stack: "Integration Stack",
      });
    }
  }

  // Always add a data/reporting recommendation if they use spreadsheets or have admin drains
  if (drainLabels.some((d) => d.includes("data entry") || d.includes("reporting") || d.includes("bookkeeping"))) {
    recommendations.push({
      icon: "📊",
      title: "Automated Reporting & Data Flows",
      description: "Connect your tools so data flows automatically. Real-time dashboards replace manual spreadsheet work.",
      stack: "Dashboard & Integration Stack",
    });
  }

  // If still no recommendations, add defaults
  if (recommendations.length === 0) {
    if (typeof automationLevel === "number" && automationLevel >= 3) {
      recommendations.push({
        icon: "🚀",
        title: "Full Automation Foundation",
        description: "You're mostly manual right now — the biggest wins come from automating your lead/sales pipeline and customer communication first.",
        stack: "Lead Generation Stack",
      });
    }
    recommendations.push({
      icon: "🔗",
      title: "System Integration",
      description: "Connect your existing tools into one seamless workflow. Eliminate copy-paste, reduce errors, save 10+ hours/week.",
      stack: "Integration Stack",
    });
  }

  // Cap at 3 recommendations
  const topRecs = recommendations.slice(0, 3);

  // Lead temperature
  let temperature: "hot" | "warm" | "exploring" = "exploring";
  const hasNoSystem = Array.isArray(salesLeads) && (salesLeads as string[]).some((l) => l.toLowerCase().includes("don't have"));
  if (hasNoSystem && typeof automationLevel === "number" && automationLevel >= 3) {
    temperature = "hot";
  } else if (answers["timeline"] === 4 || answers["timeline"] === 3) {
    temperature = "warm";
  }

  // Level
  let level: { name: string; colour: string; emoji: string; summary: string };
  if (automationScore <= 35) {
    level = {
      name: "Well Optimised",
      colour: "#4ade80",
      emoji: "🟢",
      summary: "Your business is already fairly automated. Focus on advanced AI — predictive analytics, GEO visibility, and hyper-personalisation.",
    };
  } else if (automationScore <= 60) {
    level = {
      name: "Room to Grow",
      colour: "#facc15",
      emoji: "🟡",
      summary: `You've started automating, but there's significant potential untapped. The right systems could save your team ~${savableHours} hours/week.`,
    };
  } else {
    level = {
      name: "Massive Potential",
      colour: "#f87171",
      emoji: "🔴",
      summary: `Your business has huge automation potential. Your team is spending ~${totalWeeklyHours} hours/week on tasks AI could handle.`,
    };
  }

  return { automationScore, level, recommendations: topRecs, savableHours, annualSavings, temperature };
}

/* ─── Main Component ─── */
export function AutomationAuditQuiz() {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [freeTextValue, setFreeTextValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AI Automation Audit | Free Assessment | Golden Cactus Co.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Take our free 2-minute AI Automation Audit to discover which automations could save your business time and money.");
  }, []);

  const questions = getQuestions(answers);
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];

  const handleSingleSelect = useCallback((questionId: string, score: number, optionLabel: string) => {
    if (questionId === "industry") {
      // Store both score and label for industry
      setAnswers((prev) => ({ ...prev, [questionId]: optionLabel }));
    } else {
      setAnswers((prev) => ({ ...prev, [questionId]: score }));
    }
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep((s) => s + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  }, [currentStep, totalQuestions]);

  const handleMultiSelect = useCallback((questionId: string, label: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      const maxSelect = currentQuestion?.maxSelect || 2;
      if (current.includes(label)) {
        return { ...prev, [questionId]: current.filter((l) => l !== label) };
      }
      if (current.length >= maxSelect) return prev;
      return { ...prev, [questionId]: [...current, label] };
    });
  }, [currentQuestion]);

  const handleFreeText = useCallback(() => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: freeTextValue }));
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentQuestion, currentStep, freeTextValue, totalQuestions]);

  const goNext = useCallback(() => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, totalQuestions]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const canAdvance = (() => {
    if (!currentQuestion) return false;
    const val = answers[currentQuestion.id];
    if (currentQuestion.freeText) return !!freeTextValue.trim();
    if (currentQuestion.multiSelect) return Array.isArray(val) && (val as string[]).length > 0;
    return val !== undefined;
  })();

  const isLastQuestion = currentStep === totalQuestions - 1;

  const result = showResult ? calculateResults(answers) : null;

  return (
    <div style={{ minHeight: "100vh", background: C.BG_DARK, color: C.OFF_WHITE, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(14,14,14,0.92)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.BORDER}`, padding: "0 24px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/gc-logo.png" alt="GC" style={{ height: 32, width: 32, borderRadius: 6 }} />
            <span style={{ color: C.OFF_WHITE, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em" }}>GOLDEN CACTUS CO</span>
          </Link>
          <Link to="/" style={{ color: C.TEXT_SECONDARY, textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.GOLD)} onMouseLeave={(e) => (e.currentTarget.style.color = C.TEXT_SECONDARY)}>
            ← Home
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px 120px" }}>
        {!showResult ? (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{
                display: "inline-block", background: C.GOLD_DIM, color: C.GOLD,
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "6px 16px", borderRadius: 100, marginBottom: 20,
              }}>
                Free Audit — 2 minutes
              </span>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>
                AI Automation Audit
              </h1>
              <p style={{ color: C.TEXT_SECONDARY, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
                Answer 10 quick questions. We'll show you exactly which automations could transform your business — and how much they'd save.
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.85rem", color: C.TEXT_SECONDARY }}>
                  Question {currentStep + 1} of {totalQuestions}
                </span>
                <span style={{ fontSize: "0.85rem", color: C.TEXT_DIM }}>
                  {Math.round(((currentStep + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div style={{ height: 4, background: "#222", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${((currentStep + 1) / totalQuestions) * 100}%`,
                  background: `linear-gradient(90deg, ${C.GOLD}, #e0c068)`,
                  borderRadius: 2,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Question card */}
            {currentQuestion && (
              <div
                key={currentQuestion.id}
                style={{
                  padding: "40px 32px", background: C.BG_CARD,
                  border: `1px solid ${C.BORDER}`, borderRadius: 20,
                  animation: "fadeSlideIn 0.3s ease",
                }}
              >
                <div style={{
                  fontSize: "0.75rem", color: C.GOLD, fontWeight: 600,
                  letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase",
                }}>
                  Question {currentStep + 1}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 500, lineHeight: 1.5, marginBottom: 8 }}>
                  {currentQuestion.text}
                </h3>
                {currentQuestion.multiSelect && (
                  <p style={{ fontSize: "0.85rem", color: C.TEXT_DIM, marginBottom: 20 }}>
                    Select all that apply
                  </p>
                )}
                {!currentQuestion.multiSelect && !currentQuestion.freeText && (
                  <div style={{ height: 12 }} />
                )}

                {/* Options */}
                {!currentQuestion.freeText && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {currentQuestion.options.map((opt) => {
                      const isMulti = currentQuestion.multiSelect;
                      let selected = false;
                      if (isMulti) {
                        const arr = (answers[currentQuestion.id] as string[]) || [];
                        selected = arr.includes(opt.label);
                      } else if (currentQuestion.id === "industry") {
                        selected = answers[currentQuestion.id] === opt.label;
                      } else {
                        selected = answers[currentQuestion.id] === opt.score;
                      }

                      return (
                        <button
                          key={opt.label}
                          onClick={() => {
                            if (isMulti) {
                              handleMultiSelect(currentQuestion.id, opt.label);
                            } else {
                              handleSingleSelect(currentQuestion.id, opt.score, opt.label);
                            }
                          }}
                          style={{
                            textAlign: "left", padding: "16px 20px", borderRadius: 12,
                            border: `1px solid ${selected ? C.GOLD : C.BORDER}`,
                            background: selected ? C.GOLD_DIM : "transparent",
                            color: selected ? C.OFF_WHITE : C.TEXT_SECONDARY,
                            fontSize: "0.95rem", cursor: "pointer",
                            transition: "all 0.2s",
                            display: "flex", alignItems: "center", gap: 12,
                          }}
                          onMouseEnter={(e) => {
                            if (!selected) e.currentTarget.style.borderColor = "#444";
                          }}
                          onMouseLeave={(e) => {
                            if (!selected) e.currentTarget.style.borderColor = C.BORDER;
                          }}
                        >
                          {isMulti && (
                            <span style={{
                              width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                              border: `2px solid ${selected ? C.GOLD : "#444"}`,
                              background: selected ? C.GOLD : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              transition: "all 0.2s",
                            }}>
                              {selected && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0e0e0e" strokeWidth="2">
                                  <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                          )}
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Free text */}
                {currentQuestion.freeText && (
                  <div style={{ marginTop: 8 }}>
                    <textarea
                      value={freeTextValue}
                      onChange={(e) => setFreeTextValue(e.target.value)}
                      placeholder="e.g. I wish I could automate our quoting process — it takes 2 hours per quote..."
                      style={{
                        width: "100%", minHeight: 120, padding: "16px",
                        background: "#111", border: `1px solid ${C.BORDER}`,
                        borderRadius: 12, color: C.OFF_WHITE, fontSize: "0.95rem",
                        lineHeight: 1.6, resize: "vertical", fontFamily: "inherit",
                        outline: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = C.GOLD)}
                      onBlur={(e) => (e.target.style.borderColor = C.BORDER)}
                    />
                    <p style={{ fontSize: "0.8rem", color: C.TEXT_DIM, marginTop: 8 }}>
                      This helps us give you more specific recommendations.
                    </p>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
                  <button
                    onClick={goBack}
                    style={{
                      padding: "10px 20px", borderRadius: 100, fontSize: "0.9rem",
                      background: "transparent", border: `1px solid ${C.BORDER}`,
                      color: currentStep === 0 ? C.TEXT_DIM : C.TEXT_SECONDARY,
                      cursor: currentStep === 0 ? "not-allowed" : "pointer",
                      opacity: currentStep === 0 ? 0.4 : 1,
                      transition: "all 0.2s",
                    }}
                    disabled={currentStep === 0}
                  >
                    ← Back
                  </button>

                  {(currentQuestion.multiSelect || currentQuestion.freeText) && (
                    <button
                      onClick={() => {
                        if (currentQuestion.freeText) handleFreeText();
                        else if (isLastQuestion) { setShowResult(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
                        else goNext();
                      }}
                      disabled={!canAdvance}
                      style={{
                        padding: "12px 28px", borderRadius: 100, fontSize: "0.95rem", fontWeight: 600,
                        background: canAdvance ? C.GOLD : "#333",
                        color: canAdvance ? C.BG_DARK : C.TEXT_DIM,
                        border: "none",
                        cursor: canAdvance ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                      }}
                    >
                      {isLastQuestion ? "Get My Results →" : "Next →"}
                    </button>
                  )}

                  {!currentQuestion.multiSelect && !currentQuestion.freeText && isLastQuestion && canAdvance && (
                    <button
                      onClick={() => { setShowResult(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      style={{
                        padding: "12px 28px", borderRadius: 100, fontSize: "0.95rem", fontWeight: 600,
                        background: C.GOLD, color: C.BG_DARK, border: "none", cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      Get My Results →
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : result && (
          /* ─── Results ─── */
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{
                display: "inline-block", background: C.GOLD_DIM, color: C.GOLD,
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "6px 16px", borderRadius: 100, marginBottom: 32,
              }}>
                Your Results
              </span>

              {/* Level badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "16px 36px", borderRadius: 100,
                border: `2px solid ${result.level.colour}`,
                background: `${result.level.colour}10`,
                marginBottom: 28,
              }}>
                <span style={{ fontSize: "1.4rem", marginRight: 12 }}>{result.level.emoji}</span>
                <span style={{ fontSize: "1.3rem", fontWeight: 700, color: result.level.colour, letterSpacing: "0.02em" }}>
                  {result.level.name}
                </span>
              </div>

              <p style={{ color: C.TEXT_SECONDARY, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
                {result.level.summary}
              </p>
            </div>

            {/* Key metrics */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40,
            }}>
              <div style={{
                background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 16,
                padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: C.GOLD, lineHeight: 1 }}>
                  ~{result.savableHours}h
                </div>
                <div style={{ fontSize: "0.8rem", color: C.TEXT_DIM, marginTop: 8 }}>
                  Hours saved / week
                </div>
              </div>
              <div style={{
                background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 16,
                padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: C.GOLD, lineHeight: 1 }}>
                  {result.annualSavings >= 1000000
                    ? `£${(result.annualSavings / 1000000).toFixed(1)}M`
                    : result.annualSavings >= 1000
                    ? `£${(result.annualSavings / 1000).toFixed(0)}k`
                    : `£${result.annualSavings}`}
                </div>
                <div style={{ fontSize: "0.8rem", color: C.TEXT_DIM, marginTop: 8 }}>
                  Estimated annual savings
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div style={{
              background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 20,
              padding: "36px 32px", marginBottom: 40,
            }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 8, color: C.GOLD }}>
                Your Top Automation Opportunities
              </h3>
              <p style={{ color: C.TEXT_DIM, fontSize: "0.85rem", marginBottom: 28 }}>
                Based on your answers, here's where you'd see the biggest impact:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {result.recommendations.map((rec, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 16, alignItems: "flex-start",
                    padding: "20px", background: "#111", borderRadius: 14,
                    border: `1px solid ${i === 0 ? C.GOLD + "40" : C.BORDER}`,
                  }}>
                    <span style={{
                      fontSize: "1.5rem", flexShrink: 0,
                      width: 48, height: 48, borderRadius: 12,
                      background: C.GOLD_DIM,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {rec.icon}
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}>{rec.title}</h4>
                        {i === 0 && (
                          <span style={{
                            fontSize: "0.65rem", fontWeight: 700, color: C.GOLD,
                            background: C.GOLD_DIM, padding: "2px 8px", borderRadius: 100,
                            letterSpacing: "0.08em", textTransform: "uppercase",
                          }}>
                            Highest impact
                          </span>
                        )}
                      </div>
                      <p style={{ color: C.TEXT_SECONDARY, fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                        {rec.description}
                      </p>
                      {rec.stack && (
                        <span style={{
                          display: "inline-block", marginTop: 10,
                          fontSize: "0.75rem", color: C.TEXT_DIM,
                          border: `1px solid ${C.BORDER}`, padding: "4px 10px", borderRadius: 100,
                        }}>
                          {rec.stack}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email capture */}
            {!emailSubmitted ? (
              <div style={{
                background: `linear-gradient(135deg, ${C.GOLD}12, ${C.GOLD}06)`,
                border: `1px solid ${C.GOLD}30`,
                borderRadius: 20, padding: "36px 32px", marginBottom: 24, textAlign: "center",
              }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>
                  Get your detailed automation plan
                </h3>
                <p style={{ color: C.TEXT_SECONDARY, fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>
                  Enter your email and we'll send you a personalised report with implementation steps, estimated timelines, and ROI projections.
                </p>
                <div style={{
                  display: "flex", gap: 10, maxWidth: 460, margin: "0 auto",
                  flexWrap: "wrap", justifyContent: "center",
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: 1, minWidth: 220, padding: "14px 18px",
                      background: "#111", border: `1px solid ${C.BORDER}`,
                      borderRadius: 100, color: C.OFF_WHITE, fontSize: "0.95rem",
                      fontFamily: "inherit", outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = C.GOLD)}
                    onBlur={(e) => (e.target.style.borderColor = C.BORDER)}
                  />
                  <button
                    onClick={() => {
                      if (email.includes("@")) setEmailSubmitted(true);
                    }}
                    style={{
                      padding: "14px 28px", borderRadius: 100,
                      background: email.includes("@") ? C.GOLD : "#333",
                      color: email.includes("@") ? C.BG_DARK : C.TEXT_DIM,
                      fontSize: "0.95rem", fontWeight: 600, border: "none",
                      cursor: email.includes("@") ? "pointer" : "not-allowed",
                      transition: "all 0.2s", whiteSpace: "nowrap",
                    }}
                  >
                    Send my plan →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                background: C.BG_CARD, border: `1px solid #4ade8040`,
                borderRadius: 20, padding: "32px", marginBottom: 24, textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>✅</div>
                <p style={{ color: "#4ade80", fontWeight: 600, marginBottom: 8 }}>We'll be in touch within 24 hours</p>
                <p style={{ color: C.TEXT_DIM, fontSize: "0.9rem" }}>
                  Check your inbox for your personalised automation plan.
                </p>
              </div>
            )}

            {/* CTA */}
            <div style={{
              textAlign: "center", padding: "40px 28px",
              background: C.BG_CARD, borderRadius: 20, border: `1px solid ${C.BORDER}`,
            }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 12 }}>
                Want to discuss your results?
              </h3>
              <p style={{ color: C.TEXT_SECONDARY, fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
                Book a free 15-minute call. We'll walk through your audit results, answer questions, and map out your quickest wins.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:michael@goldencactus.co" style={{
                  padding: "14px 28px", borderRadius: 100, background: C.GOLD, color: C.BG_DARK,
                  fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
                  transition: "all 0.2s",
                }}>
                  Book a free consultation →
                </a>
                <Link to="/tools/roi-calculator" style={{
                  padding: "14px 28px", borderRadius: 100, border: `1px solid ${C.BORDER}`,
                  color: C.OFF_WHITE, fontSize: "0.95rem", fontWeight: 500, textDecoration: "none",
                }}>
                  Try the ROI Calculator
                </Link>
              </div>
            </div>

            {/* Retake */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button
                onClick={() => {
                  setAnswers({});
                  setFreeTextValue("");
                  setCurrentStep(0);
                  setShowResult(false);
                  setEmail("");
                  setEmailSubmitted(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  color: C.TEXT_DIM, background: "none", border: "none",
                  cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline",
                }}
              >
                Retake audit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.BORDER}`, padding: "40px 24px", textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>© {new Date().getFullYear()} Golden Cactus Co. All rights reserved.</span>
        </Link>
      </footer>
    </div>
  );
}

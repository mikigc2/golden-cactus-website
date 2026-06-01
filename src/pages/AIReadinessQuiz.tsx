import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

interface Question {
  id: string;
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "manual_hours",
    text: "How many hours per week does your team spend on repetitive, pattern-based tasks?",
    options: [
      { label: "Less than 5 hours", score: 1 },
      { label: "5–15 hours", score: 2 },
      { label: "15–30 hours", score: 3 },
      { label: "30+ hours", score: 4 },
    ],
  },
  {
    id: "response_time",
    text: "How quickly do you typically respond to customer enquiries?",
    options: [
      { label: "Within minutes (automated)", score: 1 },
      { label: "Within 1 hour", score: 2 },
      { label: "Within a few hours", score: 3 },
      { label: "Next business day or longer", score: 4 },
    ],
  },
  {
    id: "data_transfer",
    text: "How do you move data between your tools and systems?",
    options: [
      { label: "Fully integrated — data flows automatically", score: 1 },
      { label: "Some integrations, some manual", score: 2 },
      { label: "Mostly manual (copy-paste, spreadsheets)", score: 3 },
      { label: "No integrations — everything is manual", score: 4 },
    ],
  },
  {
    id: "scaling",
    text: "If your orders/enquiries doubled tomorrow, could your operations handle it?",
    options: [
      { label: "Yes, easily — systems scale automatically", score: 1 },
      { label: "Mostly, but we'd need a few more hands", score: 2 },
      { label: "We'd struggle significantly", score: 3 },
      { label: "No — we'd need to hire immediately", score: 4 },
    ],
  },
  {
    id: "content_marketing",
    text: "How do you handle content creation and marketing?",
    options: [
      { label: "Automated pipeline with AI + human review", score: 1 },
      { label: "Regular publishing with some AI tools", score: 2 },
      { label: "Sporadic — when we have time", score: 3 },
      { label: "We don't do content marketing", score: 4 },
    ],
  },
];

function getResult(score: number) {
  if (score <= 8) {
    return {
      level: "Already Optimised",
      emoji: "🟢",
      colour: "#4ade80",
      summary: "Your business is already well-automated. Focus on advanced optimisations — AI-powered analytics, predictive systems, and GEO visibility.",
      recommendations: [
        "Implement GEO optimisation to get cited by ChatGPT and Perplexity",
        "Add predictive analytics for demand forecasting",
        "Build AI-powered personalisation into your customer journey",
        "Consider offering your automation expertise as a service",
      ],
    };
  }
  if (score <= 13) {
    return {
      level: "Ready to Scale",
      emoji: "🟡",
      colour: "#facc15",
      summary: "You've started automating but there are significant gains still on the table. The right systems could free up 15-25 hours per week.",
      recommendations: [
        "Automate customer support with an AI chatbot (biggest quick win)",
        "Build automated lead follow-up sequences",
        "Connect your tools so data flows without manual intervention",
        "Start an AI-powered content pipeline for organic traffic",
      ],
    };
  }
  return {
    level: "High Potential",
    emoji: "🔴",
    colour: "#f87171",
    summary: "Your business has massive automation potential. You're likely spending 30+ hours/week on work that machines can handle — and losing leads to slow response times.",
    recommendations: [
      "Start with automated lead follow-up — it's the highest-ROI system you can build",
      "Deploy an AI chatbot for customer FAQs (handles 70%+ of queries instantly)",
      "Integrate your key tools (CRM, email, payments) to eliminate manual data entry",
      "Build a content pipeline to drive organic traffic and reduce ad dependency",
      "Consider a full automation audit to identify the biggest bottlenecks",
    ],
  };
}

export function AIReadinessQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AI Readiness Score | Free Assessment | Golden Cactus Co.";
  }, []);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = getResult(totalScore);
  const percentage = Math.round(((20 - totalScore) / 15) * 100);

  return (
    <div style={{ minHeight: "100vh", background: C.BG_DARK, color: C.OFF_WHITE, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(14,14,14,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.BORDER}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/gc-logo.png" alt="GC" style={{ height: 32, width: 32, borderRadius: 6 }} />
            <span style={{ color: C.OFF_WHITE, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em" }}>GOLDEN CACTUS CO</span>
          </Link>
          <Link to="/" style={{ color: C.TEXT_SECONDARY, textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.GOLD)} onMouseLeave={e => (e.currentTarget.style.color = C.TEXT_SECONDARY)}>
            ← Home
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px 120px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ display: "inline-block", background: C.GOLD_DIM, color: C.GOLD, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 100, marginBottom: 20 }}>
            Free Tool
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>
            AI Readiness Score
          </h1>
          <p style={{ color: C.TEXT_SECONDARY, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
            Answer 5 questions to find out how ready your business is for AI automation — and where to start.
          </p>
        </div>

        {!showResult ? (
          <>
            {/* Progress */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.85rem", color: C.TEXT_SECONDARY }}>{answered} of {questions.length} answered</span>
              </div>
              <div style={{ height: 4, background: "#222", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(answered / questions.length) * 100}%`, background: C.GOLD, borderRadius: 2, transition: "width 0.3s" }} />
              </div>
            </div>

            {/* Questions */}
            {questions.map((q, qi) => (
              <div key={q.id} style={{ marginBottom: 40, padding: "32px", background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 16 }}>
                <div style={{ fontSize: "0.75rem", color: C.GOLD, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>
                  Question {qi + 1}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.5, marginBottom: 20 }}>
                  {q.text}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                        style={{
                          textAlign: "left", padding: "14px 18px", borderRadius: 10,
                          border: `1px solid ${selected ? C.GOLD : C.BORDER}`,
                          background: selected ? C.GOLD_DIM : "transparent",
                          color: selected ? C.OFF_WHITE : C.TEXT_SECONDARY,
                          fontSize: "0.95rem", cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Submit */}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={() => { if (allAnswered) { setShowResult(true); window.scrollTo(0, 0); } }}
                disabled={!allAnswered}
                style={{
                  padding: "16px 40px", borderRadius: 100, fontSize: "1rem", fontWeight: 600,
                  background: allAnswered ? C.GOLD : "#333",
                  color: allAnswered ? C.BG_DARK : C.TEXT_DIM,
                  border: "none", cursor: allAnswered ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                Get My Score →
              </button>
            </div>
          </>
        ) : (
          /* Results */
          <div>
            {/* Score circle */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 160, height: 160, borderRadius: "50%",
                border: `4px solid ${result.colour}`,
                background: `${result.colour}10`,
                marginBottom: 24,
              }}>
                <div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 700, color: result.colour }}>{percentage}%</div>
                  <div style={{ fontSize: "0.75rem", color: C.TEXT_SECONDARY, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ready</div>
                </div>
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 8, color: result.colour }}>
                {result.emoji} {result.level}
              </h2>
              <p style={{ color: C.TEXT_SECONDARY, fontSize: "1rem", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
                {result.summary}
              </p>
            </div>

            {/* Recommendations */}
            <div style={{ background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 16, padding: 32, marginBottom: 40 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 20, color: C.GOLD }}>
                Recommended Next Steps
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {result.recommendations.map((rec, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 6, background: C.GOLD_DIM, color: C.GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>
                      {i + 1}
                    </span>
                    <p style={{ color: C.TEXT_SECONDARY, fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center", padding: "40px 24px", background: C.BG_CARD, borderRadius: 16, border: `1px solid ${C.BORDER}` }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 12 }}>
                Want a detailed automation plan?
              </h3>
              <p style={{ color: C.TEXT_SECONDARY, fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>
                We'll audit your operations and show you exactly what to automate, in what order, and what ROI to expect.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:michael@goldencactus.co" style={{
                  padding: "14px 28px", borderRadius: 100, background: C.GOLD, color: C.BG_DARK,
                  fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
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
              <button onClick={() => { setAnswers({}); setShowResult(false); window.scrollTo(0, 0); }}
                style={{ color: C.TEXT_DIM, background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline" }}>
                Retake quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.BORDER}`, padding: "40px 24px", textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>© {new Date().getFullYear()} Golden Cactus Co. All rights reserved.</span>
        </Link>
      </footer>
    </div>
  );
}

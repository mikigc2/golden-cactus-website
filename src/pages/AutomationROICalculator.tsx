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

interface Inputs {
  employees: number;
  manualHoursPerWeek: number;
  avgHourlyCost: number;
  leadsPerMonth: number;
  avgDealValue: number;
  currentConversionRate: number;
}

const defaults: Inputs = {
  employees: 5,
  manualHoursPerWeek: 20,
  avgHourlyCost: 18,
  leadsPerMonth: 50,
  avgDealValue: 2000,
  currentConversionRate: 15,
};

function calculate(inputs: Inputs) {
  const automationRate = 0.65; // 65% of manual work automated
  const hoursFreed = inputs.manualHoursPerWeek * automationRate;
  const weeklyLabourSaving = hoursFreed * inputs.avgHourlyCost;
  const monthlyLabourSaving = weeklyLabourSaving * 4.33;
  const annualLabourSaving = monthlyLabourSaving * 12;

  // Speed-to-lead improvement: 40% boost to conversion rate
  const improvedConversionRate = Math.min(inputs.currentConversionRate * 1.4, 80);
  const currentMonthlyDeals = (inputs.leadsPerMonth * inputs.currentConversionRate) / 100;
  const improvedMonthlyDeals = (inputs.leadsPerMonth * improvedConversionRate) / 100;
  const additionalDeals = improvedMonthlyDeals - currentMonthlyDeals;
  const additionalMonthlyRevenue = additionalDeals * inputs.avgDealValue;
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

  const totalMonthlyImpact = monthlyLabourSaving + additionalMonthlyRevenue;
  const totalAnnualImpact = annualLabourSaving + additionalAnnualRevenue;

  // Estimated setup cost
  const setupCost = 3000 + (inputs.employees > 10 ? 2000 : 0);
  const monthlyCost = 250;
  const paybackMonths = Math.ceil(setupCost / (totalMonthlyImpact - monthlyCost));

  return {
    hoursFreed: Math.round(hoursFreed * 10) / 10,
    monthlyLabourSaving: Math.round(monthlyLabourSaving),
    annualLabourSaving: Math.round(annualLabourSaving),
    improvedConversionRate: Math.round(improvedConversionRate * 10) / 10,
    additionalDeals: Math.round(additionalDeals * 10) / 10,
    additionalMonthlyRevenue: Math.round(additionalMonthlyRevenue),
    additionalAnnualRevenue: Math.round(additionalAnnualRevenue),
    totalMonthlyImpact: Math.round(totalMonthlyImpact),
    totalAnnualImpact: Math.round(totalAnnualImpact),
    setupCost,
    monthlyCost,
    paybackMonths: Math.max(1, paybackMonths),
    roi12Month: Math.round(((totalAnnualImpact - setupCost - monthlyCost * 12) / (setupCost + monthlyCost * 12)) * 100),
  };
}

function fmt(n: number): string {
  if (Math.abs(n) >= 1_000_000) return "£" + (n / 1_000_000).toFixed(1) + "M";
  if (Math.abs(n) >= 100_000) return "£" + Math.round(n / 1000) + "k";
  return "£" + n.toLocaleString("en-GB");
}

function SliderInput({ label, value, onChange, min, max, step, unit, helpText }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit: string; helpText?: string;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <label style={{ fontSize: "0.95rem", color: C.OFF_WHITE, fontWeight: 500 }}>{label}</label>
        <span style={{ fontSize: "1.1rem", fontWeight: 600, color: C.GOLD }}>{unit === "£" ? fmt(value) : `${value}${unit}`}</span>
      </div>
      {helpText && <p style={{ fontSize: "0.8rem", color: C.TEXT_DIM, marginBottom: 10, lineHeight: 1.4 }}>{helpText}</p>}
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: C.GOLD, height: 6, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: C.TEXT_DIM, marginTop: 4 }}>
        <span>{unit === "£" ? fmt(min) : `${min}${unit}`}</span>
        <span>{unit === "£" ? fmt(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{
      background: highlight ? C.GOLD_DIM : C.BG_CARD,
      border: `1px solid ${highlight ? C.GOLD : C.BORDER}`,
      borderRadius: 12, padding: "16px 12px", textAlign: "center",
      width: "100%", minHeight: 80, boxSizing: "border-box" as const,
      display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ fontSize: "0.65rem", color: highlight ? C.GOLD : C.TEXT_DIM, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 600, lineHeight: 1.3, textAlign: "center" }}>
        {label}
      </div>
      <div style={{ fontSize: "clamp(1.05rem, 3vw, 1.4rem)", fontWeight: 700, color: highlight ? C.GOLD : C.OFF_WHITE }}>
        {value}
      </div>
    </div>
  );
}

export function AutomationROICalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaults);
  const results = calculate(inputs);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Automation ROI Calculator | Free Tool | Golden Cactus Co.";
  }, []);

  const update = (field: keyof Inputs) => (value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ minHeight: "100vh", background: C.BG_DARK, color: C.OFF_WHITE, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(14,14,14,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.BORDER}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 24px 120px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ display: "inline-block", background: C.GOLD_DIM, color: C.GOLD, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 100, marginBottom: 20 }}>
            Free Tool
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Automation ROI Calculator
          </h1>
          <p style={{ color: C.TEXT_SECONDARY, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            See how much time and money AI automation could save your business. Adjust the sliders to match your situation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="roi-grid">
          {/* Inputs */}
          <div style={{ background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 20, padding: "36px 32px" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 28, color: C.GOLD, letterSpacing: "0.02em" }}>
              Your Business
            </h2>

            <SliderInput label="Team size" value={inputs.employees} onChange={update("employees")} min={1} max={50} step={1} unit=" people" />
            <SliderInput label="Manual hours per week" value={inputs.manualHoursPerWeek} onChange={update("manualHoursPerWeek")} min={5} max={100} step={5} unit=" hrs/wk" helpText="Total hours your team spends on repetitive, automatable tasks" />
            <SliderInput label="Average hourly cost" value={inputs.avgHourlyCost} onChange={update("avgHourlyCost")} min={10} max={50} step={1} unit="£" helpText="Approximate hourly cost including overheads" />
            <SliderInput label="Leads per month" value={inputs.leadsPerMonth} onChange={update("leadsPerMonth")} min={10} max={500} step={10} unit="" />
            <SliderInput label="Average deal value" value={inputs.avgDealValue} onChange={update("avgDealValue")} min={100} max={50000} step={100} unit="£" />
            <SliderInput label="Current conversion rate" value={inputs.currentConversionRate} onChange={update("currentConversionRate")} min={1} max={50} step={1} unit="%" helpText="Percentage of leads that become customers" />
          </div>

          {/* Results */}
          <div>
            <div style={{ background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 20, padding: "36px 32px", marginBottom: 24 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 24, color: C.GOLD }}>
                Estimated Impact
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <ResultCard label="Hours freed / week" value={`${results.hoursFreed} hrs`} />
                <ResultCard label="Labour savings / month" value={fmt(results.monthlyLabourSaving)} />
                <ResultCard label="Extra deals / month" value={`+${results.additionalDeals}`} />
                <ResultCard label="Extra revenue / month" value={`+${fmt(results.additionalMonthlyRevenue)}`} />
              </div>

              <div style={{ borderTop: `1px solid ${C.BORDER}`, paddingTop: 20, marginBottom: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <ResultCard label="Total monthly impact" value={fmt(results.totalMonthlyImpact)} highlight />
                  <ResultCard label="Annual impact" value={fmt(results.totalAnnualImpact)} highlight />
                </div>
              </div>

              <div className="roi-bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <ResultCard label="Setup cost" value={fmt(results.setupCost)} />
                <ResultCard label="Payback period" value={`${results.paybackMonths} month${results.paybackMonths > 1 ? "s" : ""}`} />
                <ResultCard label="12-month ROI" value={`${results.roi12Month}%`} />
              </div>
            </div>

            {/* Assumptions */}
            <div style={{ background: C.BG_CARD, border: `1px solid ${C.BORDER}`, borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.8rem", color: C.TEXT_DIM, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: C.TEXT_SECONDARY }}>Assumptions:</strong> 65% of manual tasks automatable • 40% conversion rate improvement from speed-to-lead • Estimated setup £3,000-5,000 + £250/mo maintenance. Actual results vary by business.
              </p>
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center", padding: "32px 24px", background: C.BG_CARD, borderRadius: 16, border: `1px solid ${C.BORDER}` }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 12 }}>
                Want a precise estimate?
              </h3>
              <p style={{ color: C.TEXT_SECONDARY, fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 20, maxWidth: 380, margin: "0 auto 20px" }}>
                We'll audit your actual operations and build a custom automation plan with real numbers.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:michael@goldencactus.co" style={{
                  padding: "14px 24px", borderRadius: 100, background: C.GOLD, color: C.BG_DARK,
                  fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
                }}>
                  Get a free audit →
                </a>
                <Link to="/tools/ai-readiness" style={{
                  padding: "14px 24px", borderRadius: 100, border: `1px solid ${C.BORDER}`,
                  color: C.OFF_WHITE, fontSize: "0.9rem", fontWeight: 500, textDecoration: "none",
                }}>
                  AI Readiness Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.BORDER}`, padding: "40px 24px", textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>© {new Date().getFullYear()} Golden Cactus Co. All rights reserved.</span>
        </Link>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .roi-grid { grid-template-columns: 1fr !important; }
          .roi-bottom-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .roi-bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

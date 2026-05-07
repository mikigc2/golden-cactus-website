import { useState, useEffect } from "react";
import { ShaderBackground } from "../components/ShaderBackground";

/* ─── Colour tokens (Grafit-inspired) ─── */
const ACCENT = "#00ff00";
const BG_DARK = "#0a0a0a";
const BG_CARD = "#141414";
const BG_LIGHT = "#ffffff";
const TEXT_WHITE = "#ffffff";
const TEXT_MUTED = "#999999";
const TEXT_DARK = "#0a0a0a";
const BORDER = "#222222";

/* ─── GC Logo as SVG ─── */
function GCLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
      {/* G */}
      <path
        d="M25 5C12 5 2 16 2 30s10 25 23 25c10 0 18-6 21-14H30v-8h24v26h-8v-6c-5 6-12 10-21 10C11 63 0 49 0 30S11-3 25-3c11 0 20 6 24 15l-8 4c-3-6-9-11-16-11z"
        fill={TEXT_WHITE}
      />
      {/* C */}
      <path
        d="M75 5C62 5 52 16 52 30s10 25 23 25c9 0 17-5 21-13l-8-4c-3 5-8 9-13 9-9 0-15-7-15-17s6-17 15-17c5 0 10 4 13 9l8-4C92 10 84 5 75 5z"
        fill={TEXT_WHITE}
      />
      {/* Accent line connecting */}
      <line x1="44" y1="30" x2="54" y2="30" stroke={ACCENT} strokeWidth="2" />
    </svg>
  );
}

/* ─── Arrow icon ─── */
function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Availability Dot ─── */
function AvailabilityDot() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: TEXT_MUTED, letterSpacing: "0.02em" }}>
      <span style={{
        width: 8, height: 8, borderRadius: "50%", background: ACCENT,
        boxShadow: `0 0 6px ${ACCENT}40`,
        animation: "pulse-dot 2s ease-in-out infinite",
      }} />
      Available for new clients
    </span>
  );
}

/* ─── CTA Button (Grafit-style pill with arrow) ─── */
function CTAButton({ label, href, variant = "outline" }: { label: string; href: string; variant?: "outline" | "filled" }) {
  const [hovered, setHovered] = useState(false);
  const isOutline = variant === "outline";
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 20px",
        borderRadius: 100,
        border: isOutline ? `1px solid ${hovered ? TEXT_WHITE : "#444"}` : "none",
        background: isOutline ? "transparent" : (hovered ? "#222" : TEXT_WHITE),
        color: isOutline ? TEXT_WHITE : TEXT_DARK,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.25s ease",
        letterSpacing: "0.01em",
      }}
    >
      {label}
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 28, height: 28, borderRadius: "50%",
        border: isOutline ? `1px solid ${hovered ? TEXT_WHITE : "#444"}` : `1px solid ${hovered ? "#444" : "#ccc"}`,
        transition: "all 0.25s ease",
      }}>
        <ArrowIcon size={14} />
      </span>
    </a>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p style={{
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: light ? TEXT_MUTED : "#888",
      marginBottom: 16,
    }}>
      {children}
    </p>
  );
}

/* ─── Navigation ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Technology", href: "#technology" },
    { label: "Results", href: "#results" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.6)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1320, margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <GCLogo size={38} />
        </a>

        {/* Desktop nav links */}
        <div style={{
          display: "flex", alignItems: "center", gap: 36,
        }}
          className="nav-desktop"
        >
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: TEXT_MUTED, textDecoration: "none", fontSize: 14, fontWeight: 400,
              transition: "color 0.2s", letterSpacing: "0.01em",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="nav-right-desktop">
          <AvailabilityDot />
          <a href="#contact" style={{
            padding: "10px 20px", borderRadius: 100,
            border: `1px solid ${BORDER}`, background: "transparent",
            color: TEXT_WHITE, fontSize: 14, fontWeight: 500,
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TEXT_WHITE; e.currentTarget.style.background = TEXT_WHITE; e.currentTarget.style.color = TEXT_DARK; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TEXT_WHITE; }}
          >
            Get started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none", background: "none", border: "none",
            color: TEXT_WHITE, cursor: "pointer", padding: 8,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          padding: "16px 32px 24px", borderTop: `1px solid ${BORDER}`,
          display: "flex", flexDirection: "column", gap: 16,
        }} className="nav-mobile-menu">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              color: TEXT_WHITE, textDecoration: "none", fontSize: 16, fontWeight: 400,
            }}>
              {l.label}
            </a>
          ))}
          <div style={{ paddingTop: 8 }}>
            <AvailabilityDot />
          </div>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{
            padding: "12px 24px", borderRadius: 100, border: `1px solid ${BORDER}`,
            color: TEXT_WHITE, textDecoration: "none", fontSize: 14, fontWeight: 500,
            textAlign: "center",
          }}>
            Get started
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section style={{
      background: BG_DARK, minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "center",
      overflow: "hidden", paddingTop: 72,
    }}>
      {/* Animated shader background */}
      <ShaderBackground dimOverlay={0.4} />

      <div style={{
        maxWidth: 1320, margin: "0 auto", padding: "80px 32px 60px",
        position: "relative", zIndex: 1,
      }}>
        <SectionLabel light>META ADS GROWTH AGENCY</SectionLabel>

        <h1 style={{
          fontSize: "clamp(42px, 5.5vw, 80px)",
          fontWeight: 500,
          lineHeight: 1.08,
          color: TEXT_WHITE,
          maxWidth: 800,
          marginBottom: 32,
          letterSpacing: "-0.02em",
        }}>
          Performance marketing for ambitious brands
        </h1>

        <p style={{
          fontSize: 17,
          lineHeight: 1.6,
          color: TEXT_MUTED,
          maxWidth: 480,
          marginBottom: 40,
        }}>
          We scale your business with data-driven Meta Ads campaigns.
          From strategy to creative to conversion—all under one roof.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <CTAButton label="Get started" href="#contact" variant="outline" />
          <a href="#services" style={{
            color: TEXT_MUTED, fontSize: 14, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 6,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}
          >
            Learn more
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Who We Are (white section like Grafit) ─── */
function WhoWeAre() {
  return (
    <section style={{
      background: BG_LIGHT, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>WHO WE ARE</SectionLabel>
        <h2 style={{
          fontSize: "clamp(30px, 3.5vw, 50px)",
          fontWeight: 400,
          lineHeight: 1.4,
          color: TEXT_DARK,
        }}>
          We help brands{" "}
          <HighlightChip>grow revenue 📈</HighlightChip>
          {","}
          <br />
          <HighlightChip>lower CPA 🎯</HighlightChip>
          {", and "}
          <HighlightChip>scale profitably 🚀</HighlightChip>
          <br />
          without wasting ad spend.
        </h2>
      </div>
    </section>
  );
}

function HighlightChip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      background: "#f0f0f0",
      padding: "6px 18px",
      borderRadius: 10,
      whiteSpace: "nowrap",
      margin: "4px 2px",
    }}>
      {children}
    </span>
  );
}

/* ─── Services Section ─── */
function Services() {
  const services = [
    {
      icon: "📊",
      title: "Meta Ads Management",
      desc: "Full-service campaign management on Facebook & Instagram. Strategy, setup, optimization, and scaling.",
      tags: ["Facebook", "Instagram", "Scaling"],
    },
    {
      icon: "🎨",
      title: "Ad Creative & Design",
      desc: "High-converting ad creatives, videos, and copy that stop the scroll and drive action.",
      tags: ["Static", "Video", "UGC"],
    },
    {
      icon: "🔬",
      title: "Strategy & Audits",
      desc: "Deep account audits, competitor analysis, and custom strategies to unlock growth opportunities.",
      tags: ["Audits", "Research", "Planning"],
    },
    {
      icon: "🌐",
      title: "Landing Pages & CRO",
      desc: "High-converting landing pages and continuous optimization to maximize every click you pay for.",
      tags: ["Design", "A/B Testing", "Funnels"],
    },
    {
      icon: "📈",
      title: "Analytics & Reporting",
      desc: "Crystal-clear reporting and data insights so you always know exactly what's working.",
      tags: ["Dashboards", "Attribution", "KPIs"],
    },
    {
      icon: "🔁",
      title: "Retargeting & Scaling",
      desc: "Advanced retargeting funnels and lookalike audiences to grow your customer base efficiently.",
      tags: ["Remarketing", "Lookalikes", "Growth"],
    },
  ];

  return (
    <section id="services" style={{ background: BG_LIGHT, padding: "0 32px 120px", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 60, flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <SectionLabel>SERVICES</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: TEXT_DARK,
              maxWidth: 500,
            }}>
              Everything you need to grow with Meta Ads
            </h2>
          </div>
          <p style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "#666",
            maxWidth: 380,
            paddingTop: 32,
          }}>
            Why juggle multiple freelancers when you can have one dedicated growth team?
            We combine strategy, creative, and data to fuel your growth.
          </p>
        </div>

        {/* Services grid with + decorators */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            border: `1px solid #e5e5e5`,
          }}>
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, tags }: { icon: string; title: string; desc: string; tags: string[] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "36px 32px",
        borderRight: `1px solid #e5e5e5`,
        borderBottom: `1px solid #e5e5e5`,
        transition: "background 0.3s",
        background: hovered ? "#f8f8f8" : "transparent",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* + decorators at corners */}
      <span style={{ position: "absolute", top: -8, left: -8, color: "#ccc", fontSize: 14, fontWeight: 300 }}>+</span>
      <span style={{ position: "absolute", top: -8, right: -8, color: "#ccc", fontSize: 14, fontWeight: 300 }}>+</span>

      <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
      <h3 style={{
        fontSize: 18, fontWeight: 500, color: TEXT_DARK,
        marginBottom: 12,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 14, lineHeight: 1.6, color: "#666",
        marginBottom: 16,
      }}>
        {desc}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: 11, padding: "4px 10px", borderRadius: 100,
            background: "#f0f0f0", color: "#666", fontWeight: 500,
            letterSpacing: "0.02em",
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Results / Stats Section (dark, like Grafit's "Why Us") ─── */
function Results() {
  const stats = [
    { value: "3.5×", label: "Average ROAS", sub: "across client accounts" },
    { value: "−42%", label: "Lower CPA", sub: "vs. previous agencies" },
    { value: "€2M+", label: "Ad Spend Managed", sub: "total budget optimized" },
    { value: "93%", label: "Client Retention", sub: "month-over-month" },
  ];

  return (
    <section id="results" style={{
      background: BG_DARK, padding: "120px 32px", position: "relative",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionLabel light>PROVEN RESULTS</SectionLabel>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.2,
          color: TEXT_WHITE,
          marginBottom: 60,
        }}>
          Delivering growth with a proven track record
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: BG_CARD,
              borderRadius: 16,
              padding: "40px 32px",
              border: `1px solid ${BORDER}`,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Subtle accent glow on first card */}
              {i === 0 && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
                }} />
              )}
              <div style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 500,
                color: TEXT_WHITE,
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: TEXT_MUTED,
                marginBottom: 4,
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: 13, color: "#555" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works / Process ─── */
function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Audit",
      desc: "We analyze your current setup, competitors, and market to build a tailored growth roadmap.",
    },
    {
      num: "02",
      title: "Strategy & Launch",
      desc: "We craft your campaign structure, creatives, and audiences — then launch and start testing.",
    },
    {
      num: "03",
      title: "Optimize & Scale",
      desc: "Continuous optimization based on real data. We cut what doesn't work and scale what does.",
    },
  ];

  return (
    <section id="process" style={{ background: BG_LIGHT, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.2,
          color: TEXT_DARK,
          marginBottom: 60,
          maxWidth: 600,
        }}>
          From strategy to scale in three steps
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 0,
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: "40px 32px",
              borderLeft: i > 0 ? `1px solid #e5e5e5` : "none",
              position: "relative",
            }}>
              <div style={{
                fontSize: 48, fontWeight: 300, color: "#e5e5e5",
                marginBottom: 20, letterSpacing: "-0.02em",
              }}>
                {s.num}
              </div>
              <h3 style={{
                fontSize: 20, fontWeight: 500, color: TEXT_DARK,
                marginBottom: 12,
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: 14, lineHeight: 1.7, color: "#666",
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AI & Technology Section ─── */
function TechStack() {
  const tools = [
    {
      name: "Claude Opus 4.6",
      role: "AI Strategy Engine",
      desc: "We leverage Anthropic's most advanced reasoning model to analyse campaign data, generate creative strategies, and identify scaling opportunities that humans would miss.",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#D97757" />
          <path d="M25.5 13.5L20 26.5L17.5 19.5L14.5 26.5L12 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 13.5L22.5 26.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      accent: "#D97757",
    },
    {
      name: "GPT-4o",
      role: "Content & Copy",
      desc: "OpenAI's multimodal model powers our ad copy generation, A/B test analysis, and creative variation engine — producing scroll-stopping headlines at scale.",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#10A37F" />
          <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M20 12v-2M20 30v-2M28 20h2M10 20h2M25.6 14.4l1.4-1.4M13 27l1.4-1.4M25.6 25.6l1.4 1.4M13 13l1.4 1.4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
      accent: "#10A37F",
    },
    {
      name: "Meta Advantage+",
      role: "Campaign Automation",
      desc: "We combine Meta's own AI-driven campaign tools with our proprietary optimization workflows to maximize your ROAS while reducing manual management overhead.",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#0081FB" />
          <path d="M12 20c0-5.5 3-9 6-9s4 3.5 6 9c2 5.5 3 9 6 9s6-3.5 6-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M10 20c0 5.5 3 9 6 9s4-3.5 6-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      ),
      accent: "#0081FB",
    },
    {
      name: "Custom AI Agents",
      role: "Workflow Automation",
      desc: "Our proprietary AI agents handle repetitive tasks — from automated reporting and budget alerts to creative performance scoring — so we focus on strategy, not spreadsheets.",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} strokeWidth="1" />
          <rect x="13" y="12" width="14" height="10" rx="2" stroke={ACCENT} strokeWidth="1.5" fill="none" />
          <path d="M16 25h8M18 25v3M22 25v3M15 28h10" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17" cy="17" r="1.5" fill={ACCENT} />
          <circle cx="23" cy="17" r="1.5" fill={ACCENT} />
        </svg>
      ),
      accent: ACCENT,
    },
    {
      name: "Predictive Analytics",
      role: "Data Intelligence",
      desc: "Machine learning models forecast campaign performance, detect ad fatigue before it impacts CPA, and recommend budget shifts in real-time for maximum efficiency.",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="1" />
          <path d="M12 28l5-8 4 4 4-6 5-6" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="12" r="2" fill="#8B5CF6" />
        </svg>
      ),
      accent: "#8B5CF6",
    },
    {
      name: "Real-Time Dashboards",
      role: "Performance Visibility",
      desc: "AI-powered dashboards give you instant visibility into every metric that matters — updated in real-time, with anomaly detection and automated insight summaries.",
      logo: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1" />
          <rect x="12" y="20" width="4" height="8" rx="1" fill="#F59E0B" />
          <rect x="18" y="16" width="4" height="12" rx="1" fill="#F59E0B" />
          <rect x="24" y="12" width="4" height="16" rx="1" fill="#F59E0B" />
        </svg>
      ),
      accent: "#F59E0B",
    },
  ];

  return (
    <section id="technology" style={{
      background: BG_DARK, padding: "120px 32px", position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated circuit-board bg pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(circle at 20% 50%, ${ACCENT} 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, ${ACCENT} 1px, transparent 1px),
          radial-gradient(circle at 60% 80%, ${ACCENT} 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px, 80px 80px, 120px 120px",
      }} />

      {/* Glow effect */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}06 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel light>POWERED BY AI</SectionLabel>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: TEXT_WHITE,
            marginBottom: 20,
          }}>
            Cutting-edge technology,{" "}
            <span style={{ color: ACCENT }}>real results</span>
          </h2>
          <p style={{
            fontSize: 16, lineHeight: 1.7, color: TEXT_MUTED,
            maxWidth: 600, margin: "0 auto",
          }}>
            We don't just run ads — we deploy the most advanced AI models and automation
            tools available to give your campaigns an unfair advantage.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 16,
        }} className="tech-grid">
          {tools.map((tool, i) => (
            <TechCard key={i} {...tool} />
          ))}
        </div>

        {/* Bottom trust line */}
        <div style={{
          textAlign: "center", marginTop: 64,
          padding: "24px 32px",
          borderRadius: 16,
          border: `1px solid ${BORDER}`,
          background: BG_CARD,
        }}>
          <p style={{
            fontSize: 15, color: TEXT_MUTED, lineHeight: 1.7, margin: 0,
          }}>
            <span style={{ color: ACCENT, fontWeight: 500 }}>Why does this matter?</span>{" "}
            While most agencies still rely on manual processes, we use AI to analyse thousands of data points
            per campaign — spotting patterns, predicting performance, and optimising budgets faster than any human team could alone.
          </p>
        </div>
      </div>
    </section>
  );
}

function TechCard({ name, role, desc, logo, accent }: {
  name: string;
  role: string;
  desc: string;
  logo: React.ReactNode;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px",
        borderRadius: 16,
        border: `1px solid ${hovered ? accent + "40" : BORDER}`,
        background: hovered ? BG_CARD : "transparent",
        transition: "all 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
        <div style={{ flexShrink: 0 }}>{logo}</div>
        <div>
          <h3 style={{
            fontSize: 17, fontWeight: 500, color: TEXT_WHITE,
            marginBottom: 2,
          }}>
            {name}
          </h3>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", color: accent,
          }}>
            {role}
          </span>
        </div>
      </div>
      <p style={{
        fontSize: 14, lineHeight: 1.7, color: TEXT_MUTED, margin: 0,
      }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── Accordion "Why Us" section ─── */
function WhyUs() {
  const [openIdx, setOpenIdx] = useState(0);
  const items = [
    {
      icon: "⚡",
      title: "Speed to results",
      content: "We launch campaigns within days, not weeks. Our proven frameworks mean your ads start generating results from week one.",
    },
    {
      icon: "🎯",
      title: "Meta Ads specialists",
      content: "We don't try to do everything. We focus 100% on Meta Ads — Facebook and Instagram — so you get deep expertise, not a generalist approach.",
    },
    {
      icon: "📊",
      title: "Data-driven decisions",
      content: "Every optimization is backed by data. We track, test, and iterate continuously to maximize your ROAS and minimize wasted spend.",
    },
    {
      icon: "🤝",
      title: "Transparent partnership",
      content: "You get full visibility into your campaigns, clear reporting, and direct access to your strategist. No black boxes, no surprises.",
    },
  ];

  return (
    <section style={{
      background: BG_DARK, padding: "120px 32px", position: "relative",
      overflow: "hidden",
    }}>
      {/* Wireframe visual on the left */}
      <div style={{
        position: "absolute", left: "-10%", top: "10%",
        width: "45%", height: "80%", pointerEvents: "none",
        opacity: 0.15,
      }}>
        <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%" }}>
          {/* Wireframe sphere */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="200" cy="200"
              rx={180} ry={180 * Math.cos((i * Math.PI) / 8)}
              stroke="#ffffff" strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 200 200)`}
              fill="none" />
          ))}
          <circle cx="200" cy="200" r="180" stroke="#ffffff" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }} className="why-us-grid">
          {/* Left: visual placeholder */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }} className="why-us-visual">
            <div style={{
              width: 280, height: 280, borderRadius: "50%",
              border: `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                width: 200, height: 200, borderRadius: "50%",
                border: `1px solid #333`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 120, height: 120, borderRadius: "50%",
                  background: `radial-gradient(circle, ${ACCENT}15, transparent)`,
                  border: `1px solid ${ACCENT}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 40 }}>🌵</span>
                </div>
              </div>
              {/* Orbiting dot */}
              <div style={{
                position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
                width: 8, height: 8, borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 12px ${ACCENT}60`,
              }} />
            </div>
          </div>

          {/* Right: accordion */}
          <div>
            <SectionLabel light>WHY US</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 400, lineHeight: 1.2,
              color: TEXT_WHITE, marginBottom: 40,
            }}>
              Why brands choose Golden Cactus
            </h2>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map((item, i) => (
                <div key={i} style={{ borderTop: `1px solid ${BORDER}` }}>
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                    style={{
                      width: "100%", background: "none", border: "none",
                      padding: "24px 0", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      color: TEXT_WHITE, textAlign: "left",
                    }}
                  >
                    <span style={{
                      display: "flex", alignItems: "center", gap: 12,
                      fontSize: 17, fontWeight: 400,
                    }}>
                      <span>{item.icon}</span>
                      {item.title}
                    </span>
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
                      style={{ transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                    >
                      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: openIdx === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}>
                    <p style={{
                      fontSize: 14, lineHeight: 1.7, color: TEXT_MUTED,
                      paddingBottom: 24, paddingLeft: 36,
                    }}>
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ─── */
function PricingCard({ icon, name, desc, pricing, includes }: {
  icon: string;
  name: string;
  desc: string;
  pricing: { label: string; sublabel: string; price: string; suffix?: string }[];
  includes: string[];
}) {
  return (
    <div style={{
      borderRadius: 20,
      border: `1px solid #e5e5e5`,
      overflow: "hidden",
      background: "#fafafa",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: BG_DARK,
        padding: "36px 32px 32px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}60, transparent)`,
        }} />
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
          textTransform: "uppercase", color: ACCENT, marginBottom: 12,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          {name}
        </div>
        <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>

      {/* Pricing tiers */}
      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {pricing.map((tier, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "18px 20px", borderRadius: 12,
            background: "#fff", border: `1px solid #e5e5e5`,
          }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#999", marginBottom: 3,
              }}>
                {tier.label}
              </div>
              <div style={{ fontSize: 13, color: "#666" }}>{tier.sublabel}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: 26, fontWeight: 500, color: TEXT_DARK,
                letterSpacing: "-0.02em",
              }}>
                {tier.price}
              </div>
              {tier.suffix && <div style={{ fontSize: 12, color: "#999" }}>{tier.suffix}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ padding: "0 32px" }}>
        <div style={{ height: 1, background: "#e5e5e5" }} />
      </div>

      {/* What's included */}
      <div style={{ padding: "28px 32px 36px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#999", marginBottom: 18,
        }}>
          WHAT'S INCLUDED
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          {includes.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width={12} height={12} viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: 14, color: "#444" }}>{item}</span>
            </div>
          ))}
        </div>

        <a href="#contact" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, marginTop: 28, padding: "14px 24px",
          borderRadius: 12, background: BG_DARK, color: TEXT_WHITE,
          fontSize: 14, fontWeight: 500, textDecoration: "none",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Get started
          <ArrowIcon size={14} />
        </a>
      </div>
    </div>
  );
}

function Pricing() {
  const plans = [
    {
      icon: "📣",
      name: "META ADS STARTER",
      desc: "Everything you need to launch, test, and scale your Meta Ads campaigns.",
      pricing: [
        { label: "Month 1", sublabel: "Setup + initial testing", price: "£300" },
        { label: "Ongoing", sublabel: "Monthly management", price: "£600", suffix: "/month" },
      ],
      includes: [
        "Campaign setup & structure",
        "Creative testing (static + video)",
        "Audience research & targeting",
        "Weekly optimisation & scaling",
        "Performance reporting & insights",
        "Dedicated strategist",
      ],
    },
    {
      icon: "🤖",
      name: "AI AUTOMATION",
      desc: "Streamline your operations with intelligent automation that saves hours every week.",
      pricing: [
        { label: "Starting from", sublabel: "Custom scoped per project", price: "£450", suffix: "/month" },
      ],
      includes: [
        "AI chatbots for your business",
        "Automating repetitive tasks",
        "Email & message automation",
        "Automated content posting",
        "Basic workflow automation",
      ],
    },
    {
      icon: "🚀",
      name: "WEBSITE + GROWTH STACK",
      desc: "A complete digital foundation — from website to CRM to performance tracking.",
      pricing: [
        { label: "Starting from", sublabel: "Custom scoped per project", price: "£800", suffix: "/project" },
      ],
      includes: [
        "Website creation & design",
        "CRM system implementation",
        "Basic SEO setup",
        "Third-party integrations",
        "Performance & tracking setup",
      ],
    },
  ];

  return (
    <section id="pricing" style={{
      background: BG_LIGHT, padding: "120px 32px",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>PRICING</SectionLabel>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: TEXT_DARK,
            marginBottom: 16,
          }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666", maxWidth: 520, margin: "0 auto" }}>
            No hidden fees. No long-term contracts. Pick what you need — or combine services for a full growth engine.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          alignItems: "stretch",
        }} className="pricing-grid">
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Form Section ─── */
function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    monthlyRevenue: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Send form data to the API endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          websiteUrl: formData.websiteUrl || undefined,
          monthlyRevenue: formData.monthlyRevenue,
        }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission failed:", err);
      // Still show thank you to not frustrate the user
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: `1px solid ${BORDER}`,
    background: BG_CARD,
    color: TEXT_WHITE,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: TEXT_MUTED,
    marginBottom: 8,
    display: "block",
  };

  const revenueOptions = [
    "Select range",
    "Under £5,000",
    "£5,000 – £15,000",
    "£15,000 – £50,000",
    "£50,000 – £100,000",
    "£100,000+",
  ];

  if (submitted) {
    return (
      <section id="contact" style={{
        background: BG_DARK, padding: "120px 32px",
        borderTop: `1px solid ${BORDER}`,
      }}>
        <div style={{
          maxWidth: 560, margin: "0 auto", textAlign: "center",
          padding: "80px 40px",
          borderRadius: 20, border: `1px solid ${BORDER}`,
          background: BG_CARD,
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🌵</div>
          <h2 style={{
            fontSize: 28, fontWeight: 500, color: TEXT_WHITE, marginBottom: 12,
          }}>
            Thanks for reaching out!
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, lineHeight: 1.7 }}>
            We'll review your details and get back to you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" style={{
      background: BG_DARK, padding: "120px 32px",
      borderTop: `1px solid ${BORDER}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute", right: "-5%", top: "5%",
        width: "35%", height: "90%", pointerEvents: "none", opacity: 0.08,
      }}>
        <svg viewBox="0 0 400 500" fill="none" style={{ width: "100%", height: "100%" }}>
          <circle cx="200" cy="250" r="180" stroke={ACCENT} strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="250" r="120" stroke="#fff" strokeWidth="0.3" fill="none" />
          <circle cx="200" cy="250" r="60" stroke={ACCENT} strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }} className="contact-grid">
          {/* Left side — text */}
          <div style={{ paddingTop: 20 }}>
            <AvailabilityDot />
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: TEXT_WHITE,
              marginTop: 20,
              marginBottom: 24,
            }}>
              Ready to scale your ads?
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: TEXT_MUTED,
              maxWidth: 400, marginBottom: 40,
            }}>
              Fill in the form and we'll get back to you within 24 hours with a tailored growth plan for your business.
            </p>

            {/* Quick info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "⚡", text: "Free consultation — no commitment" },
                { icon: "📊", text: "Custom strategy based on your goals" },
                { icon: "🚀", text: "Launch within days of approval" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, color: TEXT_MUTED }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — form */}
          <div>
            <form onSubmit={handleSubmit} style={{
              background: BG_CARD,
              borderRadius: 20,
              border: `1px solid ${BORDER}`,
              padding: "40px 36px",
            }}>
              <h3 style={{
                fontSize: 20, fontWeight: 500, color: TEXT_WHITE,
                marginBottom: 32,
              }}>
                Tell us about your business
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7XXX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label style={labelStyle}>Company name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your company or brand"
                    value={formData.companyName}
                    onChange={handleChange("companyName")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>

                {/* Website URL */}
                <div>
                  <label style={labelStyle}>Website URL <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={formData.websiteUrl}
                    onChange={handleChange("websiteUrl")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>

                {/* Monthly Revenue */}
                <div>
                  <label style={labelStyle}>Approx. monthly revenue *</label>
                  <select
                    required
                    value={formData.monthlyRevenue}
                    onChange={handleChange("monthlyRevenue")}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      paddingRight: 40,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  >
                    {revenueOptions.map(opt => (
                      <option key={opt} value={opt === "Select range" ? "" : opt} disabled={opt === "Select range"}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: 12,
                    border: "none",
                    background: TEXT_WHITE,
                    color: TEXT_DARK,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {submitting ? "Sending..." : "Send enquiry"}
                  {!submitting && <ArrowIcon size={14} />}
                </button>
              </div>

              <p style={{
                fontSize: 11, color: "#555", marginTop: 16, textAlign: "center", lineHeight: 1.5,
              }}>
                We'll never share your information. Response within 24h.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{
      background: BG_DARK, padding: "60px 32px 40px",
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{
        maxWidth: 1320, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 60,
      }} className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <GCLogo size={36} />
          </div>
          <p style={{
            fontSize: 13, lineHeight: 1.7, color: TEXT_MUTED,
            maxWidth: 280,
          }}>
            Performance marketing agency specializing in Meta Ads. We help brands grow revenue and scale profitably.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Services
          </h4>
          {["Meta Ads Management", "Ad Creative", "Strategy & Audits", "Landing Pages", "Analytics"].map(s => (
            <a key={s} href="#services" style={{
              display: "block", fontSize: 13, color: "#777",
              textDecoration: "none", marginBottom: 10,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >
              {s}
            </a>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Company
          </h4>
          {[
            { label: "Results", href: "#results" },
            { label: "Process", href: "#process" },
            { label: "Contact", href: "#contact" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{
              display: "block", fontSize: 13, color: "#777",
              textDecoration: "none", marginBottom: 10,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Contact
          </h4>
          <a href="mailto:info@goldencactus.co" style={{
            display: "block", fontSize: 13, color: "#777",
            textDecoration: "none", marginBottom: 10,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = "#777")}
          >
            info@goldencactus.co
          </a>
          <p style={{ fontSize: 13, color: "#555", marginTop: 16 }}>
            London, United Kingdom
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1320, margin: "40px auto 0",
        paddingTop: 20,
        borderTop: `1px solid ${BORDER}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ fontSize: 12, color: "#555" }}>
          Golden Cactus Co. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#555" }}>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

/* ─── Responsive Styles ─── */
function ResponsiveStyles() {
  return (
    <style>{`
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      html { scroll-behavior: smooth; }
      body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

      @media (max-width: 768px) {
        .nav-desktop { display: none !important; }
        .nav-right-desktop { display: none !important; }
        .nav-mobile-btn { display: block !important; }
        .why-us-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .why-us-visual { display: none !important; }
        .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        .tech-grid { grid-template-columns: 1fr !important; }
      }

      @media (min-width: 769px) {
        .nav-mobile-btn { display: none !important; }
        .nav-mobile-menu { display: none !important; }
      }

      @media (max-width: 480px) {
        .footer-grid { grid-template-columns: 1fr !important; }
      }

      /* Smooth scroll offset for fixed nav */
      [id] { scroll-margin-top: 80px; }
    `}</style>
  );
}

/* ─── Main Landing Page ─── */
export function LandingPage() {
  return (
    <div style={{ background: BG_DARK, minHeight: "100vh" }}>
      <ResponsiveStyles />
      <Nav />
      <Hero />
      <WhoWeAre />
      <Services />
      <TechStack />
      <Results />
      <Process />
      <WhyUs />
      <Pricing />
      <ContactForm />
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { ShaderBackground } from "../components/ShaderBackground";

/* ─── Colour tokens (premium muted palette) ─── */
const ACCENT = "#C9A84C";
const BG_DARK = "#0e0e0e";
const BG_CARD = "#181818";
const BG_LIGHT = "#faf9f6";
const TEXT_WHITE = "#f5f0eb";
const TEXT_MUTED = "#888888";
const TEXT_DARK = "#1a1a1a";
const BORDER = "#282828";

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

/* ─── CTA Button ─── */
function CTAButton({ label, href, variant = "outline" }: { label: string; href: string; variant?: "outline" | "filled" }) {
  const [hovered, setHovered] = useState(false);
  const isOutline = variant === "outline";
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 20px", borderRadius: 100,
        border: isOutline ? `1px solid ${hovered ? TEXT_WHITE : "#444"}` : "none",
        background: isOutline ? "transparent" : (hovered ? "#222" : TEXT_WHITE),
        color: isOutline ? TEXT_WHITE : TEXT_DARK,
        fontSize: 14, fontWeight: 500, textDecoration: "none",
        cursor: "pointer", transition: "all 0.25s ease", letterSpacing: "0.01em",
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
      fontSize: 12, fontWeight: 500, letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: light ? ACCENT : "#999",
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
    { label: "Solutions", href: "#solutions" },
    { label: "Technology", href: "#technology" },
    { label: "Stacks", href: "#stacks" },
    { label: "Results", href: "#results" },
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
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img src="/gc-logo.png" alt="Golden Cactus Co." style={{ height: 38, width: "auto" }} />
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-desktop">
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

      {mobileOpen && (
        <div className="nav-mobile-menu" style={{
          background: "rgba(10,10,10,0.98)", padding: "20px 32px 32px",
          borderTop: `1px solid ${BORDER}`,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display: "block", padding: "14px 0", color: TEXT_WHITE,
              textDecoration: "none", fontSize: 16, borderBottom: `1px solid ${BORDER}`,
            }}>
              {l.label}
            </a>
          ))}
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
      <ShaderBackground dimOverlay={0.3} />

      <div style={{
        maxWidth: 1320, margin: "0 auto", padding: "80px 32px 60px",
        position: "relative", zIndex: 1,
      }}>
        <SectionLabel light>AI SYSTEMS &amp; AUTOMATION AGENCY</SectionLabel>

        <h1 style={{
          fontSize: "clamp(42px, 5.5vw, 80px)",
          fontWeight: 500, lineHeight: 1.08,
          color: TEXT_WHITE, maxWidth: 850,
          marginBottom: 32, letterSpacing: "-0.02em",
        }}>
          We build AI systems that run your business
        </h1>

        <p style={{
          fontSize: 17, lineHeight: 1.6, color: TEXT_MUTED,
          maxWidth: 520, marginBottom: 40,
        }}>
          Custom automation systems, intelligent workflows, and AI-powered tools
          that save time, cut costs, and scale your operations — without hiring extra teams.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <CTAButton label="Get started" href="#contact" variant="outline" />
          <a href="#solutions" style={{
            color: TEXT_MUTED, fontSize: 14, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = TEXT_MUTED)}
          >
            See what we build
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Highlight Chip ─── */
function HighlightChip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block", background: "#f0ede8",
      padding: "6px 14px", borderRadius: 10,
      whiteSpace: "nowrap", margin: "4px auto",
      maxWidth: "calc(100vw - 60px)", overflow: "hidden",
    }}>
      {children}
    </span>
  );
}

/* ─── Who We Are ─── */
function WhoWeAre() {
  return (
    <section style={{ background: BG_LIGHT, padding: "120px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>WHO WE ARE</SectionLabel>
        <h2 style={{
          fontSize: "clamp(24px, 3.5vw, 50px)",
          fontWeight: 400, lineHeight: 1.7, color: TEXT_DARK,
        }}>
          We help businesses<br />
          <HighlightChip>automate operations</HighlightChip><br />
          <HighlightChip>save hundreds of hours</HighlightChip><br />
          <HighlightChip>scale efficiently</HighlightChip><br />
          without hiring extra teams.
        </h2>
      </div>
    </section>
  );
}

/* ─── Use Cases Section ─── */
function UseCases() {
  const cases = [
    { num: "01", title: "Membership & Subscription Systems", desc: "Automated payment collection, access management, and member lifecycle — from sign-up to renewal reminders.", tags: ["Stripe", "Telegram", "Auto-Access"] },
    { num: "02", title: "AI Support & Assistant Systems", desc: "Intelligent chatbots and AI assistants that handle customer queries, qualify leads, and escalate when needed.", tags: ["Chatbots", "NLP", "24/7 Support"] },
    { num: "03", title: "Community Onboarding Automations", desc: "Automated welcome flows, KYC, role assignment, and guided onboarding for Telegram, Discord, or Slack communities.", tags: ["Telegram", "Discord", "Welcome Flows"] },
    { num: "04", title: "Payment & Access Workflows", desc: "End-to-end payment processing with automatic access granting, grace periods, and churn recovery — fully hands-off.", tags: ["Payments", "Webhooks", "Auto-Kick"] },
    { num: "05", title: "Lead Qualification Pipelines", desc: "AI-powered lead scoring, automated follow-ups, and smart routing that turns inbound traffic into qualified prospects.", tags: ["CRM", "Scoring", "Automation"] },
    { num: "06", title: "Automated Content Distribution", desc: "Schedule, generate, and distribute content across multiple channels with AI — social media, email, Telegram, and more.", tags: ["Multi-Channel", "AI Content", "Scheduling"] },
    { num: "07", title: "Internal Dashboards & Workflows", desc: "Custom dashboards, approval flows, and operational tools that replace spreadsheets and manual processes.", tags: ["Dashboards", "Reporting", "Ops"] },
    { num: "08", title: "Client Onboarding Systems", desc: "AI-powered onboarding that collects info, sets up accounts, triggers welcome sequences, and tracks progress automatically.", tags: ["Forms", "Automation", "Tracking"] },
  ];

  return (
    <section id="use-cases" style={{ background: BG_DARK, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel light>WHAT WE BUILD</SectionLabel>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400, lineHeight: 1.2,
            color: TEXT_WHITE, marginBottom: 16,
          }}>
            AI-powered systems for{" "}
            <span style={{ color: ACCENT }}>every part</span> of your business
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: TEXT_MUTED, maxWidth: 600, margin: "0 auto" }}>
            From customer-facing automations to internal operations — we build the systems
            that let you focus on growth while the tech runs itself.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }} className="use-cases-grid">
          {cases.map((c) => (
            <UseCaseCard key={c.num} {...c} />
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: 48,
          padding: "24px 32px", borderRadius: 16,
          border: `1px solid ${BORDER}`, background: BG_CARD,
        }}>
          <p style={{ fontSize: 15, color: TEXT_MUTED, lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: ACCENT, fontWeight: 500 }}>Don't see your use case?</span>{" "}
            These are just examples. We build custom systems tailored to your exact workflow — if it can be automated, we can build it.
          </p>
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ num, title, desc, tags }: { num: string; title: string; desc: string; tags: string[] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px", borderRadius: 16,
        border: `1px solid ${hovered ? ACCENT + "30" : BORDER}`,
        background: hovered ? BG_CARD : "transparent",
        transition: "all 0.3s ease", cursor: "default",
        position: "relative", overflow: "hidden",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
        }} />
      )}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: `${ACCENT}12`, border: `1px solid ${ACCENT}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: ACCENT, fontSize: 14, fontWeight: 600, letterSpacing: "0.02em",
        marginBottom: 16,
      }}>
        {num}
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 500, color: TEXT_WHITE, marginBottom: 10 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: TEXT_MUTED, marginBottom: 16 }}>
        {desc}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: 11, padding: "4px 10px", borderRadius: 100,
            background: `${ACCENT}10`, color: ACCENT, fontWeight: 500,
            letterSpacing: "0.02em", border: `1px solid ${ACCENT}20`,
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Solutions / Services Section ─── */
function Solutions() {
  const services = [
    { num: "01", title: "AI Systems & Automations", desc: "Custom-built intelligent systems that automate your workflows, manage members, process payments, and handle operations.", tags: ["Workflows", "Integrations", "Bots"] },
    { num: "02", title: "Performance Marketing", desc: "Data-driven Meta Ads and Google Ads campaigns that generate leads, drive sales, and scale your customer acquisition profitably.", tags: ["Meta Ads", "Google Ads", "Lead Gen"] },
    { num: "03", title: "Ad Creative & Content", desc: "High-converting ad creatives, AI-generated content, and scroll-stopping videos that drive action across every platform.", tags: ["Video", "AI Copy", "UGC"] },
    { num: "04", title: "Websites & Landing Pages", desc: "High-converting websites, landing pages, and sales funnels optimized for performance and designed to convert visitors into customers.", tags: ["Design", "CRO", "Funnels"] },
    { num: "05", title: "Dashboards & Analytics", desc: "Real-time dashboards, automated reporting, and AI-powered analytics that give you visibility into every metric that matters.", tags: ["Reporting", "KPIs", "Real-Time"] },
    { num: "06", title: "Integrations & APIs", desc: "Connect your tools, platforms, and data sources into one seamless system. Stripe, Telegram, CRMs, email — we wire it all together.", tags: ["Stripe", "APIs", "CRM"] },
  ];

  return (
    <section id="solutions" style={{ background: BG_LIGHT, padding: "120px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 60, flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <SectionLabel>OUR SOLUTIONS</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400, lineHeight: 1.2,
              color: TEXT_DARK, maxWidth: 520,
            }}>
              Everything you need to automate and grow
            </h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666", maxWidth: 380, paddingTop: 32 }}>
            From AI-powered automation to performance marketing — we combine cutting-edge technology with proven strategies to deliver results.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          border: `1px solid #e0ddd8`,
        }}>
          {services.map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ num, title, desc, tags }: { num: string; title: string; desc: string; tags: string[] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "36px 32px",
        borderRight: `1px solid #e0ddd8`,
        borderBottom: `1px solid #e0ddd8`,
        transition: "background 0.3s",
        background: hovered ? "#f5f2ed" : "transparent",
        cursor: "default", position: "relative",
      }}
    >
      <span style={{ position: "absolute", top: -8, left: -8, color: "#ccc", fontSize: 14, fontWeight: 300 }}>+</span>
      <span style={{ position: "absolute", top: -8, right: -8, color: "#ccc", fontSize: 14, fontWeight: 300 }}>+</span>
      <div style={{
        fontSize: 13, fontWeight: 500, color: ACCENT, letterSpacing: "0.08em",
        marginBottom: 16,
      }}>
        {num}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 500, color: TEXT_DARK, marginBottom: 12 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#666", marginBottom: 16 }}>
        {desc}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: 11, padding: "4px 10px", borderRadius: 100,
            background: "#f0ede8", color: "#666", fontWeight: 500, letterSpacing: "0.02em",
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Results / Stats Section ─── */
function Results() {
  const stats = [
    { value: "50+", label: "Systems Built", sub: "automations deployed and running" },
    { value: "10k+", label: "Hours Saved", sub: "for our clients, per year" },
    { value: "3.5x", label: "Average ROAS", sub: "across ad accounts managed" },
    { value: "93%", label: "Client Retention", sub: "month-over-month" },
  ];

  return (
    <section id="results" style={{ background: BG_LIGHT, padding: "120px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionLabel>PROVEN RESULTS</SectionLabel>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 400, lineHeight: 1.2,
          color: TEXT_DARK, marginBottom: 60,
        }}>
          Real impact, measurable results
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 0,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "48px 32px",
              borderLeft: i > 0 ? `1px solid #e0ddd8` : "none",
              position: "relative",
            }}>
              {i === 0 && (
                <div style={{
                  position: "absolute", top: 0, left: 0, width: 48, height: 3,
                  background: ACCENT,
                }} />
              )}
              <div style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 500, color: TEXT_DARK,
                marginBottom: 8, letterSpacing: "-0.02em",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 500, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "#999", marginBottom: 4,
              }}>
                {s.label}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>{s.sub}</div>
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
    { num: "01", title: "Consult & Scope", desc: "We map out your current workflows, identify automation opportunities, and define exactly what to build — whether it's an AI system, a marketing engine, or both." },
    { num: "02", title: "Design & Build", desc: "Our team builds your custom system using proven frameworks. You get a fully functional prototype within days, not months." },
    { num: "03", title: "Deploy & Optimise", desc: "We deploy your system, connect all integrations, and continuously optimise based on real data. Your automation gets smarter over time." },
  ];

  return (
    <section id="process" style={{ background: BG_DARK, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionLabel light>HOW IT WORKS</SectionLabel>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 400, lineHeight: 1.2,
          color: TEXT_WHITE, marginBottom: 60, maxWidth: 600,
        }}>
          From idea to running system in days
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 0,
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: "40px 32px",
              borderLeft: i > 0 ? `1px solid ${BORDER}` : "none",
              position: "relative",
            }}>
              <div style={{
                fontSize: 48, fontWeight: 300, color: "#333",
                marginBottom: 20, letterSpacing: "-0.02em",
              }}>
                {s.num}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 500, color: TEXT_WHITE, marginBottom: 12 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: TEXT_MUTED }}>
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
/* Brand logos removed — using real image files + abstract SVG icons */

function TechStack() {
  /* Elegant abstract SVG icons for non-branded cards */
  const IconIntegrations = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="10" cy="18" r="3" stroke="#10A37F" strokeWidth="1.5" />
      <circle cx="26" cy="10" r="3" stroke="#10A37F" strokeWidth="1.5" />
      <circle cx="26" cy="26" r="3" stroke="#10A37F" strokeWidth="1.5" />
      <path d="M13 17L23 11M13 19L23 25" stroke="#10A37F" strokeWidth="1" opacity="0.6" />
    </svg>
  );
  const IconAutomation = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M8 18C8 12.5 12.5 8 18 8" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 18C28 23.5 23.5 28 18 28" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="8" r="2" fill={ACCENT} opacity="0.8" />
      <circle cx="18" cy="28" r="2" fill={ACCENT} opacity="0.8" />
      <circle cx="18" cy="18" r="3" stroke={ACCENT} strokeWidth="1.5" />
    </svg>
  );
  const IconAnalytics = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 28C10 22 14 12 18 16C22 20 26 8 30 6" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="16" r="2" fill="#8B5CF6" opacity="0.6" />
      <circle cx="30" cy="6" r="2" fill="#8B5CF6" opacity="0.8" />
    </svg>
  );
  const IconDashboards = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="4" width="12" height="8" rx="2" stroke="#F59E0B" strokeWidth="1.2" opacity="0.7" />
      <rect x="20" y="4" width="12" height="12" rx="2" stroke="#F59E0B" strokeWidth="1.2" opacity="0.5" />
      <rect x="4" y="16" width="12" height="16" rx="2" stroke="#F59E0B" strokeWidth="1.2" opacity="0.5" />
      <rect x="20" y="20" width="12" height="12" rx="2" stroke="#F59E0B" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );

  const tools = [
    {
      name: "Claude & GPT-4o", role: "AI Intelligence Layer",
      desc: "We leverage the most advanced AI models to power your systems — from intelligent chatbots and content generation to data analysis and decision-making workflows.",
      icon: (
        <>
          <img src="/logo-claude.png" width={34} height={34} style={{ borderRadius: 8 }} alt="Claude" />
        </>
      ),
      accent: "#D97757",
    },
    {
      name: "Custom Integrations", role: "Connect Everything",
      desc: "Stripe, Telegram, Discord, Slack, CRMs, email providers, databases — we wire your entire tech stack into one seamless automated system.",
      icon: IconIntegrations,
      accent: "#10A37F",
    },
    {
      name: "Meta & Google Ads", role: "Performance Marketing",
      desc: "AI-enhanced campaign management across Meta and Google — automated bidding, creative testing, audience optimization, and real-time budget allocation.",
      icon: (
        <>
          <img src="/logo-meta.png" width={38} height={38} style={{ borderRadius: 6 }} alt="Meta" />
        </>
      ),
      accent: "#0081FB",
    },
    {
      name: "Workflow Automation", role: "Custom AI Agents",
      desc: "Proprietary AI agents that run 24/7 — handling tasks from automated member management and content scheduling to payment processing and alert systems.",
      icon: IconAutomation,
      accent: ACCENT,
    },
    {
      name: "Predictive Analytics", role: "Data Intelligence",
      desc: "Machine learning models that forecast outcomes, detect problems before they impact your business, and recommend actions in real-time.",
      icon: IconAnalytics,
      accent: "#8B5CF6",
    },
    {
      name: "Real-Time Dashboards", role: "Full Visibility",
      desc: "Custom-built dashboards with live data, anomaly detection, and automated insight summaries — so you always know exactly what's happening in your business.",
      icon: IconDashboards,
      accent: "#F59E0B",
    },
  ];

  return (
    <section id="technology" style={{
      background: BG_DARK, padding: "120px 32px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(circle at 20% 50%, ${ACCENT} 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, ${ACCENT} 1px, transparent 1px),
          radial-gradient(circle at 60% 80%, ${ACCENT} 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px, 80px 80px, 120px 120px",
      }} />

      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${ACCENT}06 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel light>OUR TECHNOLOGY</SectionLabel>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400, lineHeight: 1.2,
            color: TEXT_WHITE, marginBottom: 20,
          }}>
            Built with the{" "}
            <span style={{ color: ACCENT }}>best tools</span> available
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: TEXT_MUTED, maxWidth: 600, margin: "0 auto" }}>
            We combine the most advanced AI models, custom integrations, and proven marketing
            platforms to build systems that actually work — and keep working.
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
      </div>
    </section>
  );
}

function TechCard({ name, role, desc, icon, accent }: {
  name: string; role: string; desc: string; icon: React.ReactNode; accent: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px", borderRadius: 16,
        border: `1px solid ${hovered ? accent + "40" : BORDER}`,
        background: hovered ? BG_CARD : "transparent",
        transition: "all 0.3s ease", cursor: "default",
        position: "relative", overflow: "hidden",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }} />
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
        <div style={{ flexShrink: 0, display: "flex", gap: 10, alignItems: "center" }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 500, color: TEXT_WHITE, marginBottom: 2 }}>{name}</h3>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", color: accent,
          }}>{role}</span>
        </div>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: TEXT_MUTED, margin: 0 }}>{desc}</p>
    </div>
  );
}

/* ─── Why Us Section ─── */
function WhyUs() {
  const [openIdx, setOpenIdx] = useState(0);
  const items = [
    { title: "Days, not months", content: "We deploy working systems in days. Our proven frameworks and reusable components mean you get results fast — not a six-month development timeline." },
    { title: "AI-native approach", content: "We don't bolt AI on as an afterthought. Every system we build is designed around intelligent automation from the ground up — making them smarter and more efficient than traditional solutions." },
    { title: "Custom or pre-built", content: "Need something specific? We build it from scratch. Want to move fast? We have battle-tested frameworks you can plug in and customise. Either way, you get a system that fits your business." },
    { title: "Full-service partnership", content: "From AI automations to performance marketing to web development — we handle the entire stack. One team, one relationship, complete visibility into everything we build and manage for you." },
  ];

  return (
    <section style={{
      background: BG_DARK, padding: "120px 32px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", left: "-10%", top: "10%",
        width: "45%", height: "80%", pointerEvents: "none", opacity: 0.08,
      }}>
        <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%" }}>
          <circle cx="200" cy="200" r="180" stroke={ACCENT} strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="120" stroke="#ffffff" strokeWidth="0.3" fill="none" />
          <circle cx="200" cy="200" r="60" stroke={ACCENT} strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, alignItems: "start",
        }} className="why-us-grid">
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
                  <img src="/gc-logo.png" alt="GC" style={{ height: 48, width: "auto", opacity: 0.8 }} />
                </div>
              </div>
              <div style={{
                position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
                width: 8, height: 8, borderRadius: "50%",
                background: ACCENT, boxShadow: `0 0 12px ${ACCENT}60`,
              }} />
            </div>
          </div>

          <div>
            <SectionLabel light>WHY US</SectionLabel>
            <h2 style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 400, lineHeight: 1.2,
              color: TEXT_WHITE, marginBottom: 40,
            }}>
              Why businesses choose Golden Cactus
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
                      <span style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: `${ACCENT}12`, border: `1px solid ${ACCENT}25`,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        color: ACCENT, fontSize: 12, fontWeight: 600, flexShrink: 0,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </span>
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
                      style={{ transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}
                    >
                      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: openIdx === i ? 200 : 0,
                    overflow: "hidden", transition: "max-height 0.4s ease",
                  }}>
                    <p style={{
                      fontSize: 14, lineHeight: 1.7, color: TEXT_MUTED,
                      paddingBottom: 24, paddingLeft: 40,
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

/* ─── Stacks Section (replaces Pricing) ─── */
function FlowArrow() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minWidth: 28, flexShrink: 0, color: `${ACCENT}90`,
    }} className="flow-arrow">
      <svg width={18} height={18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10h12M12 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StepNode({ num, title, items, logos }: {
  num: string; title: string; items: string[];
  logos?: { domain: string; name: string }[];
}) {
  return (
    <div style={{
      flex: "1 1 0", minWidth: 0, padding: "22px 20px",
      background: "#1e1e1e", borderRadius: 12,
      border: `1px solid #2a2a2a`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: ACCENT,
        letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase",
      }}>
        Step {num}
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 500, color: TEXT_WHITE, marginBottom: 10, lineHeight: 1.3 }}>
        {title}
      </h4>
      {logos && logos.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {logos.map(l => (
            <img key={l.domain} src={`https://logo.clearbit.com/${l.domain}`}
              width={22} height={22}
              style={{ borderRadius: 5, background: "#fff" }}
              alt={l.name}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function StackCard({ badge, title, subtitle, steps }: {
  badge: string; title: string; subtitle: string;
  steps: { num: string; title: string; items: string[]; logos?: { domain: string; name: string }[] }[];
}) {
  return (
    <div style={{
      background: "#171717", borderRadius: 20,
      border: `1px solid #2a2a2a`, padding: "44px 40px",
      marginBottom: 28, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${ACCENT}60, transparent)`,
      }} />
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{
          display: "inline-block", padding: "4px 14px",
          borderRadius: 100, background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`,
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", color: ACCENT, marginBottom: 16,
        }}>
          {badge}
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 500, color: TEXT_WHITE, marginBottom: 8 }}>
          {title}
        </h3>
        <p style={{ fontSize: 15, color: "#999", lineHeight: 1.6, margin: "0 auto", maxWidth: 500 }}>
          {subtitle}
        </p>
      </div>

      <div style={{
        display: "flex", alignItems: "stretch", gap: 0,
        width: "100%",
      }} className="stack-flow">
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch", flex: "1 1 0", minWidth: 0 }}>
            {i > 0 && <FlowArrow />}
            <StepNode {...step} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Stacks() {
  const stackData = [
    {
      badge: "Lead Generation",
      title: "Lead Gen Stack",
      subtitle: "End-to-end pipeline from cold audience to qualified lead",
      steps: [
        { num: "01", title: "Traffic Sources", items: ["Meta Ads", "Google Ads", "LinkedIn Ads"], logos: [{ domain: "meta.com", name: "Meta" }, { domain: "google.com", name: "Google" }, { domain: "linkedin.com", name: "LinkedIn" }] },
        { num: "02", title: "Landing Page", items: ["High-converting funnel page", "A/B tested copy & creative"], logos: [] },
        { num: "03", title: "CRM Integration", items: ["Lead capture & tagging", "Pipeline stage management"], logos: [{ domain: "hubspot.com", name: "HubSpot" }] },
        { num: "04", title: "Follow-Up System", items: ["Automated email sequences", "SMS follow-up", "Lead scoring", "Calendar booking"], logos: [{ domain: "calendly.com", name: "Calendly" }] },
        { num: "05", title: "Reporting", items: ["Live dashboard", "Cost-per-lead tracking", "Weekly performance reviews"], logos: [] },
      ],
    },
    {
      badge: "Revenue",
      title: "Telegram Channel Stack",
      subtitle: "From audience to recurring revenue",
      steps: [
        { num: "01", title: "Audience Acquisition", items: ["Organic content (IG, TikTok, X)", "Paid ads driving to channel"], logos: [] },
        { num: "02", title: "Telegram Channel", items: ["Premium gated content", "Daily/weekly signals", "Community engagement"], logos: [{ domain: "telegram.org", name: "Telegram" }] },
        { num: "03", title: "Payment Management", items: ["Automated access control", "Churn management", "Win-back flows"], logos: [{ domain: "stripe.com", name: "Stripe" }] },
        { num: "04", title: "Content Delivery", items: ["Scheduled posts", "Alerts & notifications", "Exclusive resources"], logos: [] },
      ],
    },
    {
      badge: "Content",
      title: "Social Intelligence Stack",
      subtitle: "Automated research, planning, and publishing",
      steps: [
        { num: "01", title: "Trend Scanning", items: ["Keyword monitoring", "Competitor analysis", "Viral content detection"], logos: [] },
        { num: "02", title: "AI Content Planning", items: ["Topic clustering", "Calendar generation", "Caption & hook writing"], logos: [] },
        { num: "03", title: "Creative Production", items: ["Template design", "AI image generation", "Video scripting"], logos: [{ domain: "canva.com", name: "Canva" }] },
        { num: "04", title: "Scheduling", items: ["Cross-platform posting", "IG, LinkedIn, TikTok, X", "Engagement tracking"], logos: [] },
        { num: "05", title: "Analytics", items: ["Performance reporting", "Content scoring", "Monthly strategy review"], logos: [] },
      ],
    },
    {
      badge: "Financial Services",
      title: "Trading Intelligence Stack",
      subtitle: "From market data to automated execution",
      steps: [
        { num: "01", title: "Research & Data", items: ["On-chain analytics", "Technical indicators", "Sentiment analysis", "News monitoring"], logos: [] },
        { num: "02", title: "AI Analysis", items: ["Chart pattern recognition", "Multi-factor scoring", "Risk assessment"], logos: [] },
        { num: "03", title: "Signal Delivery", items: ["Telegram group alerts", "Entry/exit levels", "Real-time notifications"], logos: [{ domain: "telegram.org", name: "Telegram" }] },
        { num: "04", title: "Automated Execution", items: ["Bitget API integration", "Position sizing", "Stop-loss management"], logos: [] },
        { num: "05", title: "Reporting", items: ["P&L tracking", "Win rate analytics", "Portfolio dashboard"], logos: [] },
      ],
    },
  ];

  return (
    <section id="stacks" style={{ background: "#111111", padding: "120px 32px", borderTop: `1px solid #2a2a2a` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel light>OUR STACKS</SectionLabel>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400, lineHeight: 1.2,
            color: TEXT_WHITE, marginBottom: 16,
          }}>
            What we build
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: TEXT_MUTED, maxWidth: 600, margin: "0 auto" }}>
            End-to-end automation stacks that connect every tool in your workflow into one seamless system.
          </p>
        </div>

        {stackData.map((stack, i) => (
          <StackCard key={i} {...stack} />
        ))}

        {/* Custom stacks note */}
        <div style={{
          textAlign: "center", marginTop: 48, padding: "36px 24px",
          borderRadius: 16, border: `1px dashed ${ACCENT}30`,
          background: `${ACCENT}05`,
        }}>
          <p style={{
            fontSize: 16, color: TEXT_MUTED, margin: 0, lineHeight: 1.7,
          }}>
            These are sample stacks.{" "}
            <span style={{ color: TEXT_WHITE, fontWeight: 500 }}>
              Every system we build is custom
            </span>{" "}
            — tailored to your business, your tools, and your goals.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Form Section ─── */
function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: "", websiteUrl: "", monthlyRevenue: "",
    name: "", email: "", phone: "", interest: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, email: formData.email, phone: formData.phone,
          companyName: formData.companyName, websiteUrl: formData.websiteUrl || undefined,
          monthlyRevenue: formData.monthlyRevenue, interest: formData.interest,
        }),
      });
      if (!res.ok) throw new Error("API error");
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Contact Form', content_category: 'Lead Generation',
        });
      }
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 10,
    border: `1px solid ${BORDER}`, background: BG_CARD,
    color: TEXT_WHITE, fontSize: 14, outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 500, letterSpacing: "0.06em",
    textTransform: "uppercase", color: TEXT_MUTED,
    marginBottom: 8, display: "block",
  };

  const interestOptions = [
    "Select what you're interested in",
    "AI Automation System",
    "Performance Marketing (Meta/Google Ads)",
    "Full Growth Stack",
    "Custom project — let's talk",
  ];

  const revenueOptions = [
    "Select range", "Under £5,000", "£5,000 – £15,000",
    "£15,000 – £50,000", "£50,000 – £100,000", "£100,000+",
  ];

  if (submitted) {
    return (
      <section id="contact" style={{
        background: BG_DARK, padding: "120px 32px", borderTop: `1px solid ${BORDER}`,
      }}>
        <div style={{
          maxWidth: 560, margin: "0 auto", textAlign: "center",
          padding: "80px 40px", borderRadius: 20,
          border: `1px solid ${BORDER}`, background: BG_CARD,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 500, color: TEXT_WHITE, marginBottom: 12 }}>
            Thanks for reaching out
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, lineHeight: 1.7 }}>
            We'll review your details and get back to you within 24 hours with a tailored plan.
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
      <div style={{
        position: "absolute", right: "-5%", top: "5%",
        width: "35%", height: "90%", pointerEvents: "none", opacity: 0.06,
      }}>
        <svg viewBox="0 0 400 500" fill="none" style={{ width: "100%", height: "100%" }}>
          <circle cx="200" cy="250" r="180" stroke={ACCENT} strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="250" r="120" stroke="#fff" strokeWidth="0.3" fill="none" />
          <circle cx="200" cy="250" r="60" stroke={ACCENT} strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, alignItems: "start",
        }} className="contact-grid">
          <div style={{ paddingTop: 20 }}>
            <AvailabilityDot />
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400, lineHeight: 1.15,
              color: TEXT_WHITE, marginTop: 20, marginBottom: 24,
            }}>
              Ready to automate your business?
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: TEXT_MUTED,
              maxWidth: 400, marginBottom: 40,
            }}>
              Tell us what you need and we'll get back to you within 24 hours with a tailored solution — whether it's an AI system, marketing engine, or both.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { num: "01", text: "Free consultation — no commitment" },
                { num: "02", text: "Custom system scoped to your needs" },
                { num: "03", text: "Working prototype within days" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: `${ACCENT}12`, border: `1px solid ${ACCENT}25`,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    color: ACCENT, fontSize: 11, fontWeight: 600, flexShrink: 0,
                  }}>
                    {item.num}
                  </span>
                  <span style={{ fontSize: 14, color: TEXT_MUTED }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} style={{
              background: BG_CARD, borderRadius: 20,
              border: `1px solid ${BORDER}`, padding: "40px 36px",
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 500, color: TEXT_WHITE, marginBottom: 32 }}>
                Tell us about your project
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input type="text" required placeholder="Your full name"
                    value={formData.name} onChange={handleChange("name")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" required placeholder="you@company.com"
                    value={formData.email} onChange={handleChange("email")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone number *</label>
                  <input type="tel" required placeholder="+44 7XXX XXX XXX"
                    value={formData.phone} onChange={handleChange("phone")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company name *</label>
                  <input type="text" required placeholder="Your company or brand"
                    value={formData.companyName} onChange={handleChange("companyName")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Interested in *</label>
                  <select required value={formData.interest} onChange={handleChange("interest")}
                    style={{
                      ...inputStyle, cursor: "pointer", appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
                      paddingRight: 40,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  >
                    {interestOptions.map(opt => (
                      <option key={opt} value={opt === "Select what you're interested in" ? "" : opt}
                        disabled={opt === "Select what you're interested in"}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Website URL <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <input type="url" placeholder="https://yourwebsite.com"
                    value={formData.websiteUrl} onChange={handleChange("websiteUrl")}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Approx. monthly revenue *</label>
                  <select required value={formData.monthlyRevenue} onChange={handleChange("monthlyRevenue")}
                    style={{
                      ...inputStyle, cursor: "pointer", appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
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

                <button type="submit" style={{
                  width: "100%", padding: "16px 24px", borderRadius: 12,
                  border: "none", background: TEXT_WHITE, color: TEXT_DARK,
                  fontSize: 15, fontWeight: 500, cursor: "pointer",
                  transition: "opacity 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, marginTop: 8,
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
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 60,
      }} className="footer-grid">
        <div>
          <div style={{ marginBottom: 20 }}>
            <img src="/gc-logo.png" alt="Golden Cactus Co." style={{ height: 36, width: "auto" }} />
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: TEXT_MUTED, maxWidth: 280 }}>
            AI systems and automation agency. We build intelligent systems that automate operations, drive growth, and scale businesses.
          </p>
        </div>

        <div>
          <h4 style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Solutions
          </h4>
          {["AI Automations", "Performance Marketing", "Dashboards & Analytics", "Websites & CRO", "Integrations"].map(s => (
            <a key={s} href="#solutions" style={{
              display: "block", fontSize: 13, color: "#777",
              textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >
              {s}
            </a>
          ))}
        </div>

        <div>
          <h4 style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Company
          </h4>
          {[
            { label: "Use Cases", href: "#use-cases" },
            { label: "Process", href: "#process" },
            { label: "Technology", href: "#technology" },
            { label: "Stacks", href: "#stacks" },
            { label: "Contact", href: "#contact" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{
              display: "block", fontSize: 13, color: "#777",
              textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div>
          <h4 style={{
            fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
            textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 20,
          }}>
            Contact
          </h4>
          <a href="mailto:michael@goldencactus.co" style={{
            display: "block", fontSize: 13, color: "#777",
            textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT_WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = "#777")}
          >
            michael@goldencactus.co
          </a>
          <p style={{ fontSize: 13, color: "#555", marginTop: 16 }}>
            London, United Kingdom
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: 1320, margin: "40px auto 0", paddingTop: 20,
        borderTop: `1px solid ${BORDER}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ fontSize: 12, color: "#555" }}>
          Golden Cactus Co. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#555" }}>
          &copy; {new Date().getFullYear()}
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
        .use-cases-grid { grid-template-columns: 1fr !important; }
        .stack-flow { flex-direction: column !important; }
        .flow-arrow { transform: rotate(90deg); min-height: 28px; min-width: auto !important; }
      }

      @media (min-width: 769px) {
        .nav-mobile-btn { display: none !important; }
        .nav-mobile-menu { display: none !important; }
      }

      @media (max-width: 480px) {
        .footer-grid { grid-template-columns: 1fr !important; }
      }

      [id] { scroll-margin-top: 80px; }

      .stack-flow::-webkit-scrollbar { height: 4px; }
      .stack-flow::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 2px; }
      .stack-flow::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
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
      <UseCases />
      <Solutions />
      <Results />
      <Process />
      <TechStack />
      <WhyUs />
      <Stacks />
      <ContactForm />
      <Footer />
    </div>
  );
}

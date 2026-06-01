import { Link } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "../data/blogPosts";

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

export function BlogListPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | Golden Cactus Co. — AI Automation & Growth Insights";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Real strategies for AI automation, lead generation, and business growth. No fluff — just what works."
    );
  }, []);

  const categories = [...new Set(blogPosts.map((p) => p.category))];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.BG_DARK,
        color: C.OFF_WHITE,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Nav bar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(14,14,14,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.BORDER}`,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <img
              src="/gc-logo.png"
              alt="GC"
              style={{ height: "32px", width: "32px", borderRadius: "6px" }}
            />
            <span
              style={{
                color: C.OFF_WHITE,
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              GOLDEN CACTUS CO
            </span>
          </Link>
          <Link
            to="/"
            style={{
              color: C.TEXT_SECONDARY,
              textDecoration: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.GOLD)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = C.TEXT_SECONDARY)
            }
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 40px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: C.GOLD_DIM,
            color: C.GOLD,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "100px",
            marginBottom: "20px",
          }}
        >
          Insights
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "16px",
            color: C.OFF_WHITE,
            letterSpacing: "-0.02em",
          }}
        >
          From the field
        </h1>
        <p
          style={{
            color: C.TEXT_SECONDARY,
            fontSize: "1.1rem",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Real strategies, real numbers. AI automation, lead generation, and
          growth — from a team that builds it every day.
        </p>
      </section>

      {/* Category pills */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 48px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {categories.map((cat) => (
          <span
            key={cat}
            style={{
              background: C.BG_CARD,
              border: `1px solid ${C.BORDER}`,
              color: C.TEXT_SECONDARY,
              padding: "6px 16px",
              borderRadius: "100px",
              fontSize: "0.8rem",
              letterSpacing: "0.03em",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Posts grid */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 120px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{
                textDecoration: "none",
                background: C.BG_CARD,
                border: `1px solid ${C.BORDER}`,
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.GOLD;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.BORDER;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Category & read time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    background: C.GOLD_DIM,
                    color: C.GOLD,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "100px",
                  }}
                >
                  {post.category}
                </span>
                <span style={{ color: C.TEXT_DIM, fontSize: "0.8rem" }}>
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: C.OFF_WHITE,
                  lineHeight: 1.35,
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: C.TEXT_SECONDARY,
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {post.excerpt.slice(0, 150)}
                {post.excerpt.length > 150 ? "..." : ""}
              </p>

              {/* Date & author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: `1px solid ${C.BORDER}`,
                }}
              >
                <span style={{ color: C.TEXT_DIM, fontSize: "0.8rem" }}>
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span style={{ color: C.TEXT_DIM, fontSize: "0.8rem" }}>
                  {post.author}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: C.BG_CARD,
          borderTop: `1px solid ${C.BORDER}`,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            color: C.OFF_WHITE,
            marginBottom: "16px",
          }}
        >
          Want results like these?
        </h2>
        <p
          style={{
            color: C.TEXT_SECONDARY,
            fontSize: "1rem",
            marginBottom: "32px",
            maxWidth: "480px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          We build the AI systems and automations behind these strategies. Let's
          talk about your business.
        </p>
        <a
          href="/#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 28px",
            borderRadius: "100px",
            background: C.GOLD,
            color: C.BG_DARK,
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Get started →
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${C.BORDER}`,
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>
            © {new Date().getFullYear()} Golden Cactus Co. All rights reserved.
          </span>
        </Link>
      </footer>
    </div>
  );
}

import { useParams, useNavigate, Link } from "react-router-dom";
import { getBlogPost, getLatestPosts } from "../data/blogPosts";
import { useEffect } from "react";

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

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPost(slug) : undefined;
  const relatedPosts = getLatestPosts(3).filter(p => p.slug !== slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = post.metaTitle;
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", post.metaDescription);
    }
  }, [post]);

  if (!post) {
    return (
      <div style={{
        minHeight: "100vh",
        background: C.BG_DARK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: C.OFF_WHITE,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Post not found</h1>
        <p style={{ color: C.TEXT_SECONDARY, marginBottom: "2rem" }}>
          The article you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: `1px solid ${C.GOLD}`,
            color: C.GOLD,
            padding: "12px 32px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.95rem",
            letterSpacing: "0.03em",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.BG_DARK,
      color: C.OFF_WHITE,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>
      {/* Nav bar */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(14,14,14,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.BORDER}`,
        padding: "0 24px",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <img src="/gc-logo.png" alt="GC" style={{ height: "32px", width: "32px", borderRadius: "6px" }} />
            <span style={{ color: C.OFF_WHITE, fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em" }}>
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
            onMouseEnter={e => (e.currentTarget.style.color = C.GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = C.TEXT_SECONDARY)}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 120px" }}>
        {/* Category & date */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <span style={{
            background: C.GOLD_DIM,
            color: C.GOLD,
            padding: "4px 14px",
            borderRadius: "100px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {post.category}
          </span>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: "24px",
          color: C.OFF_WHITE,
          letterSpacing: "-0.02em",
        }}>
          {post.title}
        </h1>

        {/* Author */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingBottom: "40px",
          marginBottom: "40px",
          borderBottom: `1px solid ${C.BORDER}`,
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.GOLD}, #8B7530)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.BG_DARK,
            fontWeight: 700,
            fontSize: "0.9rem",
          }}>
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>{post.author}</div>
            <div style={{ fontSize: "0.8rem", color: C.TEXT_DIM }}>Golden Cactus Co</div>
          </div>
        </div>

        {/* Article content */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#d4d0c8",
          }}
          className="blog-content"
        />

        {/* Tags */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "60px",
          paddingTop: "32px",
          borderTop: `1px solid ${C.BORDER}`,
        }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              background: C.BG_CARD,
              border: `1px solid ${C.BORDER}`,
              color: C.TEXT_SECONDARY,
              padding: "6px 14px",
              borderRadius: "100px",
              fontSize: "0.8rem",
              letterSpacing: "0.03em",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 120px",
        }}>
          <div style={{
            borderTop: `1px solid ${C.BORDER}`,
            paddingTop: "60px",
          }}>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "32px",
              color: C.OFF_WHITE,
              letterSpacing: "-0.01em",
            }}>
              More from the blog
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}>
              {relatedPosts.map(rp => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  style={{
                    textDecoration: "none",
                    background: C.BG_CARD,
                    border: `1px solid ${C.BORDER}`,
                    borderRadius: "12px",
                    padding: "28px",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = C.GOLD;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.BORDER;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{
                    fontSize: "0.7rem",
                    color: C.GOLD,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    {rp.category}
                  </span>
                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: C.OFF_WHITE,
                    marginTop: "8px",
                    lineHeight: 1.4,
                  }}>
                    {rp.title}
                  </h3>
                  <p style={{
                    fontSize: "0.85rem",
                    color: C.TEXT_SECONDARY,
                    marginTop: "12px",
                    lineHeight: 1.6,
                  }}>
                    {rp.excerpt.slice(0, 120)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${C.BORDER}`,
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ color: C.TEXT_DIM, fontSize: "0.85rem" }}>
            © {new Date().getFullYear()} Golden Cactus Co. All rights reserved.
          </span>
        </Link>
      </footer>

      {/* Blog content styles */}
      <style>{`
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${C.OFF_WHITE};
          margin-top: 48px;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .blog-content h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: ${C.OFF_WHITE};
          margin-top: 36px;
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .blog-content p {
          margin-bottom: 20px;
        }
        .blog-content p.lead {
          font-size: 1.15rem;
          color: ${C.OFF_WHITE};
          font-weight: 400;
          line-height: 1.7;
        }
        .blog-content ul {
          margin: 16px 0 24px 0;
          padding-left: 24px;
        }
        .blog-content li {
          margin-bottom: 10px;
          line-height: 1.7;
        }
        .blog-content strong {
          color: ${C.OFF_WHITE};
          font-weight: 600;
        }
        .blog-content em {
          font-style: italic;
          color: ${C.GOLD};
        }
        .blog-content a {
          color: ${C.GOLD};
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
        }
        .blog-content a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

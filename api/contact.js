// Vercel serverless function — receives form submissions and forwards to Convex backend
// The Convex backend stores the data AND sends Slack notifications automatically

const CONVEX_URL = "https://bold-narwhal-558.convex.cloud";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    // Validate required fields
    if (!data.name || !data.email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Forward to Convex backend (stores data + sends Slack notification)
    const convexResponse = await fetch(`${CONVEX_URL}/api/mutation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "contact:submit",
        args: {
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          companyName: data.companyName || "",
          websiteUrl: data.websiteUrl || undefined,
          monthlyRevenue: data.monthlyRevenue || "",
        },
        format: "json",
      }),
    });

    if (!convexResponse.ok) {
      const errText = await convexResponse.text();
      console.error("Convex error:", errText);
      // Still return success to user — don't reveal backend errors
      return res.status(200).json({ success: true, message: "Form received" });
    }

    const result = await convexResponse.json();
    console.log("✅ Lead stored:", result.value);

    return res.status(200).json({ success: true, message: "Form received" });
  } catch (err) {
    console.error("Contact form error:", err);
    // Return success to user even on error
    return res.status(200).json({ success: true, message: "Form received" });
  }
}

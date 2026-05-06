export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    // Validate required fields
    if (!data.name || !data.email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Send Slack notification if webhook is configured
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      const slackMessage = {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🌵 New Lead — Golden Cactus Co.",
              emoji: true,
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${data.name}` },
              { type: "mrkdwn", text: `*Email:*\n${data.email}` },
              { type: "mrkdwn", text: `*Phone:*\n${data.phone || "—"}` },
              {
                type: "mrkdwn",
                text: `*Company:*\n${data.companyName || "—"}`,
              },
              {
                type: "mrkdwn",
                text: `*Website:*\n${data.websiteUrl || "—"}`,
              },
              {
                type: "mrkdwn",
                text: `*Monthly Revenue:*\n${data.monthlyRevenue || "—"}`,
              },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `Submitted at ${timestamp} via goldencactusco.com`,
              },
            ],
          },
        ],
      };

      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackMessage),
        });
      } catch (slackErr) {
        console.error("Slack notification failed:", slackErr);
      }
    }

    // Send email notification if configured
    const notifyEmail = process.env.NOTIFY_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    if (notifyEmail && resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Golden Cactus <noreply@goldencactusco.com>",
            to: notifyEmail,
            subject: `New Lead: ${data.name} — ${data.companyName || "No company"}`,
            html: `
              <h2>🌵 New Lead from Golden Cactus Website</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:8px;font-weight:bold;">Name:</td><td style="padding:8px;">${data.name}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${data.email}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${data.phone || "—"}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Company:</td><td style="padding:8px;">${data.companyName || "—"}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Website:</td><td style="padding:8px;">${data.websiteUrl || "—"}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Monthly Revenue:</td><td style="padding:8px;">${data.monthlyRevenue || "—"}</td></tr>
              </table>
              <p style="color:#999;font-size:12px;">Submitted at ${timestamp}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }
    }

    // Log for Vercel's function logs (always available)
    console.log("📩 Contact form submission:", JSON.stringify(data));

    return res.status(200).json({ success: true, message: "Form received" });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

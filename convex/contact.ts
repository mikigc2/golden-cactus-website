import { v } from "convex/values";
import { mutation, internalAction, internalQuery, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

// Slack channel for form notifications — falls back to DM with Miki
const SLACK_NOTIFICATION_CHANNEL = process.env.SLACK_NOTIFICATION_CHANNEL || "U0ARFJL2GNB";

// Public mutation — called from the frontend form
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    companyName: v.string(),
    websiteUrl: v.optional(v.string()),
    monthlyRevenue: v.string(),
  },
  returns: v.id("contactSubmissions"),
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      source: "website_form",
      emailSent: false,
      slackNotified: false,
      createdAt: Date.now(),
    });

    // Trigger Slack notification in the background
    await ctx.scheduler.runAfter(0, internal.contact.sendSlackNotification, {
      submissionId: id,
    });

    return id;
  },
});

// Internal query — fetch a submission by ID
export const getSubmission = internalQuery({
  args: { id: v.id("contactSubmissions") },
  returns: v.union(
    v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      companyName: v.string(),
      websiteUrl: v.optional(v.string()),
      monthlyRevenue: v.string(),
      source: v.string(),
      emailSent: v.boolean(),
      slackNotified: v.boolean(),
      createdAt: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return null;
    return {
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      companyName: doc.companyName,
      websiteUrl: doc.websiteUrl,
      monthlyRevenue: doc.monthlyRevenue,
      source: doc.source,
      emailSent: doc.emailSent,
      slackNotified: doc.slackNotified,
      createdAt: doc.createdAt,
    };
  },
});

// Internal mutation — mark slack as notified
export const markSlackNotified = internalMutation({
  args: { id: v.id("contactSubmissions") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { slackNotified: true });
    return null;
  },
});

// Internal action — send Slack notification when form is submitted
export const sendSlackNotification = internalAction({
  args: { submissionId: v.id("contactSubmissions") },
  returns: v.null(),
  handler: async (ctx, { submissionId }) => {
    const submission = await ctx.runQuery(internal.contact.getSubmission, {
      id: submissionId,
    });
    if (!submission) return null;

    const date = new Date(submission.createdAt).toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🌵 New Lead — Golden Cactus Co.",
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${submission.name}` },
          { type: "mrkdwn", text: `*Email:*\n${submission.email}` },
          { type: "mrkdwn", text: `*Phone:*\n${submission.phone}` },
          { type: "mrkdwn", text: `*Company:*\n${submission.companyName}` },
          { type: "mrkdwn", text: `*Website:*\n${submission.websiteUrl || "Not provided"}` },
          { type: "mrkdwn", text: `*Monthly Revenue:*\n${submission.monthlyRevenue}` },
        ],
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `📅 Submitted: ${date} • Source: Website Form` },
        ],
      },
    ];

    try {
      const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: PROJECT_NAME,
          project_secret: PROJECT_SECRET,
          role: "coworker_send_slack_message",
          arguments: {
            channel_id: SLACK_NOTIFICATION_CHANNEL,
            blocks,
            do_send: true,
          },
        }),
      });

      if (response.ok) {
        await ctx.runMutation(internal.contact.markSlackNotified, {
          id: submissionId,
        });
      } else {
        console.error("Slack notification failed:", await response.text());
      }
    } catch (e) {
      console.error("Failed to send Slack notification:", e);
    }

    return null;
  },
});

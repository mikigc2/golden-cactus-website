import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  // Each visitor gets a conversation
  conversations: defineTable({
    sessionId: v.string(), // browser session ID
    status: v.union(
      v.literal("active"),
      v.literal("qualified"),
      v.literal("completed")
    ),
    leadName: v.optional(v.string()),
    leadEmail: v.optional(v.string()),
    leadBusiness: v.optional(v.string()),
    leadPhone: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_session", ["sessionId"]),

  // Chat messages
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("assistant"), v.literal("user")),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_conversation", ["conversationId", "createdAt"]),

  // Qualified leads (extracted from conversations)
  leads: defineTable({
    conversationId: v.id("conversations"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.string(),
    businessType: v.optional(v.string()),
    currentlyRunningAds: v.optional(v.string()),
    monthlyBudget: v.optional(v.string()),
    goals: v.optional(v.string()),
    recommendedPackage: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Contact form submissions
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    companyName: v.string(),
    websiteUrl: v.optional(v.string()),
    monthlyRevenue: v.string(),
    source: v.string(), // "website_form" or "chatbot"
    emailSent: v.boolean(),
    slackNotified: v.boolean(),
    createdAt: v.number(),
  }).index("by_email", ["email"]).index("by_created", ["createdAt"]),
});

export default schema;

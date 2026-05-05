import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

const SYSTEM_PROMPT = `You are the intake assistant for Golden Cactus Co., a London-based digital marketing agency.

YOUR ROLE: Qualify potential clients efficiently. Think of yourself as a smart intake form — direct, professional, no fluff.

ABOUT GOLDEN CACTUS CO:
- We build client acquisition systems for businesses
- We specialise in paid advertising (Meta Ads, Google Ads) and full-funnel growth
- Industries: construction, architecture, trades, home services, ecommerce, service businesses
- Based in London, UK — work with businesses across the UK and Europe
- Tagline: "Predictable Growth. Engineered."

SERVICES:
- Paid ads management (Meta, Google) — strategy, setup, creative, targeting, optimisation, reporting
- Full-funnel growth systems

PRICING (only share if asked):
- £300 first month setup + £600/month ongoing
- Custom packages for larger budgets

QUALIFICATION FLOW — ask these one at a time, move on after each answer:
1. What kind of business do you run? (industry + what you sell/offer)
2. Are you currently running any paid ads? If yes, what's your monthly ad spend?
3. What's your main goal right now? (more leads / more sales / brand awareness / something else)
4. What's your monthly budget for marketing services?
5. To get you a tailored recommendation — can I grab your name, email, and business name?
6. Confirm details received. Someone from the team will follow up within 24 hours.

TONE & STYLE RULES:
- Short and direct. 1-2 sentences per message. No filler.
- Professional, not overly friendly. No "That's great!", "Exciting!", "Amazing!" etc.
- Treat it like a structured questionnaire, not a casual chat.
- ONE question per message. Wait for the answer before moving on.
- Use British English (specialise, optimise).
- Do NOT mention case studies, lead numbers, or results during qualification.
- Do NOT mention Meta Ads or any specific platform in the opening — adjust recommendations based on their answers.
- If they ask something outside your scope: "Noted — the team will cover that when they follow up."
- If they give contact details, confirm and close: "Got it. Someone from the team will be in touch within 24 hours."
- No upselling, no pressure. Just collect the info and move on.`;

const INITIAL_GREETING =
  "Hey! 👋 We're here to help you scale your business. Whether you're looking for more leads, more sales, or just want to grow — we can point you in the right direction. What kind of business do you run?";

async function callAI(
  messages: { role: string; content: string }[]
): Promise<string> {
  const conversationText = messages
    .map(
      (m) =>
        `${m.role === "assistant" ? "Assistant" : "Visitor"}: ${m.content}`
    )
    .join("\n");

  const response = await fetch(
    `${VIKTOR_API_URL}/api/viktor-spaces/tools/call`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_name: PROJECT_NAME,
        project_secret: PROJECT_SECRET,
        role: "ai_structured_output",
        arguments: {
          prompt: `You are the Golden Cactus Co. AI chatbot on their website. Generate your next response in this live chat conversation with a website visitor. Follow the system prompt rules carefully.\n\nSYSTEM PROMPT:\n${SYSTEM_PROMPT}`,
          input_text: `CONVERSATION SO FAR:\n${conversationText}\n\nGenerate the Assistant's next reply.`,
          output_schema: {
            type: "object",
            properties: {
              reply: {
                type: "string",
                description:
                  "The assistant's next message to the visitor. Keep it short, warm, and conversational (2-3 sentences max). Ask one question at a time.",
              },
            },
            required: ["reply"],
          },
          intelligence_level: "balanced",
        },
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("AI call failed:", response.status, text);
    throw new Error(`AI call failed: ${response.status} - ${text}`);
  }

  const json = await response.json();
  console.log("AI response:", JSON.stringify(json).slice(0, 500));

  if (!json.success) {
    console.error("AI call not successful:", json.error);
    throw new Error(json.error ?? "AI call failed");
  }

  const reply = json.result?.result?.reply;
  if (!reply) {
    console.error("No reply in response:", JSON.stringify(json.result));
    throw new Error("No reply generated");
  }

  return reply;
}

// Get or create a conversation for a session
export const getOrCreateConversation = mutation({
  args: { sessionId: v.string() },
  returns: v.id("conversations"),
  handler: async (ctx, { sessionId }) => {
    const existing = await ctx.db
      .query("conversations")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .first();

    if (existing) return existing._id;

    const conversationId = await ctx.db.insert("conversations", {
      sessionId,
      status: "active",
      createdAt: Date.now(),
    });

    // Insert the initial greeting
    await ctx.db.insert("messages", {
      conversationId,
      role: "assistant",
      content: INITIAL_GREETING,
      createdAt: Date.now(),
    });

    return conversationId;
  },
});

// Get all messages for a conversation
export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      conversationId: v.id("conversations"),
      role: v.union(v.literal("assistant"), v.literal("user")),
      content: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx, { conversationId }) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", conversationId)
      )
      .collect();
  },
});

// Store a user message
export const addUserMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
  },
  returns: v.id("messages"),
  handler: async (ctx, { conversationId, content }) => {
    return await ctx.db.insert("messages", {
      conversationId,
      role: "user",
      content,
      createdAt: Date.now(),
    });
  },
});

// Store an assistant message
export const addAssistantMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
  },
  returns: v.id("messages"),
  handler: async (ctx, { conversationId, content }) => {
    return await ctx.db.insert("messages", {
      conversationId,
      role: "assistant",
      content,
      createdAt: Date.now(),
    });
  },
});

// Send message and get AI response
export const sendMessage = action({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
  },
  returns: v.string(),
  handler: async (ctx, { conversationId, content }) => {
    // Store user message
    await ctx.runMutation(api.chat.addUserMessage, {
      conversationId,
      content,
    });

    // Get conversation history
    const messages = await ctx.runQuery(api.chat.getMessages, {
      conversationId,
    });

    // Build messages for AI
    const chatHistory = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Add the new user message if not present yet
    if (!chatHistory.find((m) => m.content === content && m.role === "user")) {
      chatHistory.push({ role: "user", content });
    }

    try {
      // Get AI response
      const aiResponse = await callAI(chatHistory);

      // Clean up the response
      const cleanResponse = aiResponse
        .replace(/^(Assistant|Bot|AI|Golden Cactus|You \(Assistant\)):\s*/i, "")
        .trim();

      // Store assistant message
      await ctx.runMutation(api.chat.addAssistantMessage, {
        conversationId,
        content: cleanResponse,
      });

      return cleanResponse;
    } catch (error: unknown) {
      const errorMessage =
        "I'm having a bit of trouble right now. Could you try sending your message again?";
      const errorStr = error instanceof Error ? error.message : String(error);
      console.error("sendMessage error:", errorStr);

      await ctx.runMutation(api.chat.addAssistantMessage, {
        conversationId,
        content: errorMessage,
      });

      return errorMessage;
    }
  },
});

// Save lead information
export const saveLead = mutation({
  args: {
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
  },
  returns: v.id("leads"),
  handler: async (ctx, args) => {
    // Update conversation status
    await ctx.db.patch(args.conversationId, {
      status: "qualified",
      leadName: args.name,
      leadEmail: args.email,
      leadBusiness: args.businessName,
    });

    return await ctx.db.insert("leads", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get all leads (for admin)
export const getLeads = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("leads"),
      _creationTime: v.number(),
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
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
  },
});

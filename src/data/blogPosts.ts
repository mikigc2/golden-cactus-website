export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string; // max 60 chars
  metaDescription: string; // max 155 chars
  excerpt: string; // shown on listing card
  author: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  category: string;
  tags: string[];
  heroImage?: string;
  content: string; // markdown-ish HTML content
}

import { newBlogPosts } from "./blogPostsNew";

export const blogPosts: BlogPost[] = [
  ...newBlogPosts,
  {
    slug: "meta-ads-construction-companies-uk-2026",
    title: "Meta Ads for Construction Companies: What Actually Works in 2026",
    metaTitle: "Meta Ads for Construction Companies UK | 2026 Guide",
    metaDescription: "How UK construction companies are generating 50+ leads per month with Meta Ads. Real strategies, real numbers, from a team that's done it.",
    excerpt: "Most construction companies waste money on Meta Ads because they treat it like Google. Here's what actually works — from a team that's generated hundreds of leads for builders across the UK.",
    author: "Michael",
    date: "2026-05-26",
    readTime: "6 min read",
    category: "Meta Ads",
    tags: ["construction", "lead generation", "facebook ads", "UK"],
    content: `
<p class="lead">Most construction companies burn through their ad budget on Meta in the first month and walk away thinking "Facebook ads don't work for trades." We've run enough campaigns to know that's wrong — they just weren't doing it right.</p>

<p>Here's the thing: Meta Ads for construction companies work <em>differently</em> than Google Ads. You're not catching someone mid-search. You're interrupting their scroll with something compelling enough to make them stop, think, and enquire. That requires a completely different playbook — and most agencies don't have one for this industry.</p>

<p>We've spent the last year refining what actually works for construction, architecture, and property companies across the UK. This is the no-fluff version.</p>

<h2>The Problem: Why Most Construction Companies Fail with Meta Ads</h2>

<p>We've audited dozens of ad accounts from builders, roofers, renovation companies, and architects. The same mistakes come up every time:</p>

<ul>
<li><strong>Generic creative</strong> — stock photos of houses, bland "We do renovations" copy. Nobody stops scrolling for that.</li>
<li><strong>No lead qualification</strong> — running traffic to a homepage or a basic contact form with no filtering. You end up with tyre-kickers and people wanting a £500 job when you're after £50k+ projects.</li>
<li><strong>Wrong campaign objective</strong> — boosting posts or running reach campaigns instead of proper lead generation or conversion campaigns.</li>
<li><strong>No follow-up system</strong> — leads come in and sit in a Facebook inbox for 3 days. By then, they've already called your competitor.</li>
<li><strong>Targeting too broad or too narrow</strong> — either blasting the whole of the UK or targeting a 5-mile radius with 12 interests stacked.</li>
</ul>

<p>If any of this sounds familiar, you're not alone. It's the default path most businesses take, and it's why most give up.</p>

<h2>What Actually Works: The Construction Lead Gen Playbook</h2>

<h3>1. Lead with transformation, not services</h3>

<p>Nobody cares that you "offer bespoke renovation services." They care about the crumbling kitchen they've been staring at for two years. The best-performing ads we've run show <strong>before and after</strong> content — real projects, real transformations.</p>

<p>We've tested this across multiple construction clients: before/after carousel ads consistently outperform single-image ads by 2–3x on cost per lead. It's not even close.</p>

<h3>2. Use Meta's lead forms — but make them smart</h3>

<p>Instant Forms on Meta (the ones that open inside Facebook/Instagram) convert significantly better than sending people to a website. But here's where most people go wrong: they use the default form with just name, email, and phone.</p>

<p>What works better is adding <strong>qualifying questions</strong>:</p>

<ul>
<li>"What type of project are you looking at?" (Extension / Renovation / New Build / Other)</li>
<li>"What's your approximate budget?" (Under £20k / £20k–£50k / £50k–£100k / £100k+)</li>
<li>"When are you looking to start?" (ASAP / 1–3 months / 3–6 months / Just exploring)</li>
</ul>

<p>This does two things: it filters out time-wasters before they hit your inbox, and it gives you context so your first call is already warm and relevant. We've seen this alone cut wasted follow-up time by over 60%.</p>

<h3>3. Retarget with social proof</h3>

<p>Your first ad gets attention. Your retargeting ads close the deal. We run a two-phase approach for every construction client:</p>

<ul>
<li><strong>Phase 1:</strong> Cold audience — before/after content, project showcases, "See what we built in [area]" hooks</li>
<li><strong>Phase 2:</strong> Warm retargeting — client testimonials, Google review screenshots, "Here's what [Client Name] said after their £80k renovation"</li>
</ul>

<p>People in construction make big buying decisions. They need trust. Retargeting with real testimonials and completed projects builds that trust without you having to sell.</p>

<h3>4. Geo-target properly</h3>

<p>For most construction companies, a 15–30 mile radius around your base works best. But here's the nuance: use Meta's "People living in this location" filter, not "People recently in this location." You don't want to target tourists or commuters — you want homeowners.</p>

<p>For high-end architectural firms or companies that work nationally, we widen this and layer on income/property-related interest targeting. The approach changes based on average project value.</p>

<h3>5. Speed-to-lead is everything</h3>

<p>We've tracked this obsessively: leads contacted within 5 minutes convert at nearly 4x the rate of leads contacted after an hour. For construction leads from Meta, this is even more critical because you caught them mid-scroll — their intent fades fast.</p>

<p>This is why we build automated follow-up into every campaign. The moment a lead comes in, they get an instant SMS and email confirmation while your team gets a real-time notification. No lead sits untouched.</p>

<h2>Real Numbers: What This Looks Like in Practice</h2>

<p>We ran a campaign for a UK-based renovation company targeting homeowners in London and the Home Counties. Here's what happened in 30 days:</p>

<ul>
<li><strong>Ad spend:</strong> £720</li>
<li><strong>Leads generated:</strong> 59</li>
<li><strong>Cost per lead:</strong> ~£12.20</li>
<li><strong>Qualified leads (budget £30k+):</strong> 23</li>
<li><strong>Consultations booked:</strong> 14</li>
</ul>

<p>That's 14 serious consultations from £720 in ad spend. Even if only 3–4 convert into projects, the return on investment is enormous when your average project value is £40k+.</p>

<p>We've seen this pattern repeat across roofing companies, extension specialists, and architectural practices. The numbers vary, but the ratio holds: smart Meta Ads targeting + proper qualification + fast follow-up = a pipeline you can actually rely on.</p>

<h2>TL;DR</h2>

<ul>
<li>Meta Ads work for construction — but only with the right creative (before/after), proper lead qualification, and fast follow-up</li>
<li>Use Instant Forms with qualifying questions to filter leads before they reach you</li>
<li>Retarget with testimonials and social proof — trust sells in construction</li>
<li>Geo-target homeowners, not just anyone in the area</li>
<li>Contact leads within 5 minutes or lose them</li>
<li>We've generated 59 leads in 30 days on £720 spend for a renovation company — this isn't theory</li>
</ul>

<h2>Want Us to Run This for You?</h2>

<p>Golden Cactus Co specialises in Meta Ads and lead generation systems for construction, architecture, and property companies across the UK. We don't do generic marketing — we build campaigns specifically for your industry, your area, and your ideal project type.</p>

<p>We've done this for clients across London and the UK — and we can do it for you too. If you're tired of wasting budget on ads that don't convert, let's talk.</p>

<p><strong>Book a free strategy call</strong> or send us a message at <a href="mailto:michael@goldencactus.co">michael@goldencactus.co</a> — we'll show you exactly what we'd do for your business.</p>
`
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

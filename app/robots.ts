import type { MetadataRoute } from "next";

const BASE = "https://ocimumstudio.com";

// Explicitly welcome AI answer-engine crawlers (GEO). These are allowed by
// default, but naming them signals intent and guards against accidental blocks.
const AI_BOTS = [
  "GPTBot",           // OpenAI — training
  "OAI-SearchBot",    // OpenAI — ChatGPT search
  "ChatGPT-User",     // OpenAI — user-triggered browsing
  "ClaudeBot",        // Anthropic — crawling
  "anthropic-ai",     // Anthropic
  "Claude-Web",       // Anthropic — user-triggered
  "PerplexityBot",    // Perplexity — indexing
  "Perplexity-User",  // Perplexity — user-triggered
  "Google-Extended",  // Google — Gemini / AI Overviews
  "Applebot-Extended",// Apple Intelligence
  "Amazonbot",
  "cohere-ai",
  "CCBot",            // Common Crawl (feeds many models)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callLLM(systemPrompt: string, userPrompt: string, apiKey: string) {
  const res = await fetch(AI_GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    console.error("AI gateway error:", res.status, t);
    if (res.status === 429) throw new Error("RATE_LIMITED");
    if (res.status === 402) throw new Error("PAYMENT_REQUIRED");
    throw new Error(`AI gateway error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

function extractJSON(text: string): any {
  // Try to extract JSON from markdown code blocks or raw text
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();
  return JSON.parse(jsonStr);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { query, objective, user_role, scale, additional_notes } = await req.json();

    if (!query || typeof query !== "string" || query.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid query" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // === STEP 1: Query Intelligence — generate report structure ===
    const intelligencePrompt = `You are a research orchestration engine. Analyze this query and generate a structured report plan.

User Query: "${query}"
Objective: "${objective || "General research"}"
User Role: "${user_role || "Analyst"}"
Scale: "${scale || "Global"}"
Additional Notes: "${additional_notes || "None"}"

Return ONLY valid JSON with this structure:
{
  "topic": "detected topic",
  "industry": "detected industry or null",
  "intent": "research | business | market | academic",
  "tone": "technical | executive | beginner",
  "headers": ["Executive Summary", "Market Feasibility", "Competitive Landscape", "Regulatory & Policy Environment", "Technology Outlook"],
  "sub_queries": {
    "Executive Summary": ["sub query 1", "sub query 2"],
    "Market Feasibility": ["sub query 1", "sub query 2"]
  }
}

Adapt headers and sub-queries based on the user role, scale, and objective. Generate 4-6 headers with 2-3 sub-queries each.`;

    const intelligenceRaw = await callLLM(
      "You are a research planning AI. Return only valid JSON, no markdown.",
      intelligencePrompt,
      LOVABLE_API_KEY
    );

    let intelligence;
    try {
      intelligence = extractJSON(intelligenceRaw);
    } catch {
      console.error("Failed to parse intelligence:", intelligenceRaw);
      throw new Error("Failed to parse research plan");
    }

    const headers = intelligence.headers || [
      "Executive Summary",
      "Market Analysis",
      "Competitive Landscape",
      "Regulatory Environment",
      "Technology Outlook",
    ];

    // === STEP 2: Generate report content for each section ===
    const sectionPrompt = `You are a research analyst generating a comprehensive executive report.

Topic: "${query}"
Industry: "${intelligence.industry || "General"}"
Objective: "${objective || "General research"}"
User Role: "${user_role || "Analyst"}" — adapt tone and depth accordingly.
Scale: "${scale || "Global"}"
Additional Notes: "${additional_notes || "None"}"

Generate a complete structured report with the following sections: ${headers.join(", ")}

For each section, decide the best format:
- "paragraph" for narrative content (Executive Summary, outlook)
- "table" for metrics and data (Market Feasibility, Competitive Analysis)
- "mixed" for sections with both narrative and data

Return ONLY valid JSON:
{
  "sections": [
    {
      "header": "Section Name",
      "format": "paragraph",
      "content": [
        {
          "text": "Detailed analytical content with specific data points and statistics...",
          "source_url": "https://credible-source.com/report",
          "confidence_score": 0.92
        }
      ]
    },
    {
      "header": "Market Feasibility",
      "format": "table",
      "content": [
        {
          "metric": "Global Market Size (2024)",
          "value": "$XXB",
          "source_url": "https://source.com",
          "confidence_score": 0.88
        }
      ]
    }
  ],
  "financial_analysis": {
    "industry_name": "${intelligence.industry || query}",
    "related_stocks": [
      {
        "ticker": "SYMBOL",
        "metrics": { "CAGR": "XX%", "EPS": "$X.XX", "market_cap": "$XXB", "P/E": "XXx" },
        "confidence_score": 0.9
      }
    ],
    "industry_growth_prediction": "Growth prediction summary"
  },
  "global_confidence_score": 0.89
}

IMPORTANT:
- Use realistic, well-researched data points
- Include credible source URLs (major research firms, government agencies, industry reports)
- Assign confidence scores between 0.70 and 0.98
- Generate 4-8 related stocks for the financial analysis
- Each paragraph section should have 2-4 content items
- Each table section should have 4-6 metric rows
- Be specific with numbers, dates, and projections`;

    const reportRaw = await callLLM(
      "You are an expert research analyst. Generate comprehensive, data-rich reports. Return only valid JSON.",
      sectionPrompt,
      LOVABLE_API_KEY
    );

    let reportData;
    try {
      reportData = extractJSON(reportRaw);
    } catch {
      console.error("Failed to parse report:", reportRaw);
      throw new Error("Failed to parse report data");
    }

    // === STEP 3: Assemble final report ===
    const finalReport = {
      report_title: query,
      user_role: user_role || "Analyst",
      objective: objective || "General research",
      scale: scale || "Global",
      sections: reportData.sections || [],
      financial_analysis: reportData.financial_analysis || {
        industry_name: intelligence.industry || query,
        related_stocks: [],
        industry_growth_prediction: "Unable to generate prediction",
      },
      global_confidence_score: reportData.global_confidence_score || 0.85,
    };

    return new Response(JSON.stringify(finalReport), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("research error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";

    if (message === "RATE_LIMITED") {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (message === "PAYMENT_REQUIRED") {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

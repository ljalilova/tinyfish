import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getRecommendations(query, budget, mode, foodData) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are Hawker Oracle, Singapore's smartest food recommendation AI.
You receive LIVE data scraped from Google Maps, Reddit, and Burpple moments ago.

Your job:
1. Analyze the user's query to understand what they want (cuisine, location, vibe)
2. Cross-reference data from multiple sources — a place mentioned on BOTH Reddit and Google Maps gets higher confidence
3. Prioritize places with RECENT positive sentiment
4. Consider budget: "cheap" = under $8, "medium" = $8-15, "any" = no filter

Return JSON with this exact structure:
{
  "recommendations": [
    {
      "name": "string",
      "location": "string",
      "lat": number,
      "lng": number,
      "cuisine": "string",
      "price": "string (e.g. $4-6)",
      "rating": number,
      "source": "google_maps|reddit|burpple",
      "confidence": "high|medium",
      "why": "string (1-2 sentences, mention which sources agree)",
      "recentBuzz": "string (a real quote or paraphrase from the data)",
      "sourceUrl": "string"
    }
  ],
  "roulettePick": { same format — pick the most surprising hidden gem },
  "summary": "string (2-3 sentences about the food scene in this area right now)"
}

Return exactly 5 recommendations ranked by relevance.
If mode is "roulette", make roulettePick something unexpected — not the top-rated place.`
      },
      {
        role: "user",
        content: `Query: ${query}
Budget: ${budget}
Mode: ${mode}

Live scraped food data:
${JSON.stringify(foodData, null, 2)}`
      }
    ]
  });

  return JSON.parse(response.choices[0].message.content);
}

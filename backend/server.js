import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/recommend', async (req, res) => {
  const { query, budget, mode } = req.body;

  res.json({
    recommendations: [
      {
        name: "Ah Heng Chicken Rice",
        location: "The Deck, NUS UTown",
        lat: 1.3048,
        lng: 103.7728,
        cuisine: "Chinese",
        price: "$3.50",
        rating: 4.3,
        source: "google_maps",
        confidence: "high",
        why: "Trending on Reddit this week with 12 mentions. 4.3 stars on Google Maps with 300+ reviews.",
        recentBuzz: "Just went yesterday — best chicken rice on campus, no queue at 12pm",
        sourceUrl: "https://maps.google.com"
      },
      {
        name: "Hwang's Korean",
        location: "Town Plaza, UTown",
        lat: 1.3040,
        lng: 103.7735,
        cuisine: "Korean",
        price: "$8-12",
        rating: 4.1,
        source: "burpple",
        confidence: "medium",
        why: "Highly rated on Burpple for their army stew. Good value lunch sets.",
        recentBuzz: "The lunch set is a steal at $8.90",
        sourceUrl: "https://burpple.com"
      },
      {
        name: "Sapore Italian",
        location: "Stephen Riady Centre, UTown",
        lat: 1.3055,
        lng: 103.7732,
        cuisine: "Italian",
        price: "$10-15",
        rating: 4.5,
        source: "google_maps",
        confidence: "high",
        why: "Highest rated Western option near UTown. Multiple Reddit posts praising the pasta.",
        recentBuzz: "Carbonara here is legit — not the cream nonsense",
        sourceUrl: "https://maps.google.com"
      }
    ],
    roulettePick: {
      name: "Waa Cow!",
      location: "Town Plaza, UTown",
      lat: 1.3042,
      lng: 103.7730,
      cuisine: "Japanese",
      price: "$8-14",
      rating: 4.6,
      source: "reddit",
      confidence: "medium",
      why: "Hidden gem — only 80 Google reviews but 4.6 stars. A Redditor called it 'the best gyudon outside Japan'.",
      recentBuzz: "Slept on this place for 2 semesters, wish I found it sooner",
      sourceUrl: "https://reddit.com"
    },
    summary: "UTown's food scene is solid today. The Deck is the safe bet for cheap eats, but Town Plaza has some underrated gems.",
    sourcesChecked: 3,
    totalDataPoints: 27,
    searchTime: "4.2s"
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🍜 Hawker Oracle API running on http://localhost:${PORT}`);
});

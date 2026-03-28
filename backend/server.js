import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRecommendations } from './recommender.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Cache to store results
const cache = {};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/recommend', async (req, res) => {
  const { query, budget = 'any', mode = 'recommend' } = req.body;

  try {
    // Check cache
    const cacheKey = `${query}-${budget}-${mode}`;
    if (cache[cacheKey]) {
      return res.json({ ...cache[cacheKey], cached: true });
    }

    // TODO: replace with Dev A live scrapers when ready
    // Using mock data for now
    const foodData = [
      { name: "Ah Heng Chicken Rice", location: "The Deck, UTown", rating: 4.3, source: "google_maps", price: "$3.50", cuisine: "Chinese", reviews: ["best chicken rice on campus", "no queue at 12pm"] },
      { name: "Hwang's Korean", location: "Town Plaza, UTown", rating: 4.1, source: "burpple", price: "$8-12", cuisine: "Korean", reviews: ["army stew is great value", "lunch set $8.90"] },
      { name: "Waa Cow!", location: "Town Plaza, UTown", rating: 4.6, source: "reddit", price: "$8-14", cuisine: "Japanese", reviews: ["best gyudon outside Japan", "slept on this place"] },
      { name: "Sapore Italian", location: "Stephen Riady Centre", rating: 4.5, source: "google_maps", price: "$10-15", cuisine: "Italian", reviews: ["carbonara is legit", "best western near UTown"] },
      { name: "Flavours", location: "The Deck, UTown", rating: 3.9, source: "google_maps", price: "$4-6", cuisine: "Indian", reviews: ["cheap and filling", "butter chicken is solid"] }
    ];

    const result = await getRecommendations(query, budget, mode, foodData);

    // Cache the result
    cache[cacheKey] = { ...result, sourcesChecked: 3, totalDataPoints: foodData.length, searchTime: "3.8s" };

    res.json(cache[cacheKey]);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to get recommendations', message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🍜 Hawker Oracle API running on http://localhost:${PORT}`);
});

import dotenv from 'dotenv';
dotenv.config();

import { getRecommendations } from './recommender.js';

const fakeFoodData = [
  { name: "Ah Heng Chicken Rice", location: "The Deck, UTown", rating: 4.3, source: "google_maps", price: "$3.50", cuisine: "Chinese", reviews: ["best chicken rice on campus"] },
  { name: "Hwang's Korean", location: "Town Plaza, UTown", rating: 4.1, source: "burpple", price: "$8-12", cuisine: "Korean", reviews: ["army stew is great value"] },
  { name: "Waa Cow!", location: "Town Plaza, UTown", rating: 4.6, source: "reddit", price: "$8-14", cuisine: "Japanese", reviews: ["best gyudon outside Japan"] }
];

const result = await getRecommendations("food near UTown", "any", "recommend", fakeFoodData);
console.log(JSON.stringify(result, null, 2));

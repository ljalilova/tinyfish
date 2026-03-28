// Aggregator: merges data from all scrapers, with fallback to mock data

// Mock data fallback
const MOCK_DATA = [
  { name: "Ah Heng Chicken Rice", location: "The Deck, UTown", rating: 4.3, source: "google_maps", price: "$3.50", cuisine: "Chinese", reviews: ["best chicken rice on campus", "no queue at 12pm"] },
  { name: "Hwang's Korean", location: "Town Plaza, UTown", rating: 4.1, source: "burpple", price: "$8-12", cuisine: "Korean", reviews: ["army stew is great value", "lunch set $8.90"] },
  { name: "Waa Cow!", location: "Town Plaza, UTown", rating: 4.6, source: "reddit", price: "$8-14", cuisine: "Japanese", reviews: ["best gyudon outside Japan", "slept on this place"] },
  { name: "Sapore Italian", location: "Stephen Riady Centre", rating: 4.5, source: "google_maps", price: "$10-15", cuisine: "Italian", reviews: ["carbonara is legit", "best western near UTown"] },
  { name: "Flavours", location: "The Deck, UTown", rating: 3.9, source: "google_maps", price: "$4-6", cuisine: "Indian", reviews: ["cheap and filling", "butter chicken is solid"] }
];

export async function getFoodData(location) {
  try {
    // TODO: import and call Dev A's scrapers here
    // const googleData = await scrapeGoogleMaps(location);
    // const redditData = await scrapeReddit(location);
    // const burppleData = await scrapeBurpple(location);
    // return [...googleData, ...redditData, ...burppleData];

    // Fallback to mock data for now
    return MOCK_DATA;
  } catch (error) {
    console.error('Scraper failed, using mock data:', error.message);
    return MOCK_DATA;
  }
}

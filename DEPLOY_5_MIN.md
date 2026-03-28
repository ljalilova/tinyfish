# TinyFish 5-minute deploy

## 1) Deploy backend on Render
1. Push this repo to GitHub.
2. In Render, create a new **Blueprint** and select this repo.
3. Render will detect `render.yaml` and create `tinyfish-api`.
4. Add environment variables in Render:
   - `OPENAI_API_KEY` (optional because fallback mode exists)
   - `TINYFISH_API_KEY` (if your scrapers need it)
5. Deploy and copy your backend URL, for example:
   - `https://tinyfish-api.onrender.com`

## 2) Wire frontend rewrite for API
1. Open `vercel.json`.
2. Replace this value:
   - `https://REPLACE_WITH_YOUR_RENDER_URL.onrender.com/api/$1`
3. With your real backend URL, for example:
   - `https://tinyfish-api.onrender.com/api/$1`
4. Commit and push.

## 3) Deploy frontend on Vercel
1. In Vercel, import the same GitHub repo.
2. Keep defaults (Vite project).
3. Deploy.

## 4) Quick checks
1. Open your Vercel site.
2. Search for a location.
3. Confirm no backend error and results render.

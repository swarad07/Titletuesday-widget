# Titled Tuesday Widget

OBS widget for Titled Tuesday chess streamers showing real-time game results.

## 🎥 Live Demo

**Hosted at:** [titletuesday-widget.vercel.app](https://titletuesday-widget.vercel.app)

## Features

- 📊 Live score tracking with proper chess scoring (wins = 1pt, draws = 0.5pt)
- 🎯 11-round results grid with color-coded outcomes
- 🔄 Auto-polling every 30 seconds for new games
- 📅 Smart filtering - only shows today's and yesterday's Titled Tuesday games
- ✅ Handles all 15 Chess.com result codes correctly
- 🎨 Chroma-key ready (green background for easy OBS removal)
- 🔗 URL-based configuration for easy streaming setup

## Usage for Streamers

**No installation needed!** Just add to OBS:

1. In OBS Studio, add a **Browser Source**
2. Configure the source:
   - **URL:** `https://titletuesday-widget.vercel.app/?username=YOUR_CHESS_COM_USERNAME`
   - **Width:** `360`
   - **Height:** `400`
   - ✅ Check **"Shutdown source when not visible"**
3. Add **Chroma Key filter** to remove green background:
   - Right-click source → Filters → Add "Chroma Key"
   - **Key Color Type:** Green
   - **Similarity:** 400
   - **Smoothness:** 80

**Example URLs:**
- `https://titletuesday-widget.vercel.app/?username=Hikaru`
- `https://titletuesday-widget.vercel.app/?username=magnuscarlsen`
- `https://titletuesday-widget.vercel.app/?username=viditchess`

**The widget automatically:**
- Shows only today's and yesterday's Titled Tuesday games
- Updates every 30 seconds to catch new games
- Displays results immediately when games finish
- Calculates score with proper chess rules (0.5 for draws)

## For Developers

### Local Development

```bash
git clone https://github.com/Bot-Rakshit/Titletuesday-widget.git
cd Titletuesday-widget
npm install
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

## Color Coding

- 🟢 **Green**: Win (1 point)
- 🔴 **Red**: Loss (0 points)
- ⚪ **Grey**: Draw (0.5 points)
- ⚫ **Dark Grey**: Round not played yet

## How It Works

1. **Fetches games** from Chess.com API for the current month
2. **Filters** to only Titled Tuesday tournaments from today/yesterday
3. **Polls every 30 seconds** to detect new games automatically
4. **Calculates score** using standard chess rules (1/0.5/0)
5. **Updates display** in real-time when new games complete

## Technical Details

- **API:** Chess.com Public API
- **Frontend:** React 18 + TypeScript + Vite
- **Hosting:** Vercel
- **Polling:** 30-second intervals
- **Dimensions:** 360px × 400px (optimized for stream overlays)

## Deployment

The widget is automatically deployed to Vercel from the `main` branch.

**Live URL:** [titletuesday-widget.vercel.app](https://titletuesday-widget.vercel.app)

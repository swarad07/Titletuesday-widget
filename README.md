# Titled Tuesday Widgets

OBS widget for Titled Tuesday chess streamers showing real-time game results and accuracy analysis.

## Features

- 📊 Live score tracking (wins/total games)
- 🎯 11-round results grid with color-coded outcomes
- 📈 Real-time average accuracy calculation using external eval API
- 🔄 Auto-polling every 30 seconds for new games
- 🎮 Streaming accuracy updates as games are analyzed (updates live!)
- 📅 Smart filtering - only shows today's and yesterday's Titled Tuesday games
- ✅ Handles all 15 Chess.com result codes correctly
- 🎨 Chroma-key ready (green background for easy OBS removal)
- 🔗 URL-based configuration for easy streaming setup

## Quick Start

```bash
npm install
npm run dev
```

## Usage

### For Streamers

1. Start the dev server: `npm run dev`
2. Open in browser: `http://localhost:5173/?username=viditchess`
3. Add as Browser Source in OBS:
   - URL: `http://localhost:5173/?username=YOUR_CHESS_COM_USERNAME`
   - Width: 360px
   - Height: 400px
   - Check "Shutdown source when not visible"
4. In OBS, right-click the source → Filters → Add "Chroma Key"
   - Key Color Type: Green
   - Similarity: 400
   - Smoothness: 80

**The widget will automatically:**
- Filter to show only today's and yesterday's Titled Tuesday games
- Poll Chess.com API every 30 seconds for new games
- Analyze each game using external evaluation API
- Update accuracy in real-time as each position is evaluated
- Display results immediately when new games finish

### Building for Production

```bash
npm run build
npm run preview
```

## Color Coding

- 🟢 **Green**: Win
- 🔴 **Red**: Loss  
- ⚪ **Grey**: Draw
- ⚫ **Dark Grey**: Round not played yet

## How It Works

### Game Filtering
- Fetches games from Chess.com API for current month
- Filters to only Titled Tuesday tournaments
- Shows only games from today and yesterday
- Automatically detects new games every 30 seconds

### Accuracy Analysis
- Uses external evaluation API: `eval.plc.hadron43.in`
- Extracts FEN positions from PGN for each move
- Evaluates positions before and after player moves
- Calculates centipawn loss per move
- Converts centipawn loss to accuracy percentage
- Streams updates in real-time during analysis
- Formula: `103.1668 * exp(-0.04354 * cpLoss/100) - 3.1669`

### API

The widget fetches data from Chess.com's public API:
- `https://api.chess.com/pub/player/{username}/games/{year}/{month}`

## Tech Stack

- React 18 + TypeScript
- Vite
- Chess.js for PGN parsing and FEN extraction
- External Evaluation API for position analysis

## Notes

- Analysis takes time as API is called for each position
- Accuracy updates stream in real-time as positions are evaluated
- Widget continues polling in background for new games
- Designed for 340px width for compact stream overlay
- API calls are sequential to avoid rate limiting

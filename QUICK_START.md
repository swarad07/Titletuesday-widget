# Quick Start Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open: `http://localhost:5173/?username=viditchess`

## OBS Setup

1. **Add Browser Source**
   - Source Name: "Titled Tuesday Widget"
   - URL: `http://localhost:5173/?username=YOUR_USERNAME`
   - Width: `360`
   - Height: `400`
   - FPS: `30`
   - ✅ Check "Shutdown source when not visible"

2. **Apply Chroma Key**
   - Right-click source → Filters → Add "Chroma Key"
   - Key Color Type: `Green`
   - Similarity: `400`
   - Smoothness: `80`
   - Spill Reduction: `100`

## URL Parameters

```
http://localhost:5173/?username=YOUR_CHESS_COM_USERNAME
```

Replace `YOUR_CHESS_COM_USERNAME` with the player's Chess.com username.

## Features Overview

### Automatic Features
- ✅ Filters to today/yesterday's games only
- ✅ Polls for new games every 30 seconds
- ✅ Analyzes with external evaluation API
- ✅ Real-time accuracy updates
- ✅ Auto-detects player color
- ✅ Handles all 15 Chess.com result codes

### Display Elements
- **Score:** Wins / Total Games
- **Average Accuracy:** Calculated from all analyzed games
- **11 Round Grid:**
  - 🟢 Green = Win
  - 🔴 Red = Loss
  - ⚪ Gray = Draw
  - ⚫ Dark Gray = Not played

## Troubleshooting

### No games showing?
- Check username is correct
- Verify player has Titled Tuesday games today/yesterday
- Check browser console for API errors

### Accuracy not calculating?
- Check browser console for API errors
- Verify `eval.plc.hadron43.in` is accessible
- Check network tab for failed requests
- Try refreshing the page

### Widget not updating?
- Check network tab for API calls (every 30s)
- Verify Chess.com API is accessible
- Clear browser cache and reload

## Performance Settings

### Slower Polling (60 seconds)
Edit `src/App.tsx`:
```typescript
}, 60000); // Change from 30000 to 60000
```

### Add Delay Between API Calls
Edit `src/services/accuracyAnalysis.ts`:
```typescript
// Add after each API call
await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
```

## Customization

### Colors
Edit component files in `src/components/`:
- `ScoreDisplay.tsx` - Score/accuracy colors
- `RoundResults.tsx` - Win/loss/draw colors

### Size
Edit `src/App.tsx`:
```typescript
width: '340px', // Change this value
```

### Background
Change chroma key color in `src/App.tsx`:
```typescript
backgroundColor: '#00FF00', // Change to desired color
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm start        # Dev server with network access
```

## URLs

- **Local:** http://localhost:5173
- **Network:** http://YOUR_IP:5173 (use `npm start`)
- **With username:** Add `?username=viditchess` to any URL

## File Locations

- **Components:** `src/components/`
- **Services:** `src/services/`
- **Accuracy Analysis:** `src/services/accuracyAnalysis.ts`
- **API Integration:** External eval API

## Tips

1. **Test with a known player:** Use `viditchess`, `Hikaru`, or `magnuscarlsen`
2. **Check timing:** Titled Tuesday runs on Tuesdays at specific times
3. **Monitor console:** Check for any errors during analysis
4. **OBS Preview:** Use OBS Studio mode to test before going live
5. **Backup plan:** Have a static image ready if widget fails

## Support

- Check `SUMMARY.md` for implementation details
- See `CHANGES.md` for what was changed
- Read `STOCKFISH_SETUP.md` for engine configuration
- Check `README.md` for full documentation

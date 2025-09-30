# Chess.com Result Codes Reference

## Implementation in `chessComApi.ts`

All result codes from the Chess.com API are properly mapped to Win/Loss/Draw.

### Win (1 code)
| Code | Description | Widget Display |
|------|-------------|----------------|
| `win` | Win | 🟢 Green box |

### Loss (8 codes)
| Code | Description | Widget Display |
|------|-------------|----------------|
| `checkmated` | Checkmated | 🔴 Red box |
| `timeout` | Timeout | 🔴 Red box |
| `resigned` | Resigned | 🔴 Red box |
| `abandoned` | Abandoned | 🔴 Red box |
| `lose` | Lose | 🔴 Red box |
| `kingofthehill` | Opponent king reached the hill | 🔴 Red box |
| `threecheck` | Checked for the 3rd time | 🔴 Red box |
| `bughousepartnerlose` | Bughouse partner lost | 🔴 Red box |

### Draw (6 codes)
| Code | Description | Widget Display |
|------|-------------|----------------|
| `agreed` | Draw agreed | ⚪ Gray box |
| `repetition` | Draw by repetition | ⚪ Gray box |
| `stalemate` | Stalemate | ⚪ Gray box |
| `insufficient` | Insufficient material | ⚪ Gray box |
| `50move` | Draw by 50-move rule | ⚪ Gray box |
| `timevsinsufficient` | Draw by timeout vs insufficient material | ⚪ Gray box |

## Total: 15 Result Codes

## Code Implementation

```typescript
const resultCode = playerColor.result.toLowerCase();

if (resultCode === 'win') {
  result = 'win';
} else if (
  resultCode === 'checkmated' ||
  resultCode === 'timeout' ||
  resultCode === 'resigned' ||
  resultCode === 'abandoned' ||
  resultCode === 'lose' ||
  resultCode === 'bughousepartnerlose' ||
  resultCode === 'kingofthehill' ||
  resultCode === 'threecheck'
) {
  result = 'loss';
} else if (
  resultCode === 'agreed' ||
  resultCode === 'repetition' ||
  resultCode === 'stalemate' ||
  resultCode === 'insufficient' ||
  resultCode === '50move' ||
  resultCode === 'timevsinsufficient'
) {
  result = 'draw';
} else {
  console.warn(`Unknown result code: ${resultCode}`);
  result = 'draw'; // Default to draw for unknown codes
}
```

## Common Scenarios in Titled Tuesday

### Most Common Loss Codes
1. `resigned` - Player resigns due to bad position
2. `checkmated` - Player gets checkmated
3. `timeout` - Player runs out of time

### Most Common Draw Codes
1. `agreed` - Players agree to a draw
2. `repetition` - Threefold repetition
3. `insufficient` - Insufficient material to checkmate

### Rare Codes
- `kingofthehill` - King of the Hill variant (unlikely in Titled Tuesday)
- `threecheck` - Three-check variant (unlikely in Titled Tuesday)
- `bughousepartnerlose` - Bughouse variant (not used in Titled Tuesday)
- `50move` - 50-move rule draw (rare in blitz)
- `timevsinsufficient` - Very rare edge case

## Testing

To test all result codes are working:

1. Play different game types on Chess.com
2. Check browser console for any "Unknown result code" warnings
3. Verify the widget shows correct color for each result type

## API Response Example

```json
{
  "white": {
    "rating": 3082,
    "result": "win",
    "username": "viditchess"
  },
  "black": {
    "rating": 2912,
    "result": "resigned",
    "username": "opponent"
  }
}
```

## Reference

Official Chess.com API Documentation:
https://www.chess.com/news/view/published-data-api

Section: "Game result codes"

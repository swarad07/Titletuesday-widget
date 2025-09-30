# External API Reference

## Evaluation API

### Endpoint
```
https://eval.plc.hadron43.in/eval-bars/
```

### Usage
```
GET https://eval.plc.hadron43.in/eval-bars/?fen={encoded_fen}
```

### Parameters
- `fen` (required): URL-encoded FEN string representing the chess position

### Example Request
```javascript
const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const encodedFen = encodeURIComponent(fen);
const url = `https://eval.plc.hadron43.in/eval-bars/?fen=${encodedFen}`;

const response = await fetch(url);
const data = await response.json();
```

### Response Format
```json
{
  "wv": 20,
  "bv": -20
}
```

### Response Fields
- `wv` (number): White's evaluation in centipawns (positive = white advantage)
- `bv` (number): Black's evaluation in centipawns (negative = black disadvantage)

### Example Responses

**Starting Position:**
```json
{
  "wv": 20,
  "bv": -20
}
```

**White Advantage:**
```json
{
  "wv": 150,
  "bv": -150
}
```

**Black Advantage:**
```json
{
  "wv": -80,
  "bv": 80
}
```

## Integration in Widget

### Implementation
File: `src/services/accuracyAnalysis.ts`

```typescript
const analyzePositionWithAPI = async (fen: string): Promise<number> => {
  const encodedFen = encodeURIComponent(fen);
  const endpoint = `https://eval.plc.hadron43.in/eval-bars/?fen=${encodedFen}`;
  
  const response = await fetch(endpoint);
  const data = await response.json();
  
  return data.wv; // Return white's evaluation
};
```

### Usage in Game Analysis

1. Extract FEN from PGN move-by-move
2. Call API for position before player's move
3. Call API for position after player's move
4. Calculate centipawn loss
5. Convert to accuracy percentage

### Centipawn Loss Calculation

```typescript
// For white player
const cpLoss = Math.max(0, evalBefore - evalAfter);

// For black player
const cpLoss = Math.max(0, evalAfter - evalBefore);
```

### Accuracy Conversion Formula

```typescript
const centipawnsToAccuracy = (cpLoss: number): number => {
  const clampedLoss = Math.max(0, Math.min(1000, cpLoss));
  const accuracy = 103.1668 * Math.exp(-0.04354 * (clampedLoss / 100)) - 3.1669;
  return Math.max(0, Math.min(100, accuracy));
};
```

## Rate Limiting

### Current Implementation
- Sequential API calls (one at a time)
- No concurrent requests
- Natural rate limiting through sequential processing

### Recommendations
- Keep requests sequential to avoid overwhelming the API
- Add delays between requests if needed
- Implement exponential backoff on errors
- Cache evaluations if possible

## Error Handling

### Common Errors

**Network Error:**
```typescript
try {
  const response = await fetch(endpoint);
  if (!response.ok) {
    console.warn(`API error for FEN: ${fen}`);
    return 0;
  }
} catch (error) {
  console.error('Error fetching evaluation:', error);
  return 0;
}
```

**Invalid FEN:**
- API may return error for malformed FEN
- Widget defaults to 0 evaluation

**Timeout:**
- No explicit timeout set
- Browser default timeout applies
- Returns 0 on timeout

## Performance Considerations

### Typical Response Times
- **Fast:** 100-300ms
- **Normal:** 300-800ms
- **Slow:** 800ms-2s
- **Timeout:** >5s

### Optimization Tips
1. **Cache Results:** Store FEN → evaluation mappings
2. **Batch Processing:** If API supports batch endpoints
3. **Parallel Analysis:** Multiple games can analyze in parallel
4. **Skip Opening Book:** Use known evaluations for common openings

## FEN Format

### Standard FEN String
```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

### Components
1. **Piece placement:** 8 ranks from 8th to 1st
2. **Active color:** `w` (white) or `b` (black)
3. **Castling rights:** KQkq or combinations
4. **En passant:** Target square or `-`
5. **Halfmove clock:** Number of halfmoves since last capture/pawn move
6. **Fullmove number:** Starts at 1, increments after black's move

### URL Encoding
Always encode FEN strings before adding to URL:
```javascript
const encoded = encodeURIComponent(fen);
// Spaces become %20
// Slashes become %2F
```

## Alternative APIs (Backup)

If the primary API is unavailable:

### Lichess Cloud Eval
```
https://lichess.org/api/cloud-eval?fen={fen}
```

### Chess.com Analysis
- Some games include `accuracies` field in API response
- Use when available to skip evaluation

### Local Stockfish
- Fallback to WASM Stockfish if needed
- More complex but fully offline

## Testing the API

### Manual Test
```bash
curl "https://eval.plc.hadron43.in/eval-bars/?fen=rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201"
```

### Expected Output
```json
{"wv":20,"bv":-20}
```

### From Browser Console
```javascript
fetch('https://eval.plc.hadron43.in/eval-bars/?fen=rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-%200%201')
  .then(r => r.json())
  .then(console.log);
```

## Credits

Evaluation API provided by: `eval.plc.hadron43.in`

# Testing Checklist

## Pre-Launch Testing

### 1. Result Code Handling ✅
- [ ] Test with games that ended in `win`
- [ ] Test with games that ended in `resigned`
- [ ] Test with games that ended in `checkmated`
- [ ] Test with games that ended in `timeout`
- [ ] Test with games that ended in draw (`agreed`, `repetition`, `stalemate`)
- [ ] Check console for no "Unknown result code" warnings
- [ ] Verify correct color coding (green=win, red=loss, gray=draw)

### 2. Date Filtering ✅
- [ ] Load widget on a Tuesday during Titled Tuesday
- [ ] Verify only today's games are shown
- [ ] Load widget on a Wednesday (day after)
- [ ] Verify yesterday's (Tuesday) games are shown
- [ ] Load widget on Thursday (2 days after)
- [ ] Verify no games are shown (too old)
- [ ] Check console logs for filtered game count

### 3. Polling System ✅
- [ ] Load widget with username
- [ ] Wait 30 seconds
- [ ] Check Network tab for API call
- [ ] Start a new Titled Tuesday game (if possible)
- [ ] Verify widget updates within 30 seconds
- [ ] Check console for "New games detected" message
- [ ] Verify new game appears in grid
- [ ] Verify new game gets analyzed automatically

### 4. Stockfish Analysis ✅
- [ ] Load widget with games
- [ ] Watch accuracy update in real-time
- [ ] Verify accuracy changes as moves are analyzed
- [ ] Check browser console for Stockfish messages
- [ ] Verify no WASM loading errors
- [ ] Watch for "uciok" and "bestmove" messages
- [ ] Confirm analysis completes for all games
- [ ] Verify average accuracy calculation is correct

### 5. UI Layout ✅
- [ ] Set browser width to 360px
- [ ] Verify round boxes don't overflow
- [ ] Check all 11 round labels are visible
- [ ] Verify text doesn't wrap awkwardly
- [ ] Test with 0 games
- [ ] Test with 1 game
- [ ] Test with 11 games (full tournament)
- [ ] Verify chroma green background displays

### 6. OBS Integration ✅
- [ ] Add as Browser Source (360x400)
- [ ] Verify widget loads correctly
- [ ] Apply Chroma Key filter
- [ ] Verify green background is removed
- [ ] Check text is readable
- [ ] Verify boxes are visible
- [ ] Test with different OBS themes
- [ ] Verify no flickering during updates

## Performance Testing

### Network
- [ ] Monitor API call frequency (should be 30s)
- [ ] Check API response times
- [ ] Verify no excessive API calls
- [ ] Test with slow network connection
- [ ] Verify graceful handling of API errors

### Memory
- [ ] Load widget and let run for 1 hour
- [ ] Check memory usage in browser DevTools
- [ ] Verify no memory leaks
- [ ] Check Stockfish worker memory
- [ ] Verify polling doesn't accumulate memory

### CPU
- [ ] Monitor CPU usage during analysis
- [ ] Verify UI remains responsive
- [ ] Check CPU usage during polling
- [ ] Test with multiple browser tabs
- [ ] Verify no excessive CPU usage when idle

## Edge Cases

### No Games
- [ ] Enter username with no Titled Tuesday games
- [ ] Verify "Loading..." message appears
- [ ] Verify graceful handling (no errors)
- [ ] Check console for any warnings

### Invalid Username
- [ ] Enter non-existent username
- [ ] Verify API error handling
- [ ] Check console for error messages
- [ ] Verify UI doesn't break

### Network Issues
- [ ] Disconnect internet
- [ ] Verify graceful degradation
- [ ] Reconnect internet
- [ ] Verify widget recovers
- [ ] Check error messages

### Special Characters
- [ ] Test username with numbers: `Chess123`
- [ ] Test username with underscores: `Chess_Master`
- [ ] Test username with mixed case: `ChEsSmAsTeR`
- [ ] Verify all work correctly

## Browser Compatibility

### Desktop Browsers
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Brave (latest)

### OBS Browser Source
- [ ] OBS Studio (latest)
- [ ] Streamlabs OBS
- [ ] OBS Classic

## Accuracy Validation

### Manual Verification
- [ ] Pick a known game
- [ ] Compare widget accuracy with Chess.com accuracy
- [ ] Verify they're within reasonable range (±5%)
- [ ] Check accuracy formula is correct
- [ ] Test with different game lengths

### Streaming Updates
- [ ] Watch accuracy update during analysis
- [ ] Verify it increases gradually (not jumps)
- [ ] Check average accuracy updates after each game
- [ ] Verify progress callback is working

## Known Issues to Watch For

### Stockfish Issues
- [ ] WASM loading failures
- [ ] UCI protocol errors
- [ ] Worker timeout errors
- [ ] Depth 14 taking too long (>30s per game)

### UI Issues
- [ ] Overflow on small screens
- [ ] Text clipping
- [ ] Color contrast issues
- [ ] Chroma key not working

### Data Issues
- [ ] Wrong player color detection
- [ ] Incorrect result mapping
- [ ] Missing games
- [ ] Duplicate games

## Test Usernames

### Active Players (for live testing)
- `Hikaru` - GM Hikaru Nakamura
- `magnuscarlsen` - GM Magnus Carlsen
- `fabianocaruana` - GM Fabiano Caruana
- `viditchess` - GM Vidit Gujarathi
- `lachesisq` - GM Lachesis

### Test on Different Dates
- **Tuesday 3:00 PM UTC** - Titled Tuesday starts
- **Tuesday 11:00 PM UTC** - Late Titled Tuesday starts
- **Wednesday morning** - Day after (yesterday's games)
- **Friday** - No recent games

## Automated Testing (Future)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## Sign-Off Checklist

Before going live:
- [ ] All core features tested ✅
- [ ] No console errors ✅
- [ ] OBS integration working ✅
- [ ] Performance acceptable ✅
- [ ] Edge cases handled ✅
- [ ] Documentation complete ✅
- [ ] README up to date ✅
- [ ] Known issues documented ✅

## Reporting Issues

When reporting issues, include:
1. Browser/OBS version
2. Username used for testing
3. Date/time of test
4. Console logs (if errors)
5. Screenshots/video
6. Steps to reproduce

## Performance Benchmarks

Expected performance:
- API response time: <1s
- Stockfish init: <5s
- Analysis per game (depth 14): 20-30s
- Polling interval: 30s
- Memory usage: <100MB
- CPU usage (idle): <5%
- CPU usage (analyzing): <50%

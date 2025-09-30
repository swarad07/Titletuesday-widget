import { useEffect, useState } from 'react';
import UsernameInput from './components/UsernameInput';
import ScoreDisplay from './components/ScoreDisplay';
import RoundResults from './components/RoundResults';
import { fetchPlayerGames, filterTitledTuesdayGames } from './services/chessComApi';
import { TitledTuesdayGame, GameResult } from './types';

function App() {
  const [username, setUsername] = useState<string>('');
  const [games, setGames] = useState<TitledTuesdayGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastGameCount, setLastGameCount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const usernameParam = params.get('username');
    if (usernameParam) {
      handleLoadGames(usernameParam);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const pollInterval = setInterval(async () => {
      try {
        const fetchedGames = await fetchPlayerGames(username);
        const ttGames = filterTitledTuesdayGames(fetchedGames, username);
        
        if (ttGames.length > lastGameCount) {
          console.log(`New games detected: ${ttGames.length} games`);
          setGames(ttGames);
          setLastGameCount(ttGames.length);
        }
      } catch (error) {
        console.error('Error polling for new games:', error);
      }
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [username, lastGameCount]);

  const handleLoadGames = async (user: string) => {
    setIsLoading(true);
    setUsername(user);
    
    const params = new URLSearchParams(window.location.search);
    params.set('username', user);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

    try {
      const fetchedGames = await fetchPlayerGames(user);
      const ttGames = filterTitledTuesdayGames(fetchedGames, user);
      setGames(ttGames);
      setLastGameCount(ttGames.length);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const score = games.reduce((total, game) => {
    if (game.result === 'win') return total + 1;
    if (game.result === 'draw') return total + 0.5;
    return total;
  }, 0);
  
  const results: GameResult[] = games.map(g => g.result);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#00FF00',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{
        width: '340px',
        margin: '0 auto',
      }}>
        <UsernameInput onSubmit={handleLoadGames} isLoading={isLoading} />
        
        {username && (
          <>
            <ScoreDisplay
              score={score}
              total={games.length}
            />
            <RoundResults results={results} maxRounds={11} />
          </>
        )}

        {isLoading && (
          <div style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: '14px',
            marginTop: '20px',
            fontWeight: '600',
          }}>
            Loading games...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

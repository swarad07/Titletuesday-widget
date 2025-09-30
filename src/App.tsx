import { useEffect, useState } from 'react';
import UsernameInput from './components/UsernameInput';
import ScoreDisplay from './components/ScoreDisplay';
import RoundResults from './components/RoundResults';
import CustomizePanel from './components/CustomizePanel';
import { fetchPlayerGames, filterSessionGames } from './services/chessComApi';
import { TitledTuesdayGame, GameResult } from './types';
import { CustomizationOptions, DEFAULT_CUSTOMIZATION, SessionConfig, DEFAULT_SESSION } from './types/customization';

function App() {
  const [username, setUsername] = useState<string>('');
  const [games, setGames] = useState<TitledTuesdayGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastGameCount, setLastGameCount] = useState(0);
  const [customization, setCustomization] = useState<CustomizationOptions>(DEFAULT_CUSTOMIZATION);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig>(DEFAULT_SESSION);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const usernameParam = params.get('username');
    
    // Load customization from URL
    const customOptions: CustomizationOptions = {
      bgColor: params.get('bgColor') || DEFAULT_CUSTOMIZATION.bgColor,
      textColor: params.get('textColor') || DEFAULT_CUSTOMIZATION.textColor,
      winColor: params.get('winColor') || DEFAULT_CUSTOMIZATION.winColor,
      lossColor: params.get('lossColor') || DEFAULT_CUSTOMIZATION.lossColor,
      drawColor: params.get('drawColor') || DEFAULT_CUSTOMIZATION.drawColor,
      noneColor: params.get('noneColor') || DEFAULT_CUSTOMIZATION.noneColor,
      boxBgColor: params.get('boxBgColor') || DEFAULT_CUSTOMIZATION.boxBgColor,
      fontSize: params.get('fontSize') || DEFAULT_CUSTOMIZATION.fontSize,
    };
    
    // Load session config from URL
    const mode = params.get('sessionMode') as 'titled-tuesday' | 'custom' | null;
    const startTimeParam = params.get('sessionStart');
    const sessionOptions: SessionConfig = {
      mode: mode || DEFAULT_SESSION.mode,
      startTime: startTimeParam ? parseInt(startTimeParam) : undefined,
    };
    
    setCustomization(customOptions);
    setSessionConfig(sessionOptions);
    
    if (usernameParam) {
      handleLoadGames(usernameParam, sessionOptions);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const pollInterval = setInterval(async () => {
      try {
        const fetchedGames = await fetchPlayerGames(username);
        const sessionGames = filterSessionGames(fetchedGames, username, sessionConfig);
        
        if (sessionGames.length > lastGameCount) {
          console.log(`New games detected: ${sessionGames.length} games`);
          setGames(sessionGames);
          setLastGameCount(sessionGames.length);
        }
      } catch (error) {
        console.error('Error polling for new games:', error);
      }
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [username, lastGameCount, sessionConfig]);

  const updateURL = (user?: string, customOptions?: CustomizationOptions, session?: SessionConfig) => {
    const params = new URLSearchParams(window.location.search);
    
    if (user) {
      params.set('username', user);
    }
    
    const options = customOptions || customization;
    params.set('bgColor', options.bgColor);
    params.set('textColor', options.textColor);
    params.set('winColor', options.winColor);
    params.set('lossColor', options.lossColor);
    params.set('drawColor', options.drawColor);
    params.set('noneColor', options.noneColor);
    params.set('boxBgColor', options.boxBgColor);
    params.set('fontSize', options.fontSize);
    
    const sessionOpts = session || sessionConfig;
    params.set('sessionMode', sessionOpts.mode);
    if (sessionOpts.startTime) {
      params.set('sessionStart', sessionOpts.startTime.toString());
    } else {
      params.delete('sessionStart');
    }
    
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  const handleLoadGames = async (user: string, session?: SessionConfig) => {
    setIsLoading(true);
    setUsername(user);
    
    const sessionToUse = session || sessionConfig;
    if (session) {
      setSessionConfig(session);
    }
    
    updateURL(user, undefined, sessionToUse);

    try {
      const fetchedGames = await fetchPlayerGames(user);
      const sessionGames = filterSessionGames(fetchedGames, user, sessionToUse);
      setGames(sessionGames);
      setLastGameCount(sessionGames.length);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomizationChange = (options: CustomizationOptions) => {
    setCustomization(options);
    updateURL(username, options);
  };

  const score = games.reduce((total, game) => {
    if (game.result === 'win') return total + 1;
    if (game.result === 'draw') return total + 0.5;
    return total;
  }, 0);
  
  const results: GameResult[] = games.map(g => g.result);

  const getFontSizeValue = () => {
    switch (customization.fontSize) {
      case 'small': return { score: '28px', label: '11px', round: '9px' };
      case 'large': return { score: '36px', label: '13px', round: '11px' };
      default: return { score: '32px', label: '12px', round: '10px' };
    }
  };

  const fontSizes = getFontSizeValue();

  return (
    <div 
      className="min-h-screen p-6 transition-colors duration-300"
      style={{ backgroundColor: customization.bgColor }}
    >
      <div className="w-full max-w-[360px] mx-auto">
        <UsernameInput 
          onSubmit={handleLoadGames} 
          onCustomize={() => setIsCustomizeOpen(true)}
          isLoading={isLoading}
          sessionConfig={sessionConfig}
          onSessionChange={setSessionConfig}
        />
        
        {username && (
          <div className="animate-in fade-in duration-500">
            <ScoreDisplay
              score={score}
              total={games.length}
              customization={customization}
              fontSize={fontSizes}
            />
            <RoundResults 
              results={results} 
              maxRounds={11}
              customization={customization}
              fontSize={fontSizes}
            />
          </div>
        )}

        {isLoading && (
          <div className="text-center text-black text-sm mt-8 font-semibold animate-pulse">
            Loading games...
          </div>
        )}
      </div>

      <CustomizePanel
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        options={customization}
        onOptionsChange={handleCustomizationChange}
      />
    </div>
  );
}

export default App;

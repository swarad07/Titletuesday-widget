import { ChessComGame, TitledTuesdayGame } from '../types';

export const fetchPlayerGames = async (username: string): Promise<ChessComGame[]> => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  
  try {
    const response = await fetch(
      `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }
    
    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

const isGameFromTodayOrYesterday = (endTime: number): boolean => {
  const gameDate = new Date(endTime * 1000);
  const now = new Date();
  
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  
  return gameDate >= yesterdayStart;
};

export const filterTitledTuesdayGames = (
  games: ChessComGame[],
  username: string
): TitledTuesdayGame[] => {
  const titledTuesdayGames = games.filter((game) => {
    if (!game.tournament) return false;
    const tournamentUrl = game.tournament.toLowerCase();
    const isTitledTuesday = tournamentUrl.includes('titled-tuesday') || tournamentUrl.includes('titled tuesday');

    if (!isTitledTuesday) return false;

    return isGameFromTodayOrYesterday(game.end_time);
  });

  return titledTuesdayGames.map((game, index) => {
    const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
    const playerColor = isWhite ? game.white : game.black;
    const opponent = isWhite ? game.black.username : game.white.username;
    
    const resultCode = playerColor.result.toLowerCase();
    
    // Map Chess.com result codes to win/loss/draw
    // See: https://www.chess.com/news/view/published-data-api
    let result: 'win' | 'loss' | 'draw';
    
    if (resultCode === 'win') {
      result = 'win';
    } else if (
      resultCode === 'checkmated' ||
      resultCode === 'timeout' ||
      resultCode === 'resigned' ||
      resultCode === 'abandoned' ||
      resultCode === 'lose' ||
      resultCode === 'bughousepartnerlose'
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
    } else if (
      resultCode === 'kingofthehill' ||
      resultCode === 'threecheck'
    ) {
      result = 'loss';
    } else {
      console.warn(`Unknown result code: ${resultCode}`);
      result = 'draw';
    }

    const accuracy = isWhite ? game.accuracies?.white : game.accuracies?.black;

    return {
      round: index + 1,
      result,
      accuracy,
      opponent,
      rating: playerColor.rating,
      pgn: game.pgn,
    };
  });
};

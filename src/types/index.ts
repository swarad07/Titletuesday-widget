export interface ChessComGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  accuracies?: {
    white: number;
    black: number;
  };
  white: {
    rating: number;
    result: string;
    username: string;
  };
  black: {
    rating: number;
    result: string;
    username: string;
  };
  tournament?: string;
}

export interface TitledTuesdayGame {
  round: number;
  result: 'win' | 'loss' | 'draw';
  accuracy?: number;
  opponent: string;
  rating: number;
  pgn: string;
}

export interface WidgetData {
  username: string;
  score: number;
  totalGames: number;
  games: TitledTuesdayGame[];
  averageAccuracy: number;
}

export type GameResult = 'win' | 'loss' | 'draw' | 'none';

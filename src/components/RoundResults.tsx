import React from 'react';
import { GameResult } from '../types';
import { CustomizationOptions } from '../types/customization';

interface RoundResultsProps {
  results: GameResult[];
  maxRounds?: number;
  customization: CustomizationOptions;
  fontSize: { score: string; label: string; round: string };
}

const RoundResults: React.FC<RoundResultsProps> = ({ results, maxRounds = 11, customization, fontSize }) => {
  const getResultColor = (result: GameResult): string => {
    switch (result) {
      case 'win':
        return customization.winColor;
      case 'loss':
        return customization.lossColor;
      case 'draw':
        return customization.drawColor;
      case 'none':
      default:
        return customization.noneColor;
    }
  };

  const rounds = Array.from({ length: maxRounds }, (_, i) => {
    const result = results[i] || 'none';
    return { round: i + 1, result };
  });

  return (
    <div 
      className="backdrop-blur-sm rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl p-4"
      style={{
        backgroundColor: customization.boxBgColor,
        border: `1px solid ${customization.textColor}33`,
      }}
    >
      <div 
        className="font-semibold uppercase tracking-wider mb-3"
        style={{
          fontSize: fontSize.label,
          color: `${customization.textColor}99`,
        }}
      >
        Round Results
      </div>
      <div className="grid grid-cols-11 gap-1 w-full">{/* Round boxes */}
        {rounds.map(({ round, result }) => (
          <div key={round} className="flex flex-col items-center min-w-0">
            <div
              className="w-full max-w-[26px] h-[26px] rounded flex items-center justify-center font-bold transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: getResultColor(result),
                fontSize: fontSize.round,
                color: result === 'none' ? `${customization.textColor}4d` : customization.textColor,
                border: result === 'none' ? `1px solid ${customization.textColor}1a` : 'none',
              }}
            >
              {result !== 'none' && (result === 'win' ? 'W' : result === 'loss' ? 'L' : 'D')}
            </div>
            <div 
              className="mt-1 font-medium whitespace-nowrap"
              style={{
                fontSize: `calc(${fontSize.round} - 1px)`,
                color: `${customization.textColor}80`,
              }}
            >
              R{round}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundResults;

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
    <div style={{
      backgroundColor: customization.boxBgColor,
      padding: '12px 16px',
      borderRadius: '8px',
      border: `1px solid ${customization.textColor}33`,
    }}>
      <div style={{
        fontSize: fontSize.label,
        color: `${customization.textColor}99`,
        fontWeight: '600',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Round Results
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
        gap: '4px',
        width: '100%',
        overflow: 'hidden',
      }}>
        {rounds.map(({ round, result }) => (
          <div key={round} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            minWidth: 0,
          }}>
            <div
              style={{
                width: '100%',
                maxWidth: '26px',
                height: '26px',
                backgroundColor: getResultColor(result),
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fontSize.round,
                fontWeight: '700',
                color: result === 'none' ? `${customization.textColor}4d` : customization.textColor,
                border: result === 'none' ? `1px solid ${customization.textColor}1a` : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {result !== 'none' && (result === 'win' ? 'W' : result === 'loss' ? 'L' : 'D')}
            </div>
            <div style={{
              fontSize: `calc(${fontSize.round} - 1px)`,
              color: `${customization.textColor}80`,
              marginTop: '3px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
            }}>
              R{round}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundResults;

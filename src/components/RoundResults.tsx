import React from 'react';
import { GameResult } from '../types';

interface RoundResultsProps {
  results: GameResult[];
  maxRounds?: number;
}

const RoundResults: React.FC<RoundResultsProps> = ({ results, maxRounds = 11 }) => {
  const getResultColor = (result: GameResult): string => {
    switch (result) {
      case 'win':
        return '#22c55e';
      case 'loss':
        return '#ef4444';
      case 'draw':
        return '#9ca3af';
      case 'none':
      default:
        return '#374151';
    }
  };

  const rounds = Array.from({ length: maxRounds }, (_, i) => {
    const result = results[i] || 'none';
    return { round: i + 1, result };
  });

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <div style={{
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.6)',
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
                fontSize: '10px',
                fontWeight: '700',
                color: result === 'none' ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                border: result === 'none' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {result !== 'none' && (result === 'win' ? 'W' : result === 'loss' ? 'L' : 'D')}
            </div>
            <div style={{
              fontSize: '8px',
              color: 'rgba(255, 255, 255, 0.5)',
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

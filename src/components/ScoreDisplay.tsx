import React from 'react';

interface ScoreDisplayProps {
  score: number;
  total: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, total }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '12px 20px',
      borderRadius: '8px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '-0.5px',
        marginBottom: '4px',
      }}>
        {score}/{total}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Titled Tuesday Score
      </div>
    </div>
  );
};

export default ScoreDisplay;

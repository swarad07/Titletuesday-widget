import React from 'react';
import { CustomizationOptions } from '../types/customization';

interface ScoreDisplayProps {
  score: number;
  total: number;
  customization: CustomizationOptions;
  fontSize: { score: string; label: string; round: string };
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, total, customization, fontSize }) => {
  return (
    <div style={{
      backgroundColor: customization.boxBgColor,
      padding: '12px 20px',
      borderRadius: '8px',
      marginBottom: '12px',
      border: `1px solid ${customization.textColor}33`,
    }}>
      <div style={{
        fontSize: fontSize.score,
        fontWeight: '700',
        color: customization.textColor,
        letterSpacing: '-0.5px',
        marginBottom: '4px',
      }}>
        {score % 1 === 0 ? score : score.toFixed(1)}/{total}
      </div>
      <div style={{
        fontSize: fontSize.label,
        color: `${customization.textColor}b3`,
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

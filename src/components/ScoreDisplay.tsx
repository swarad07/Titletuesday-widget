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
    <div 
      className="backdrop-blur-sm rounded-xl mb-4 shadow-2xl transition-all duration-300 hover:shadow-3xl p-5"
      style={{
        backgroundColor: customization.boxBgColor,
        border: `1px solid ${customization.textColor}33`,
      }}
    >
      <div 
        className="font-bold tracking-tight mb-1"
        style={{
          fontSize: fontSize.score,
          color: customization.textColor,
        }}
      >
        {score % 1 === 0 ? score : score.toFixed(1)}/{total}
      </div>
      <div 
        className="font-medium uppercase tracking-wider"
        style={{
          fontSize: fontSize.label,
          color: `${customization.textColor}b3`,
        }}
      >
        Titled Tuesday Score
      </div>
    </div>
  );
};

export default ScoreDisplay;

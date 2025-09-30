export interface CustomizationOptions {
  bgColor: string;
  textColor: string;
  winColor: string;
  lossColor: string;
  drawColor: string;
  noneColor: string;
  boxBgColor: string;
  fontSize: string;
}

export const DEFAULT_CUSTOMIZATION: CustomizationOptions = {
  bgColor: '#00FF00',
  textColor: '#ffffff',
  winColor: '#22c55e',
  lossColor: '#ef4444',
  drawColor: '#9ca3af',
  noneColor: '#374151',
  boxBgColor: 'rgba(0, 0, 0, 0.85)',
  fontSize: 'medium',
};

export type Theme = 'dark' | 'light';

export interface CustomizationOptions {
  theme: Theme;
  bgColor: string;
  textColor: string;
  winColor: string;
  lossColor: string;
  drawColor: string;
  noneColor: string;
  boxBgColor: string;
  fontSize: string;
}

// Dark theme colors (original)
export const DARK_THEME_COLORS = {
  bgColor: '#00FF00',
  textColor: '#ffffff',
  winColor: '#0EA5E9',
  lossColor: '#ef4444',
  drawColor: '#9ca3af',
  noneColor: '#374151',
  boxBgColor: 'rgba(0, 0, 0, 0.85)',
};

// Light theme colors (lighter, inverted colors)
export const LIGHT_THEME_COLORS = {
  bgColor: '#00FF00',
  textColor: '#1f2937',
  winColor: '#10b981',
  lossColor: '#f87171',
  drawColor: '#6b7280',
  noneColor: '#d1d5db',
  boxBgColor: 'rgba(255, 255, 255, 0.95)',
};

export const DEFAULT_CUSTOMIZATION: CustomizationOptions = {
  theme: 'dark',
  ...DARK_THEME_COLORS,
  fontSize: 'medium',
};

export const getThemeColors = (theme: Theme) => {
  return theme === 'dark' ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
};

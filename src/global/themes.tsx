import { useColorScheme } from 'react-native';

const lightTheme = {
  colors: {
    // Paleta inspirada na Pokédex
    primary: '#d1aee5', // vermelho Pokédex
    primaryDark: '#B8200A',
    accent: '#a0c8ff', // amarelo Pokédex
    accentDark: '#D4A108',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F4F6',
    text: '#111827',
    textSecondary: '#4B5563',
    muted: '#9CA3AF',
    border: '#E5E7EB',
    inputBackground: '#E5E7EB',
    //shadow: '#00000040',
    search: '#a0c8ff',
    black: '#000000ff',
    button: '#ffb4c3ff',
    sair: '#eb4343ff',
  },
};

const darkTheme = {
  colors: {
    primary: '#FF5540',
    primaryDark: '#E3350D',
    accent: '#FFCB05',
    accentDark: '#D4A108',
    background: '#020617',
    surface: '#0F172A',
    surfaceAlt: '#020617',
    text: '#F9FAFB',
    textSecondary: '#CBD5F5',
    muted: '#6B7280',
    border: '#1F2937',
    inputBackground: '#111827',
    shadow: '#00000080',
  },
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? themes.dark : themes.light;
}
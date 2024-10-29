import { Theme } from '../types';

export const themes: Record<'light' | 'dark', Theme> = {
  light: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    background: 'bg-gray-100',
    text: 'text-gray-900',
    accent: 'text-emerald-600',
  },
  dark: {
    primary: 'bg-gray-900',
    secondary: 'bg-gray-800',
    background: 'bg-[#343541]',
    text: 'text-gray-100',
    accent: 'text-emerald-500',
  },
};
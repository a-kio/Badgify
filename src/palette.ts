/**
 * High-end vibrant color system for Badgify.
 * Curated for modern developer aesthetics, clean contrast, and maximum legibility.
 * No muddy or washed-out tones (e.g. #0d9488 is excluded).
 */
export const PALETTE = {
  // Vibrant Blues & Cyans
  electricBlue: '#2563eb',
  skyBlue: '#0284c7',
  cyan: '#06b6d4',
  neonCyan: '#00d8ff',
  tailwindCyan: '#0ea5e9',

  // Vibrant Greens & Mints
  nodeGreen: '#388e3c',
  emerald: '#10b981',
  mint: '#059669',
  neonMint: '#00dc82',
  brightGreen: '#22c55e',

  // Warm Ambers & Oranges
  amber: '#d97706',
  gold: '#f59e0b',
  sunflower: '#fbbf24',
  orange: '#f97316',
  deepOrange: '#ea580c',
  coral: '#ff5722',

  // Striking Reds & Pinks
  crimson: '#dc2626',
  rose: '#f43f5e',
  ruby: '#e11d48',
  fuchsia: '#d946ef',
  magenta: '#ec4899',

  // Premium Purples & Violets
  violet: '#7c3aed',
  purple: '#8b5cf6',
  indigo: '#4f46e5',
  deepIndigo: '#3730a3',

  // Neutrals (for split backgrounds & containers)
  slateDark: '#181d26',
  slateBorder: '#333b47',
  slateDeep: '#0f172a',
  white: '#ffffff',
  lightGray: '#e2e8f0',
  mutedGray: '#94a3b8',
} as const;

export type PaletteColor = keyof typeof PALETTE;

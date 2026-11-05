/**
 * High-end vibrant color system for Badgify.
 * Curated for modern developer aesthetics, clean contrast, and maximum legibility.
 * Rich spectrum covering Yellows, Pinks, Reds, Oranges, Purples, Cyans, Blues, and Greens.
 * No muddy or washed-out tones (e.g. #0d9488 is strictly excluded).
 */
export const PALETTE = {
  // Vibrant Yellows & Golds
  yellow: '#eab308',
  brightYellow: '#facc15',
  sunflower: '#fbbf24',
  gold: '#f59e0b',
  amber: '#d97706',

  // Striking Pinks, Roses & Magentas
  rose: '#f43f5e',
  pink: '#ec4899',
  hotPink: '#fb7185',
  fuchsia: '#d946ef',
  magenta: '#e11d48',

  // Bold Reds & Crimsons
  red: '#ef4444',
  crimson: '#dc2626',
  ruby: '#be123c',

  // Warm Oranges & Corals
  orange: '#f97316',
  deepOrange: '#ea580c',
  coral: '#ff5722',
  tangerine: '#fb923c',

  // Premium Purples & Violets
  purple: '#8b5cf6',
  violet: '#7c3aed',
  indigo: '#6366f1',
  deepIndigo: '#4f46e5',
  royalPurple: '#581c87',

  // Vibrant Cyans & Blues
  cyan: '#06b6d4',
  neonCyan: '#00d8ff',
  tailwindCyan: '#0ea5e9',
  skyBlue: '#0284c7',
  electricBlue: '#2563eb',

  // Fresh Greens & Mints
  nodeGreen: '#16a34a',
  emerald: '#10b981',
  mint: '#059669',
  neonMint: '#00dc82',
  brightGreen: '#22c55e',

  // Neutrals (for split backgrounds & containers)
  slateDark: '#181d26',
  slateBorder: '#333b47',
  slateDeep: '#0f172a',
  white: '#ffffff',
  lightGray: '#e2e8f0',
  mutedGray: '#94a3b8',
} as const;

export type PaletteColor = keyof typeof PALETTE;

/**
 * Dynamic contrast and relative luminance engine for Badgify.
 * Implements W3C WCAG 2.1 relative luminance and contrast ratio algorithms.
 * Automatically adapts text and icon colors to dark/black (#000000) on bright backgrounds,
 * ensuring high legibility and preventing invisible/washed-out elements on yellow,
 * lime, cyan, white, and pastel badges.
 */

export const DARK_FOREGROUND = '#000000';
export const LIGHT_FOREGROUND = '#ffffff';

/**
 * Parses a hex (#RGB, #RGBA, #RRGGBB, #RRGGBBAA) or rgb(r, g, b) string
 * into normalized RGB components [0..255].
 */
export function parseColorToRgb(color: string): [number, number, number] | null {
  if (!color || typeof color !== 'string') return null;
  const trimmed = color.trim();

  // Hex format
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = Number.parseInt(hex[0] + hex[0], 16);
      const g = Number.parseInt(hex[1] + hex[1], 16);
      const b = Number.parseInt(hex[2] + hex[2], 16);
      return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : [r, g, b];
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.substring(0, 2), 16);
      const g = Number.parseInt(hex.substring(2, 4), 16);
      const b = Number.parseInt(hex.substring(4, 6), 16);
      return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : [r, g, b];
    }
  }

  // rgb(...) format
  const rgbMatch = trimmed.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    const r = Number.parseInt(rgbMatch[1], 10);
    const g = Number.parseInt(rgbMatch[2], 10);
    const b = Number.parseInt(rgbMatch[3], 10);
    return [r, g, b];
  }

  return null;
}

/**
 * Calculates the W3C WCAG 2.1 relative luminance of a color.
 * Returns a value between 0 (absolute black) and 1 (pure white).
 */
export function getRelativeLuminance(color: string): number {
  const rgb = parseColorToRgb(color);
  if (!rgb) return 0;

  const srgb = rgb.map((val) => {
    const c = val / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Calculates the WCAG contrast ratio between two colors (ranging from 1:1 to 21:1).
 */
export function getContrastRatio(foreground: string, background: string): number {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determines whether a color has high relative luminance (>= 0.42),
 * meaning white text/icons have poor contrast (< 2.2:1) and must be inverted to dark/black.
 */
export function isBrightColor(color: string, threshold = 0.42): boolean {
  if (!color) return false;
  return getRelativeLuminance(color) >= threshold;
}

/**
 * Returns the optimal foreground color (#000000 or #ffffff) for a background.
 * Respects explicit non-white user overrides unless autoContrast is true.
 */
export function getOptimalForeground(
  bgColor: string,
  preferredColor?: string,
  autoContrast = true
): string {
  if (!autoContrast && preferredColor) {
    return preferredColor;
  }

  // If user passed a specific non-white custom color (e.g. red, navy), respect it
  if (
    preferredColor &&
    preferredColor.toLowerCase() !== '#ffffff' &&
    preferredColor.toLowerCase() !== '#fff' &&
    preferredColor.toLowerCase() !== 'white'
  ) {
    return preferredColor;
  }

  return isBrightColor(bgColor) ? DARK_FOREGROUND : LIGHT_FOREGROUND;
}

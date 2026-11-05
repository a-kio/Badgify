/**
 * Character width lookup table for standard system sans-serif font
 * (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif)
 * Normalized at 10px font size.
 */
const CHAR_WIDTHS_10PX: Record<string, number> = {
  a: 5.6, b: 6.2, c: 5.2, d: 6.2, e: 5.5, f: 3.4, g: 6.2, h: 6.0, i: 2.6, j: 2.6,
  k: 5.5, l: 2.6, m: 9.0, n: 6.0, o: 6.2, p: 6.2, q: 6.2, r: 3.8, s: 4.8, t: 3.6,
  u: 6.0, v: 5.4, w: 7.8, x: 5.3, y: 5.4, z: 4.9,
  A: 6.8, B: 6.8, C: 7.2, D: 7.4, E: 6.2, F: 5.8, G: 7.6, H: 7.4, I: 2.8, J: 4.8,
  K: 6.6, L: 5.6, M: 8.8, N: 7.4, O: 7.8, P: 6.4, Q: 7.8, R: 6.8, S: 6.4, T: 6.0,
  U: 7.4, V: 6.8, W: 9.6, X: 6.6, Y: 6.4, Z: 6.2,
  '0': 6.0, '1': 6.0, '2': 6.0, '3': 6.0, '4': 6.0, '5': 6.0, '6': 6.0, '7': 6.0, '8': 6.0, '9': 6.0,
  ' ': 3.0, '.': 2.8, ',': 2.8, ':': 2.8, ';': 2.8, '-': 3.6, '_': 5.5, '+': 6.2,
  '=': 6.2, '>': 6.2, '<': 6.2, '/': 4.0, '\\': 4.0, '|': 2.8, '(': 3.6, ')': 3.6,
  '[': 3.6, ']': 3.6, '{': 3.8, '}': 3.8, '#': 6.2, '@': 9.8, '!': 3.2, '?': 5.2,
  '%': 9.2, '&': 7.6, '*': 4.8, '^': 5.2, '~': 6.0, '`': 3.5, "'": 2.4, '"': 4.0,
  '≥': 6.5, '≤': 6.5, '·': 3.2, '•': 4.0,
};

const DEFAULT_CHAR_WIDTH_10PX = 6.0;

/**
 * Calculates accurate rendered width of text in pixels.
 * @param text The string to measure
 * @param fontSize Font size in pixels (default: 11.5)
 * @param isBold Whether the font weight is bold (700) (default: true)
 * @param letterSpacing Additional letter-spacing in pixels (default: 0.3)
 */
export function measureText(
  text: string,
  fontSize = 11.5,
  isBold = true,
  letterSpacing = 0.3
): number {
  if (!text) return 0;
  const scale = fontSize / 10;
  const boldMultiplier = isBold ? 1.08 : 1.0;

  let width = 0;
  for (const char of text) {
    const baseWidth = CHAR_WIDTHS_10PX[char] ?? DEFAULT_CHAR_WIDTH_10PX;
    width += baseWidth * scale * boldMultiplier + letterSpacing;
  }

  return Math.ceil(width);
}

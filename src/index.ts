export { generateBadge } from './generator.js';
export { ICONS, type IconName } from './icons.js';
export { PALETTE, type PaletteColor } from './palette.js';
export { PRESETS, getPreset, listPresets, type PresetId } from './presets.js';
export { measureText } from './text-width.js';
export type {
  BadgeOptions,
  BadgeRadius,
  BadgeStyle,
  Preset,
} from './types.js';

import { generateBadge } from './generator.js';
import { getPreset } from './presets.js';
import type { BadgeOptions } from './types.js';

/**
 * Convenience helper to render a badge directly from a preset ID with overrides.
 */
export function badgeFromPreset(presetId: string, overrides: Partial<BadgeOptions> = {}): string {
  const preset = getPreset(presetId);
  if (!preset) {
    throw new Error(`Preset "${presetId}" not found. Run badgify list to see available presets.`);
  }

  return generateBadge({
    value: preset.value,
    label: preset.label,
    color: preset.color,
    icon: preset.icon,
    style: preset.defaultStyle,
    ...overrides,
  });
}

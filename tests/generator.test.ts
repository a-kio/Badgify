import { describe, expect, it } from 'vitest';
import {
  PALETTE,
  badgeFromPreset,
  generateBadge,
  getPreset,
  listPresets,
  measureText,
} from '../src/index.js';

describe('Badgify Engine', () => {
  it('measures text with realistic widths', () => {
    const w1 = measureText('MIT');
    const w2 = measureText('Node.js >= 22.0.0');
    expect(w1).toBeGreaterThan(15);
    expect(w2).toBeGreaterThan(w1);
  });

  it('generates solid style badge without split left container', () => {
    const svg = generateBadge({
      value: 'React Native',
      color: PALETTE.skyBlue,
      icon: 'react',
      style: 'solid',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('fill="#0284c7"');
    expect(svg).toContain('React Native');
    // Solid badges do not use split clipPaths or left containers
    expect(svg).not.toContain('<clipPath');
    expect(svg).not.toContain('fill="#181d26"');
  });

  it('generates split style badge with dark left side and solid value block', () => {
    const svg = generateBadge({
      label: 'license',
      value: 'MIT',
      color: PALETTE.electricBlue,
      icon: 'osi',
      style: 'split',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('<clipPath');
    expect(svg).toContain('fill="#181d26"');
    expect(svg).toContain('fill="#2563eb"');
    expect(svg).toContain('license');
    expect(svg).toContain('MIT');
  });

  it('generates outline style badge', () => {
    const svg = generateBadge({
      value: 'TypeScript',
      color: PALETTE.electricBlue,
      icon: 'typescript',
      style: 'outline',
    });

    expect(svg).toContain('stroke="#2563eb"');
    expect(svg).toContain('TypeScript');
  });

  it('contains over 40 rich presets across frontend, backend, devops, and meta', () => {
    const presets = listPresets();
    expect(presets.length).toBeGreaterThan(40);

    const reactPreset = getPreset('react-native');
    expect(reactPreset).toBeDefined();
    expect(reactPreset?.name).toBe('React Native');

    const nodePreset = getPreset('node');
    expect(nodePreset).toBeDefined();

    const mitPreset = getPreset('mit');
    expect(mitPreset).toBeDefined();
  });

  it('badgeFromPreset generates valid SVG', () => {
    const svg = badgeFromPreset('react-native');
    expect(svg).toContain('React Native');
    expect(svg).toContain('</svg>');
  });

  it('does not contain ugly #0d9488 in curated palette or presets', () => {
    const paletteValues = Object.values(PALETTE);
    expect(paletteValues).not.toContain('#0d9488');

    const presetColors = listPresets().map((p) => p.color);
    expect(presetColors).not.toContain('#0d9488');
  });
});

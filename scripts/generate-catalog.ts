import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRESETS } from '../src/presets.js';
import { generateBadge } from '../src/generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const solidDir = path.join(rootDir, 'badges', 'solid');
const splitDir = path.join(rootDir, 'badges', 'split');

fs.mkdirSync(solidDir, { recursive: true });
fs.mkdirSync(splitDir, { recursive: true });

let count = 0;

for (const [id, preset] of Object.entries(PRESETS)) {
  // 1. Solid badge
  const solidSvg = generateBadge({
    value: preset.value,
    color: preset.color,
    icon: preset.icon,
    style: 'solid',
    radius: 'rounded',
    height: 28,
  });
  fs.writeFileSync(path.join(solidDir, `${id}.svg`), solidSvg, 'utf-8');

  // 2. Split badge
  const splitSvg = generateBadge({
    value: preset.value,
    label: preset.label || preset.category || 'status',
    color: preset.color,
    icon: preset.icon,
    style: 'split',
    radius: 'rounded',
    height: 28,
  });
  fs.writeFileSync(path.join(splitDir, `${id}.svg`), splitSvg, 'utf-8');

  count += 2;
}

console.log(`Generated ${count} catalog SVGs in badges/solid/ and badges/split/!`);

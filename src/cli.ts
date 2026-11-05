import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { generateBadge } from './generator.js';
import { PALETTE } from './palette.js';
import { getPreset, listPresets } from './presets.js';
import type { BadgeStyle } from './types.js';

const program = new Command();

program
  .name('badgify')
  .description('High-end, aesthetic, minimalistic SVG badge generator for modern developers.')
  .version('1.0.0');

// Command: badgify create
program
  .command('create')
  .description('Create a custom developer badge')
  .requiredOption('-v, --value <text>', 'Primary badge value (e.g. "React Native", "v2.0", "MIT")')
  .option('-l, --label <text>', 'Left-side label for split style (e.g. "license", "node")')
  .option('-c, --color <hex>', 'Vibrant accent color hex code (e.g. "#0284c7")', PALETTE.electricBlue)
  .option('-s, --style <type>', 'Badge style: solid, split, or outline', 'solid')
  .option('-i, --icon <nameOrPath>', 'Icon name (e.g. "react", "node", "typescript") or SVG path')
  .option('--text-color <hex>', 'Explicit text color override')
  .option('--icon-color <hex>', 'Explicit icon color override')
  .option('--no-auto-contrast', 'Disable automatic foreground contrast adaptation on bright backgrounds')
  .option('-h, --height <number>', 'Height in pixels (24, 28, 32)', (v) => Number.parseInt(v, 10), 28)
  .option('-r, --radius <typeOrNum>', 'Corner radius: rounded, pill, sharp, or number', 'rounded')
  .option('-o, --output <file>', 'Save SVG directly to file')
  .action((options) => {
    const svg = generateBadge({
      value: options.value,
      label: options.label,
      color: options.color,
      style: options.style as BadgeStyle,
      icon: options.icon,
      textColor: options.textColor,
      iconColor: options.iconColor,
      autoContrast: options.autoContrast,
      height: options.height,
      radius: options.radius,
    });

    if (options.output) {
      const outPath = path.resolve(process.cwd(), options.output);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, svg, 'utf-8');
      console.log(`✔ Created badge at ${options.output}`);
    } else {
      process.stdout.write(svg);
    }
  });

// Command: badgify preset
program
  .command('preset <id>')
  .description('Generate a badge from a built-in tech stack or category preset')
  .option('-s, --style <type>', 'Override badge style: solid, split, or outline')
  .option('-c, --color <hex>', 'Override accent color')
  .option('-v, --value <text>', 'Override badge text value')
  .option('-l, --label <text>', 'Override left label')
  .option('--text-color <hex>', 'Explicit text color override')
  .option('--icon-color <hex>', 'Explicit icon color override')
  .option('--no-auto-contrast', 'Disable automatic foreground contrast adaptation on bright backgrounds')
  .option('-o, --output <file>', 'Save SVG directly to file')
  .action((id, options) => {
    const preset = getPreset(id);
    if (!preset) {
      console.error(`✖ Preset "${id}" not found. Run "badgify list" to see available presets.`);
      process.exit(1);
    }

    const svg = generateBadge({
      value: options.value ?? preset.value,
      label: options.label ?? preset.label,
      color: options.color ?? preset.color,
      textColor: options.textColor,
      iconColor: options.iconColor,
      autoContrast: options.autoContrast,
      style: (options.style as BadgeStyle) ?? preset.defaultStyle,
      icon: preset.icon,
    });

    if (options.output) {
      const outPath = path.resolve(process.cwd(), options.output);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, svg, 'utf-8');
      console.log(`✔ Created ${preset.name} badge at ${options.output}`);
    } else {
      process.stdout.write(svg);
    }
  });

// Command: badgify list
program
  .command('list')
  .description('List all available presets')
  .action(() => {
    const presets = listPresets();
    console.log('\nAvailable Badgify Presets:\n');
    const categories = ['frontend', 'mobile', 'backend', 'database', 'devops', 'testing', 'tooling', 'meta'] as const;

    for (const cat of categories) {
      const catPresets = presets.filter((p) => p.category === cat);
      if (catPresets.length === 0) continue;
      console.log(`  \x1b[1m\x1b[36m[${cat.toUpperCase()}]\x1b[0m`);
      for (const p of catPresets) {
        const styleTag = p.defaultStyle === 'split' ? '\x1b[33m(split)\x1b[0m' : '\x1b[32m(solid)\x1b[0m';
        console.log(`    • \x1b[1m${p.id.padEnd(20)}\x1b[0m ${p.name.padEnd(22)} ${styleTag.padEnd(16)} ${p.description ?? ''}`);
      }
      console.log();
    }
  });

// Command: badgify catalog
program
  .command('catalog')
  .description('Generate catalog of all preset SVGs into a target directory')
  .option('-d, --dir <path>', 'Destination directory', './badges')
  .action((options) => {
    const dest = path.resolve(process.cwd(), options.dir);
    const solidDir = path.join(dest, 'solid');
    const splitDir = path.join(dest, 'split');
    fs.mkdirSync(solidDir, { recursive: true });
    fs.mkdirSync(splitDir, { recursive: true });

    const presets = listPresets();
    for (const p of presets) {
      // Solid version
      const solidSvg = generateBadge({
        value: p.value,
        color: p.color,
        icon: p.icon,
        style: 'solid',
      });
      fs.writeFileSync(path.join(solidDir, `${p.id}.svg`), solidSvg, 'utf-8');

      // Split version
      const splitSvg = generateBadge({
        value: p.value,
        label: p.label ?? p.id,
        color: p.color,
        icon: p.icon,
        style: 'split',
      });
      fs.writeFileSync(path.join(splitDir, `${p.id}.svg`), splitSvg, 'utf-8');
    }

    console.log(`✔ Successfully generated ${presets.length * 2} badges in ${options.dir}`);
  });

// Command: badgify ui / studio
program
  .command('ui')
  .alias('studio')
  .description('Open Badgify Studio in your default browser')
  .action(() => {
    const currentDir = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
    const studioPath = path.resolve(currentDir, '../studio/index.html');
    console.log(`🚀 Opening Badgify Studio: ${studioPath}`);
    const startCmd = process.platform === 'win32' ? `start "" "${studioPath}"` : process.platform === 'darwin' ? `open "${studioPath}"` : `xdg-open "${studioPath}"`;
    exec(startCmd);
  });

program.parse();

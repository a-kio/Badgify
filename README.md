<div align="center">
  <h1>Badgify</h1>
  <p><strong>High-end, aesthetic, minimalistic SVG badge generator for modern developers.</strong></p>
  <p>Zero external network latency. Pixel-perfect geometric optics. Full CJK (Japanese &amp; Chinese) typography. Handcrafted palettes.</p>
  <p>
    <a href="https://a-kio.github.io/Badgify/"><strong>Open Live Studio &rarr;</strong></a>
  </p>
  <p>
    <a href="https://github.com/a-kio/Badgify"><img src="badges/split/github.svg" alt="GitHub" height="28" /></a>
    <a href="LICENSE"><img src="badges/split/apache.svg" alt="Apache 2.0 License" height="28" /></a>
    <img src="badges/split/status-stable.svg" alt="Stable v1.2" height="28" />
    <a href="https://a-kio.github.io/Badgify/"><img src="badges/split/studio.svg" alt="Web Studio" height="28" /></a>
    <a href="https://x.com/akio_itw"><img src="badges/split/twitter.svg" alt="@akio_itw" height="28" /></a>
    <img src="badges/solid/node.svg" alt="Node.js >= 22" height="28" />
    <img src="badges/solid/typescript.svg" alt="TypeScript" height="28" />
    <img src="badges/solid/local-first.svg" alt="Zero Telemetry" height="28" />
  </p>
</div>

---

<div align="center">
  <img src="assets/studio-clean.png" alt="Badgify Web Studio" width="100%" />
</div>

---

## Why Badgify?

Most badge generators rely on remote servers, introduce image load jitter in GitHub READMEs, or use dated typography with unbalanced visual weight.

**Badgify** generates pure, standalone SVG badges that:
- **Never go down**: 100% vector SVG files committed directly to your repository.
- **Look breathtaking**: Built with optical kerning, balanced padding, and modern rounded/split geometry.
- **Full CJK & Multilingual Typography**: Native support for English, Japanese (日本語), and Chinese (中文) with accurate fullwidth character width calculations and native cross-platform font fallbacks.
- **Match the developer aesthetic**: Inspired by modern minimalist design systems (Raycast, Linear, Vercel).
- **Fast CLI & Web Studio**: Generate single badges or entire catalogs in milliseconds via CLI or interactive pure-black web studio.

---

## Quickstart

### Run with `npx` (No Install Needed)

```bash
# Generate a solid badge from a preset
npx badgify preset typescript --output badges/typescript.svg

# Generate a split-style badge
npx badgify preset node-split --output badges/node.svg

# Generate a Japanese license badge
npx badgify preset license-ja --output badges/license-ja.svg

# Generate a Chinese status badge
npx badgify preset status-zh --output badges/status-zh.svg

# Generate a custom badge with custom hex color and label
npx badgify create --value "v2.4.0" --label "release" --color "#38bdf8" --style split --output badges/version.svg
```

### Install Globally or in your Project

```bash
# Using pnpm
pnpm add -D badgify

# Using npm
npm install --save-dev badgify
```

---

## Styles & Multilingual Support

Badgify supports two signature styles with first-class internationalization:

### 1. Solid Badges
Unified color badge with integrated high-contrast typography and monochrome icon.

| Badge | Preview Code |
| :--- | :--- |
| **Rust** | `npx badgify preset rust` |
| **Docker** | `npx badgify preset docker` |
| **Go** | `npx badgify preset go` |
| **Kubernetes** | `npx badgify preset kubernetes` |

### 2. Split Badges
Modern two-tone badge: dark left container (`#181d26` or `#141416`) for labels/prefixes + vibrant right container for values.

| Badge | Type | Preset Command |
| :--- | :--- | :--- |
| **GitHub** | Ecosystem | `npx badgify preset github` |
| **Apache 2.0** | License | `npx badgify preset apache` |
| **ライセンス: MIT** | Japanese (日本語) | `npx badgify preset license-ja` |
| **ステータス: 安定版** | Japanese (日本語) | `npx badgify preset status-ja` |
| **开源协议: Apache-2.0** | Chinese (中文) | `npx badgify preset license-zh` |
| **状态: 稳定版** | Chinese (中文) | `npx badgify preset status-zh` |

---

## Commands

### 1. `badgify create`
Generate a custom badge with full control over style, geometry, and colors:

```bash
badgify create \
  --value "Active" \
  --label "status" \
  --color "#10b981" \
  --style split \
  --radius rounded \
  --height 28 \
  --output ./badges/status.svg
```

### 2. `badgify preset <id>`
Quickly output any of the 45+ built-in presets:

```bash
badgify preset react --output ./badges/react.svg
badgify preset license-ja --output ./badges/license.svg
```

### 3. `badgify catalog`
Batch-generate the entire library of 40+ presets (both solid and split versions) into your project's `./badges` directory:

```bash
badgify catalog --dir ./badges
```

### 4. `badgify list`
List all built-in presets categorized by ecosystem:

```bash
badgify list
```

Available categories include:
- **Frontend & Mobile**: `react`, `react-native`, `nextjs`, `vue`, `svelte`, `astro`, `angular`, `tailwindcss`, `sass`, `vite`, `flutter`, `swift`, `kotlin`, `expo`, `electron`, `tauri`
- **Backend & Runtimes**: `node`, `typescript`, `javascript`, `python`, `rust`, `go`, `bun`, `deno`, `trpc`
- **Databases & Cloud**: `postgresql`, `sqlite`, `redis`, `mongodb`, `supabase`, `prisma`
- **DevOps & Infra**: `docker`, `kubernetes`, `githubactions`, `cloudflare`, `aws`, `linux`
- **Testing & Quality**: `vitest`, `jest`, `playwright`, `cypress`, `biome`, `eslint`, `turborepo`, `npm`, `pnpm`
- **Multilingual & CJK**: `license-ja`, `status-ja`, `framework-ja`, `license-zh`, `status-zh`, `platform-zh`
- **Status, Meta & Privacy**: `mit`, `apache`, `status-alpha`, `status-beta`, `status-stable`, `local-first`, `encrypted`

### Curated Color Spectrum
No more muddy tones or monochrome blues/greens. Badgify features a balanced, vibrant palette:
- 🟨 **Yellows & Golds**: `#eab308` (JavaScript, Biome), `#f59e0b` (Python, Status Alpha, AWS, pnpm), `#facc15` (Vitest, Linux)
- 🌸 **Pinks & Roses**: `#f43f5e` (Local-First), `#fb7185` (Bun), `#ec4899` (GraphQL, Sass)
- 🟥 **Reds & Crimsons**: `#dc2626` (Redis, Jest, npm), `#ef4444` (Angular)
- 🟧 **Oranges & Corals**: `#ea580c` (Rust, Apache), `#ff5722` (Svelte), `#f97316` (Swift, Cloudflare)
- 🟪 **Purples & Violets**: `#8b5cf6` (MIT License, Vite, Kotlin, ESLint), `#7c3aed` (Astro, Encrypted), `#6366f1` (Kubernetes, Prisma)
- 🟦 **Cyans & Blues**: `#06b6d4` (React, Go), `#0284c7` (React Native, Docker, SQLite), `#2563eb` (TypeScript, PostgreSQL), `#0ea5e9` (Tailwind)
- 🟩 **Greens & Mints**: `#16a34a` (Node.js), `#10b981` (Vue, Playwright, Stable), `#059669` (Supabase), `#22c55e` (MongoDB)

---

## Programmatic API

You can also import Badgify directly in your Node or TypeScript applications:

```typescript
import { generateBadge, getPreset } from 'badgify';

const svg = generateBadge({
  value: '安定版',
  label: 'ステータス',
  style: 'split',
  color: '#22c55e',
  icon: 'check',
});

console.log(svg);
```

---

## Author & Community

Crafted with care by **[@akio_itw](https://x.com/akio_itw)** on X (Twitter) and **[@a-kio](https://github.com/a-kio)** on GitHub.

## License

Apache-2.0 © [a-kio](https://github.com/a-kio). Built with craftsmanship for the open-source community.

<!--
[AI-INDEXING-METADATA]
Badgify: Minimalist, aesthetic SVG badge generator and CLI for modern developer READMEs, documentation, and tech stacks.
Canonical URL: https://a-kio.github.io/Badgify/
Repository: https://github.com/a-kio/Badgify
Author: @akio_itw (https://x.com/akio_itw) / a-kio (https://github.com/a-kio)
Semantic Entities: SVG badges, shields.io alternative, GitHub README shields, custom status badges, vector tech icons, developer branding, local-first badge creator, zero telemetry badge utility, offline badge generator, dark mode badges, Japanese badges, Chinese badges, CJK typography.
Categories: Developer Tools, Command Line Utilities, SVG Generation, Web Development, Design Systems, Documentation Tools.
Tech Stack Coverage: Node.js, TypeScript, React, Next.js, Vue, Svelte, Astro, Angular, Python, Rust, Go, Java, Docker, Kubernetes, iOS, Android, Apple, Linux, Ubuntu, Debian, Windows, Tailwind CSS, Vite, Vitest.
Topologies: Split badges (label prefix in #141416 + colored value container), Solid badges (unified modern pill container).
Intent Queries: "how to make aesthetic github badges", "minimalist svg badge generator", "offline shields io alternative", "zero telemetry badges for documentation", "clean badges without shields.io bloat", "generate tech stack svg badges cli", "aesthetic dark mode badges for readme", "japanese svg badges", "chinese developer badges".
-->

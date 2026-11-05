type BadgeStyle = 'solid' | 'split' | 'outline';
type BadgeRadius = 'rounded' | 'pill' | 'sharp' | number;
interface BadgeOptions {
    /** The primary value / text of the badge (e.g. "React Native", "MIT", "≥ 22.0.0") */
    value: string;
    /** Optional left-side label for split badges (e.g. "license", "node", "status") */
    label?: string;
    /** Primary accent color (hex string, e.g. "#0284c7", "#388e3c", "#f59e0b") */
    color?: string;
    /** Left-side background color for split style (default: "#181d26") */
    leftColor?: string;
    /** Text color on the value side (default: "#ffffff") */
    textColor?: string;
    /** Text color on the label side for split style (default: "#e2e8f0") */
    labelColor?: string;
    /** SVG icon path string or named icon slug */
    icon?: string;
    /** Color of the icon (default: "#ffffff") */
    iconColor?: string;
    /** ViewBox of the icon if custom (default: "0 0 24 24") */
    iconViewBox?: string;
    /** Badge display style: 'solid' (unified single color) | 'split' (left label + right value) | 'outline' */
    style?: BadgeStyle;
    /** Badge height in pixels (default: 28, supported: 24, 28, 32) */
    height?: number;
    /** Corner radius: 'rounded' (6px) | 'pill' (half-height) | 'sharp' (0px) | number */
    radius?: BadgeRadius;
    /** Letter spacing for text (default: 0.3) */
    letterSpacing?: number;
    /** Accessibility label (title & aria-label attribute) */
    ariaLabel?: string;
}
interface Preset {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'testing' | 'tooling' | 'meta';
    defaultStyle: BadgeStyle;
    label?: string;
    value: string;
    color: string;
    icon?: string;
    iconViewBox?: string;
    description?: string;
}

/**
 * Generates high-end SVG markup for a developer badge.
 */
declare function generateBadge(options: BadgeOptions): string;

/**
 * Official brand & system SVG vector paths (viewBox: 0 0 24 24)
 */
declare const ICONS: Record<string, string>;
type IconName = keyof typeof ICONS;

/**
 * High-end vibrant color system for Badgify.
 * Curated for modern developer aesthetics, clean contrast, and maximum legibility.
 * No muddy or washed-out tones (e.g. #0d9488 is excluded).
 */
declare const PALETTE: {
    readonly electricBlue: "#2563eb";
    readonly skyBlue: "#0284c7";
    readonly cyan: "#06b6d4";
    readonly neonCyan: "#00d8ff";
    readonly tailwindCyan: "#0ea5e9";
    readonly nodeGreen: "#388e3c";
    readonly emerald: "#10b981";
    readonly mint: "#059669";
    readonly neonMint: "#00dc82";
    readonly brightGreen: "#22c55e";
    readonly amber: "#d97706";
    readonly gold: "#f59e0b";
    readonly sunflower: "#fbbf24";
    readonly orange: "#f97316";
    readonly deepOrange: "#ea580c";
    readonly coral: "#ff5722";
    readonly crimson: "#dc2626";
    readonly rose: "#f43f5e";
    readonly ruby: "#e11d48";
    readonly fuchsia: "#d946ef";
    readonly magenta: "#ec4899";
    readonly violet: "#7c3aed";
    readonly purple: "#8b5cf6";
    readonly indigo: "#4f46e5";
    readonly deepIndigo: "#3730a3";
    readonly slateDark: "#181d26";
    readonly slateBorder: "#333b47";
    readonly slateDeep: "#0f172a";
    readonly white: "#ffffff";
    readonly lightGray: "#e2e8f0";
    readonly mutedGray: "#94a3b8";
};
type PaletteColor = keyof typeof PALETTE;

declare const PRESETS: Record<string, Preset>;
type PresetId = keyof typeof PRESETS;
declare function getPreset(id: string): Preset | undefined;
declare function listPresets(): Preset[];

/**
 * Calculates accurate rendered width of text in pixels.
 * @param text The string to measure
 * @param fontSize Font size in pixels (default: 11.5)
 * @param isBold Whether the font weight is bold (700) (default: true)
 * @param letterSpacing Additional letter-spacing in pixels (default: 0.3)
 */
declare function measureText(text: string, fontSize?: number, isBold?: boolean, letterSpacing?: number): number;

/**
 * Convenience helper to render a badge directly from a preset ID with overrides.
 */
declare function badgeFromPreset(presetId: string, overrides?: Partial<BadgeOptions>): string;

export { type BadgeOptions, type BadgeRadius, type BadgeStyle, ICONS, type IconName, PALETTE, PRESETS, type PaletteColor, type Preset, type PresetId, badgeFromPreset, generateBadge, getPreset, listPresets, measureText };

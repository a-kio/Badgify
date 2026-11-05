export type BadgeStyle = 'solid' | 'split' | 'outline';

export type BadgeRadius = 'rounded' | 'pill' | 'sharp' | number;

export interface BadgeOptions {
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

export interface Preset {
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

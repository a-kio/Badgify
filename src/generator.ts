import { getOptimalForeground, isBrightColor } from './contrast.js';
import { ICONS, type IconName } from './icons.js';
import { PALETTE } from './palette.js';
import { measureText } from './text-width.js';
import type { BadgeOptions, BadgeRadius, BadgeStyle } from './types.js';

export const DEFAULT_FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', Meiryo, 'Microsoft YaHei', 'PingFang SC', 'Noto Sans CJK SC', 'Noto Sans CJK JP', sans-serif";

function resolveRadius(radius: BadgeRadius | undefined, height: number): number {
  if (typeof radius === 'number') return radius;
  if (radius === 'sharp') return 0;
  if (radius === 'pill') return Math.floor(height / 2);
  // Default 'rounded'
  return height >= 32 ? 8 : 6;
}

function resolveIconPath(icon: string | undefined): string | null {
  if (!icon) return null;
  if (icon in ICONS) {
    return ICONS[icon as IconName] ?? null;
  }
  // If it's already an SVG path string
  if (icon.trim().startsWith('M') || icon.trim().startsWith('m')) {
    return icon;
  }
  return null;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates high-end SVG markup for a developer badge.
 */
export function generateBadge(options: BadgeOptions): string {
  const {
    value,
    label,
    color = PALETTE.electricBlue,
    leftColor = PALETTE.slateDark,
    textColor,
    labelColor,
    icon,
    iconColor,
    iconViewBox = '0 0 24 24',
    style = 'solid',
    height = 28,
    radius,
    letterSpacing = 0.3,
    ariaLabel,
    autoContrast = true,
  } = options;

  const rx = resolveRadius(radius, height);
  const iconPath = resolveIconPath(icon);

  const fontSize = height <= 24 ? 10 : height >= 32 ? 13 : 11.5;
  const labelFontSize = height <= 24 ? 9.5 : height >= 32 ? 12 : 11;
  const iconSize = height <= 24 ? 14 : height >= 32 ? 18 : 16;
  const iconY = Math.round((height - iconSize) / 2);
  const textY = Math.round(height / 2 + fontSize / 2 - 1.5);

  const safeValue = escapeXml(value);
  const safeLabel = label ? escapeXml(label) : '';
  const titleText = ariaLabel ?? (label ? `${label}: ${value}` : value);
  const safeTitle = escapeXml(titleText);

  // 1. STYLE: SOLID (Unified single color tag with auto-contrast adaptation)
  if (style === 'solid') {
    const isBrightBg = isBrightColor(color);
    const resolvedTextColor = getOptimalForeground(color, textColor, autoContrast);
    const resolvedIconColor = getOptimalForeground(color, iconColor, autoContrast);

    const padLeft = iconPath ? 10 : 12;
    const padRight = 12;
    const iconGap = iconPath ? 7 : 0;
    const iconTotal = iconPath ? iconSize + iconGap : 0;

    const textWidth = measureText(value, fontSize, true, letterSpacing);
    const totalWidth = padLeft + iconTotal + textWidth + padRight;

    const iconX = padLeft;
    const textX = padLeft + iconTotal;

    const iconSvg = iconPath
      ? `  <svg x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" viewBox="${iconViewBox}" aria-hidden="true">
    <path fill="${resolvedIconColor}" d="${iconPath}"/>
  </svg>\n`
      : '';

    const borderSvg = isBrightBg
      ? `  <rect width="${totalWidth}" height="${height}" rx="${rx}" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>\n`
      : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" fill="none" role="img" aria-label="${safeTitle}">
  <title>${safeTitle}</title>
  <rect width="${totalWidth}" height="${height}" rx="${rx}" fill="${color}"/>
${iconSvg}  <text x="${textX}" y="${textY}" fill="${resolvedTextColor}" font-family="${DEFAULT_FONT_FAMILY}" font-size="${fontSize}" font-weight="700" letter-spacing="${letterSpacing}px">${safeValue}</text>
${borderSvg}</svg>
`;
  }

  // 2. STYLE: SPLIT (Left label container + Right value block with independent auto-contrast)
  if (style === 'split') {
    const isBrightLeft = isBrightColor(leftColor);
    const resolvedIconColor = getOptimalForeground(leftColor, iconColor, autoContrast);
    const resolvedLabelColor = labelColor ?? (isBrightLeft ? '#18181b' : PALETTE.lightGray);
    const resolvedValueColor = getOptimalForeground(color, textColor, autoContrast);

    const padLeft = iconPath ? 10 : 12;
    const iconGap = iconPath ? 7 : 0;
    const iconTotal = iconPath ? iconSize + iconGap : 0;

    const effectiveLabel = label || 'status';
    const labelWidth = measureText(effectiveLabel, labelFontSize, false, letterSpacing);
    const leftPadInner = 10;
    const leftWidth = padLeft + iconTotal + labelWidth + leftPadInner;

    const valueWidth = measureText(value, fontSize, true, letterSpacing);
    const rightPadInner = 10;
    const rightPadOuter = 12;
    const rightWidth = rightPadInner + valueWidth + rightPadOuter;

    const totalWidth = leftWidth + rightWidth;
    const valueCenterX = Math.round(leftWidth + rightWidth / 2);

    const iconX = padLeft;
    const labelX = padLeft + iconTotal;

    const clipId = `clip_${Math.random().toString(36).substring(2, 8)}`;

    const iconSvg = iconPath
      ? `    <svg x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" viewBox="${iconViewBox}" aria-hidden="true">
      <path fill="${resolvedIconColor}" d="${iconPath}"/>
    </svg>\n`
      : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" fill="none" role="img" aria-label="${safeTitle}">
  <title>${safeTitle}</title>
  <clipPath id="${clipId}"><rect width="${totalWidth}" height="${height}" rx="${rx}"/></clipPath>
  <g clip-path="url(#${clipId})">
    <rect width="${leftWidth}" height="${height}" fill="${leftColor}"/>
${iconSvg}    <text x="${labelX}" y="${textY}" fill="${resolvedLabelColor}" font-family="${DEFAULT_FONT_FAMILY}" font-size="${labelFontSize}" font-weight="500" letter-spacing="${letterSpacing}px">${safeLabel || effectiveLabel}</text>
    <rect x="${leftWidth}" width="${rightWidth}" height="${height}" fill="${color}"/>
    <text x="${valueCenterX}" y="${textY}" fill="${resolvedValueColor}" font-family="${DEFAULT_FONT_FAMILY}" font-size="${fontSize}" font-weight="700" text-anchor="middle" letter-spacing="${letterSpacing}px">${safeValue}</text>
  </g>
  <rect width="${totalWidth}" height="${height}" rx="${rx}" fill="none" stroke="${PALETTE.slateBorder}" stroke-width="1"/>
</svg>
`;
  }

  // 3. STYLE: OUTLINE (Translucent dark card with crisp colored border & text)
  const padLeft = iconPath ? 10 : 12;
  const padRight = 12;
  const iconGap = iconPath ? 7 : 0;
  const iconTotal = iconPath ? iconSize + iconGap : 0;

  const fullText = label ? `${label} ${value}` : value;
  const textWidth = measureText(fullText, fontSize, true, letterSpacing);
  const totalWidth = padLeft + iconTotal + textWidth + padRight;

  const iconX = padLeft;
  const textX = padLeft + iconTotal;

  const iconSvg = iconPath
    ? `  <svg x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" viewBox="${iconViewBox}" aria-hidden="true">
    <path fill="${color}" d="${iconPath}"/>
  </svg>\n`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" fill="none" role="img" aria-label="${safeTitle}">
  <title>${safeTitle}</title>
  <rect x="0.5" y="0.5" width="${totalWidth - 1}" height="${height - 1}" rx="${rx}" fill="${PALETTE.slateDeep}" stroke="${color}" stroke-width="1"/>
${iconSvg}  <text x="${textX}" y="${textY}" fill="${color}" font-family="${DEFAULT_FONT_FAMILY}" font-size="${fontSize}" font-weight="700" letter-spacing="${letterSpacing}px">${escapeXml(fullText)}</text>
</svg>
`;
}

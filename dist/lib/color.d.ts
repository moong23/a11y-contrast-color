import type { RGB } from '../types/color';
/**
 * Calculate luminance from RGB values.
 * @param {Array} RGBValue - Array containing R, G, B values.
 * @returns {number} The calculated luminance.
 */
export declare const getLuminance: (RGBValue: RGB) => number;
/**
 * Finds Color which has the contrast bigger than the luminance with the given color.
 * @param {RGB} color
 * @param {number} luminance - 3.0, 4.5, 7.0
 * @returns {RGB} The contrast color.
 */
export declare const getContrastColor: (color: RGB, luminance: number) => number[] | null;

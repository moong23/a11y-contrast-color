import type { RGB } from '../types/color';
/**
 * Calculate contrast ratio between two RGB colors.
 * @param {RGB} color1 - The first RGB color.
 * @param {RGB} color2 - The second RGB color.
 * @returns {number} The contrast ratio.
 */
export declare const getContrastRatio: (color1: RGB, color2: RGB) => number;
/**
 * Calculate luminance from RGB values.
 * @param {Array} RGBValue - Array containing R, G, B values.
 * @returns {number} The calculated luminance.
 */
export declare const getLuminance: (RGBValue: RGB) => number;
/**
 * Finds color which has the contrast greater than the specified luminance with the given color.
 * @param {RGB} color - The base RGB color. (validate if the given color is RGB format)
 * @param {number} luminance - The contrast ratio (3.0, 4.5, 7.0).
 * @throws Will throw an error if the RGB array is invalid or the luminance is invalid.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
export declare const getContrastColor: (color: number[], luminance: number) => RGB | null;

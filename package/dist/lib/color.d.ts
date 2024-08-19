import { type RGB, type RGBElement } from '../types/color';
/**
 * @private
 * Validate the RGB color array.
 * @param {RGB} color - The RGB color array.
 * @throws Will throw an error if the RGB array is invalid.
 */
export declare const validateColor: (color: RGB) => void;
/**
 * @private
 * Validate the target luminance value.
 * @param {number} luminance - The luminance value.
 * @throws Will throw an error if the luminance is invalid.
 */
export declare const validateLuminance: (luminance: number) => void;
/**
 * @private
 * Calculate contrast ratio between two luminance values.
 * @param {number} lum1 - The first luminance value.
 * @param {number} lum2 - The second luminance value.
 * @returns {number} The contrast ratio.
 */
export declare const calculateContrastRatio: (lum1: number, lum2: number) => number;
/**
 * Calculate contrast ratio between two RGB colors.
 * @param {RGB} color1 - The first RGB color.
 * @param {RGB} color2 - The second RGB color.
 * @returns {number} The contrast ratio.
 */
export declare const getContrastRatio: (color1: RGB, color2: RGB) => number;
/**
 * Calculate luminance from RGB values.
 * @param {RGB} RGBValue - The RGB color array.
 * @returns {number} The calculated luminance.
 */
export declare const getLuminance: (RGBValue: RGB) => number;
/**
 * @private
 * Normalize an 8-bit RGB element to a 0-1 range.
 * @param {number} element - The 8-bit RGB element.
 * @returns {number} The normalized value.
 */
export declare const normalizeElement: (element: number) => number;
/**
 * @private
 * Linearize an RGB element (convert to linear RGB space).
 * @param {number} element - The normalized RGB element.
 * @returns {number} The linearized value.
 */
export declare const linearizeElement: (element: number) => number;
/**
 * @private
 * Denormalize a linear RGB element back to 8-bit RGB.
 * @param {number} element - The linear RGB element.
 * @returns {number} The denormalized value.
 */
export declare const denormalizeElement: (element: number) => number;
/**
 * @private
 * Delinearize an RGB element (convert from linear RGB space).
 * @param {number} element - The linear RGB element.
 * @returns {number} The delinearized value.
 */
export declare const delinearizeElement: (element: number) => number;
/**
 * @private
 * Convert an 8-bit RGB channel value to a linear RGB value.
 * @param {number} channelValue - The 8-bit RGB channel value.
 * @returns {number} The linear RGB value.
 */
export declare const RGB8bitToLinear: (channelValue: number) => number;
/**
 * @private
 * Convert a linear RGB value to an 8-bit RGB channel value.
 * @param {number} linearValue - The linear RGB value.
 * @returns {number} The 8-bit RGB channel value.
 */
export declare const RGBLinearTo8bit: (linearValue: number) => number;
/**
 * @private
 * Calculate the lower and upper bounds for contrast calculation.
 * @param {number} multiplier - The multiplier for the bounds.
 * @param {number} luminance - The luminance value.
 * @returns {[number, number]} The lower and upper bounds.
 */
export declare const calculateBounds: (multiplier: number, luminance: number) => [number, number];
/**
 * @private
 * Calculate the total length between the lower and upper bounds.
 * @param {number[]} bounds - The bounds as an array of two numbers.
 * @returns {number} The total length between the bounds.
 */
export declare const calculateTotalLength: (bounds: number[]) => number;
/**
 * @private
 * Get the linear RGB value from the luminance and target RGB element.
 * @param {number} luminance - The luminance value.
 * @param {RGBElement} target - The target RGB element (R, G, or B).
 * @returns {number} The linear RGB value.
 */
export declare const LinearRGBfromLuminance: (luminance: number, target: RGBElement) => number;
/**
 * @private
 * Generate target luminance within bounds using randomization.
 * @param {number} totalLength - The total length between bounds.
 * @param {number} lowerBound - The lower bound for luminance.
 * @param {number} upperBound - The upper bound for luminance.
 * @param {number} weight - The weight of the RGB channel.
 * @returns {number} The target luminance value.
 */
export declare const generateTargetLuminance: (totalLength: number, lowerBound: number, upperBound: number, weight: number) => number;
/**
 * @private
 * Finds a color that has the contrast greater than the specified luminance with the given base color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The target luminance value.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
export declare const calculateContrastColorInnerLogic: (color: RGB, luminance: number) => RGB | null;
/**
 * Finds a color that has a contrast ratio greater than the specified luminance with the given base color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The target luminance value for the contrast ratio (e.g., 3.0, 4.5, 7.0).
 * @throws Will throw an error if the RGB array is invalid or the luminance is invalid.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
export declare const getContrastColor: (color: number[], luminance: number) => RGB | null;

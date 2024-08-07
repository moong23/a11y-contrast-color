import type { RGB, RGBElement } from '../types/color';
import { RGBChannelWeights } from '../types/color';

/**
 * @private
 * Validate the RGB color array.
 * @param {RGB} color - The RGB color array.
 * @throws Will throw an error if the RGB array is invalid.
 */
const validateColor = (color: RGB) => {
  if (!Array.isArray(color) || color.length !== 3) {
    throw new Error(
      'Invalid RGB array. RGB should be an array of three numbers.'
    );
  }
  if (
    !color.every(
      (value) => typeof value === 'number' && value >= 0 && value <= 255
    )
  ) {
    throw new Error(
      'Invalid RGB values. Each value should be a number between 0 and 255.'
    );
  }
};

/**
 * @private
 * Validate the target luminance value.
 * @param {number} luminance - The luminance value.
 * @throws Will throw an error if the luminance is invalid.
 */
const validateLuminance = (luminance: number) => {
  if (typeof luminance !== 'number' || luminance <= 0) {
    throw new Error(
      'Invalid target luminance. Target luminance should be a number greater than 0.'
    );
  } else if (luminance > 21) {
    throw new Error(
      'Invalid target luminance. Target luminance should be a number less than or equal to 21.'
    );
  }
};

/**
 * @private
 * Calculate contrast ratio between two luminance values.
 * @param {number} lum1 - The first luminance value.
 * @param {number} lum2 - The second luminance value.
 * @returns {number} The contrast ratio.
 */
const calculateContrastRatio = (lum1: number, lum2: number): number => {
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

/**
 * Calculate contrast ratio between two RGB colors.
 * @param {RGB} color1 - The first RGB color.
 * @param {RGB} color2 - The second RGB color.
 * @returns {number} The contrast ratio.
 */
export const getContrastRatio = (
  color1: number[],
  color2: number[]
): number => {
  validateColor(color1 as RGB);
  validateColor(color2 as RGB);

  return calculateContrastRatio(
    getLuminance(color1 as RGB),
    getLuminance(color2 as RGB)
  );
};

/**
 * Calculate luminance from RGB values.
 * @param {Array} RGBValue - Array containing R, G, B values.
 * @returns {number} The calculated luminance.
 */
export const getLuminance = (RGBValue: number[]): number => {
  validateColor(RGBValue as RGB);
  const LinearRGB = RGBValue.map(RGB8bitToLinear);

  return 0.2126 * LinearRGB[0] + 0.7152 * LinearRGB[1] + 0.0722 * LinearRGB[2];
};

/**
 * @private
 * Convert an 8-bit RGB channel value to a linear RGB value.
 * @param {number} channelValue - The 8-bit RGB channel value.
 * @returns {number} The linear RGB value.
 */
const RGB8bitToLinear = (channelValue: number): number => {
  if (channelValue < 0 || channelValue > 255) {
    throw new Error('Invalid 8-bit RGB channel value.');
  }

  const normalizedValue = channelValue / 255;
  return normalizedValue <= 0.03928
    ? normalizedValue / 12.92
    : Math.pow((normalizedValue + 0.055) / 1.055, 2.4);
};

/**
 * @private
 * Convert a linear RGB value to an 8-bit RGB channel value.
 * @param {number} linearValue - The linear RGB value.
 * @returns {number} The 8-bit RGB channel value.
 */
const RGBLinearTo8bit = (linearValue: number): number => {
  if (linearValue < 0 || linearValue > 1) {
    throw new Error(`Invalid linear RGB value`);
  }
  return linearValue <= 0.00303949
    ? Math.round(linearValue * 12.92 * 255)
    : Math.round((1.055 * Math.pow(linearValue, 1 / 2.4) - 0.055) * 255);
};

/**
 * @private
 * @param {number} multiplier - The multiplier for the bounds.
 * @param {number} luminance - The luminance value.
 * @returns {[number, number]} The lower and upper bounds.
 */
const calculateBounds = (
  multiplier: number,
  luminance: number
): [number, number] => {
  const lowerBound = luminance / multiplier + 0.05 * (1 / multiplier - 1);
  const upperBound = multiplier * luminance + 0.05 * (multiplier - 1);

  return [Math.max(0, lowerBound), Math.min(1, upperBound)];
};

/**
 * @private
 * Calculate the total length between the lower and upper bounds.
 * @param {number[]} bounds - The bounds as an array of two numbers.
 * @returns {number} The total length between the bounds.
 */
const calculateTotalLength = (bounds: number[]) => {
  const lowerBound = Math.max(0, bounds[0]);
  const upperBound = Math.min(1, bounds[1]);

  return lowerBound + 1 - upperBound;
};

/**
 * @private
 * Get the linear RGB value from the luminance and target RGB element.
 * @param {number} luminance - The luminance value.
 * @param {RGBElement} target - The target RGB element (R, G, or B).
 * @returns {number} The linear RGB value.
 */
const LinearRGBfromLuminance = (
  luminance: number,
  target: RGBElement
): number => {
  return luminance / RGBChannelWeights[target];
};

/**
 * @private
 * Finds color which has the contrast greater than the specified luminance with the given color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The contrast ratio (3.0, 4.5, 7.0).
 * @returns {RGB} The contrast color.
 */
const getContrastColorInnerLogic = (
  color: RGB,
  luminance: number
): RGB | null => {
  let backgroundLuminance = getLuminance(color);
  let [lowerBound, upperBound] = calculateBounds(
    luminance,
    backgroundLuminance
  );
  let totalLength = calculateTotalLength([lowerBound, upperBound]);

  let _tmp = Math.random() * totalLength * RGBChannelWeights.R;
  let _targetLuminance =
    _tmp > lowerBound
      ? _tmp + (-lowerBound + upperBound) * RGBChannelWeights.R
      : _tmp;

  const LinearR = LinearRGBfromLuminance(_targetLuminance, 'R');
  const _8bitR = RGBLinearTo8bit(LinearR);

  backgroundLuminance -= _targetLuminance;
  [lowerBound, upperBound] = calculateBounds(luminance, backgroundLuminance);
  totalLength = calculateTotalLength([lowerBound, upperBound]);

  _tmp = Math.random() * totalLength * RGBChannelWeights.G;
  _targetLuminance =
    _tmp > lowerBound
      ? _tmp + (-lowerBound + upperBound) * RGBChannelWeights.G
      : _tmp;

  const LinearG = LinearRGBfromLuminance(_targetLuminance, 'G');
  const _8bitG = RGBLinearTo8bit(LinearG);

  backgroundLuminance -= _targetLuminance;
  [lowerBound, upperBound] = calculateBounds(luminance, backgroundLuminance);
  totalLength = calculateTotalLength([lowerBound, upperBound]);

  _tmp = Math.random() * totalLength * RGBChannelWeights.B;
  _targetLuminance =
    _tmp > lowerBound
      ? _tmp + (-lowerBound + upperBound) * RGBChannelWeights.B
      : _tmp;

  const LinearB = LinearRGBfromLuminance(_targetLuminance, 'B');
  const _8bitB = RGBLinearTo8bit(LinearB);

  return [_8bitR, _8bitG, _8bitB];
};

/**
 * Finds color which has the contrast greater than the specified luminance with the given color.
 * @param {RGB} color - The base RGB color. (validate if the given color is RGB format)
 * @param {number} luminance - The contrast ratio (3.0, 4.5, 7.0).
 * @throws Will throw an error if the RGB array is invalid or the luminance is invalid.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
export const getContrastColor = (
  color: number[],
  luminance: number
): RGB | null => {
  // validate parameters
  validateColor(color as RGB);
  validateLuminance(luminance);
  const bgColor = color as RGB;

  let i = 0;
  while (i < 1000) {
    i++;
    try {
      const targetColor = getContrastColorInnerLogic(bgColor, luminance);
      if (getContrastRatio(targetColor!, bgColor) > luminance) {
        return targetColor;
      }
    } catch (e: any) {
      if (e.message === 'Invalid linear RGB value') {
        continue;
      } else {
        throw e;
      }
    }
  }
  // return null if no suitable color is found
  return null;
};

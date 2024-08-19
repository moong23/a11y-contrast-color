import { RGBChannelWeights, type RGB, type RGBElement } from '../types/color';

/**
 * @private
 * Validate the RGB color array.
 * @param {RGB} color - The RGB color array.
 * @throws Will throw an error if the RGB array is invalid.
 */
export const validateColor = (color: RGB) => {
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
export const validateLuminance = (luminance: number) => {
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
export const calculateContrastRatio = (lum1: number, lum2: number): number => {
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

/**
 * Calculate contrast ratio between two RGB colors.
 * @param {RGB} color1 - The first RGB color.
 * @param {RGB} color2 - The second RGB color.
 * @returns {number} The contrast ratio.
 */
export const getContrastRatio = (color1: RGB, color2: RGB): number => {
  return calculateContrastRatio(getLuminance(color1), getLuminance(color2));
};

/**
 * Calculate luminance from RGB values.
 * @param {RGB} RGBValue - The RGB color array.
 * @returns {number} The calculated luminance.
 */
export const getLuminance = (RGBValue: RGB): number => {
  const LinearRGB = RGBValue.map(RGB8bitToLinear);

  return 0.2126 * LinearRGB[0] + 0.7152 * LinearRGB[1] + 0.0722 * LinearRGB[2];
};

/**
 * @private
 * Normalize an 8-bit RGB element to a 0-1 range.
 * @param {number} element - The 8-bit RGB element.
 * @returns {number} The normalized value.
 */
export const normalizeElement = (element: number): number => {
  return element / 255;
};

/**
 * @private
 * Linearize an RGB element (convert to linear RGB space).
 * @param {number} element - The normalized RGB element.
 * @returns {number} The linearized value.
 */
export const linearizeElement = (element: number): number => {
  return element <= 0.03928
    ? element / 12.92
    : Math.pow((element + 0.055) / 1.055, 2.4);
};

/**
 * @private
 * Denormalize a linear RGB element back to 8-bit RGB.
 * @param {number} element - The linear RGB element.
 * @returns {number} The denormalized value.
 */
export const denormalizeElement = (element: number): number => {
  return element * 255;
};

/**
 * @private
 * Delinearize an RGB element (convert from linear RGB space).
 * @param {number} element - The linear RGB element.
 * @returns {number} The delinearized value.
 */
export const delinearizeElement = (element: number): number => {
  return element <= 0.00303949
    ? element * 12.92
    : Math.pow(element, 1 / 2.4) * 1.055 - 0.055;
};

/**
 * @private
 * Convert an 8-bit RGB channel value to a linear RGB value.
 * @param {number} channelValue - The 8-bit RGB channel value.
 * @returns {number} The linear RGB value.
 */
export const RGB8bitToLinear = (channelValue: number): number => {
  if (channelValue < 0 || channelValue > 255) {
    throw new Error('Invalid 8-bit RGB channel value.');
  }

  const normalizedValue = normalizeElement(channelValue);

  const linearizedValue = linearizeElement(normalizedValue);

  return linearizedValue;
};

/**
 * @private
 * Convert a linear RGB value to an 8-bit RGB channel value.
 * @param {number} linearValue - The linear RGB value.
 * @returns {number} The 8-bit RGB channel value.
 */
export const RGBLinearTo8bit = (linearValue: number): number => {
  if (linearValue < 0 || linearValue > 1) {
    throw new Error(`Invalid linear RGB value`);
  }

  const delinearizedValue = delinearizeElement(linearValue);

  const denormalizedValue = denormalizeElement(delinearizedValue);

  return Math.round(denormalizedValue);
};

/**
 * @private
 * Calculate the lower and upper bounds for contrast calculation.
 * @param {number} multiplier - The multiplier for the bounds.
 * @param {number} luminance - The luminance value.
 * @returns {[number, number]} The lower and upper bounds.
 */
export const calculateBounds = (
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
export const calculateTotalLength = (bounds: number[]): number => {
  const lowerBound = bounds[0];
  const upperBound = bounds[1];

  return lowerBound + 1 - upperBound;
};

/**
 * @private
 * Get the linear RGB value from the luminance and target RGB element.
 * @param {number} luminance - The luminance value.
 * @param {RGBElement} target - The target RGB element (R, G, or B).
 * @returns {number} The linear RGB value.
 */
export const LinearRGBfromLuminance = (
  luminance: number,
  target: RGBElement
): number => {
  return luminance / RGBChannelWeights[target];
};

/**
 * @private
 * Generate target luminance within bounds using randomization.
 * @param {number} totalLength - The total length between bounds.
 * @param {number} lowerBound - The lower bound for luminance.
 * @param {number} upperBound - The upper bound for luminance.
 * @param {number} weight - The weight of the RGB channel.
 * @returns {number} The target luminance value.
 */
export const generateTargetLuminance = (
  totalLength: number,
  lowerBound: number,
  upperBound: number,
  weight: number
): number => {
  const _tmp = Math.random() * totalLength * weight;
  return _tmp > lowerBound ? _tmp + (-lowerBound + upperBound) * weight : _tmp;
};

/**
 * @private
 * Finds a color that has the contrast greater than the specified luminance with the given base color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The target luminance value.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
export const calculateContrastColorInnerLogic = (
  color: RGB,
  luminance: number
): RGB | null => {
  let backgroundLuminance = getLuminance(color);
  let [lowerBound, upperBound] = calculateBounds(
    luminance,
    backgroundLuminance
  );
  let totalLength = calculateTotalLength([lowerBound, upperBound]);

  let _targetLuminance = generateTargetLuminance(
    totalLength,
    lowerBound,
    upperBound,
    RGBChannelWeights.R
  );

  const LinearR = LinearRGBfromLuminance(_targetLuminance, 'R');
  const _8bitR = RGBLinearTo8bit(LinearR);

  backgroundLuminance -= _targetLuminance;
  [lowerBound, upperBound] = calculateBounds(luminance, backgroundLuminance);
  totalLength = calculateTotalLength([lowerBound, upperBound]);

  _targetLuminance = generateTargetLuminance(
    totalLength,
    lowerBound,
    upperBound,
    RGBChannelWeights.G
  );

  const LinearG = LinearRGBfromLuminance(_targetLuminance, 'G');
  const _8bitG = RGBLinearTo8bit(LinearG);

  backgroundLuminance -= _targetLuminance;
  [lowerBound, upperBound] = calculateBounds(luminance, backgroundLuminance);
  totalLength = calculateTotalLength([lowerBound, upperBound]);

  _targetLuminance = generateTargetLuminance(
    totalLength,
    lowerBound,
    upperBound,
    RGBChannelWeights.B
  );

  const LinearB = LinearRGBfromLuminance(_targetLuminance, 'B');
  const _8bitB = RGBLinearTo8bit(LinearB);

  return [_8bitR, _8bitG, _8bitB];
};

/**
 * Finds a color that has a contrast ratio greater than the specified luminance with the given base color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The target luminance value for the contrast ratio (e.g., 3.0, 4.5, 7.0).
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
      const targetColor = calculateContrastColorInnerLogic(bgColor, luminance);
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

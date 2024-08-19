"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContrastColor = exports.calculateContrastColorInnerLogic = exports.generateTargetLuminance = exports.LinearRGBfromLuminance = exports.calculateTotalLength = exports.calculateBounds = exports.RGBLinearTo8bit = exports.RGB8bitToLinear = exports.delinearizeElement = exports.denormalizeElement = exports.linearizeElement = exports.normalizeElement = exports.getLuminance = exports.getContrastRatio = exports.calculateContrastRatio = exports.validateLuminance = exports.validateColor = void 0;
const color_1 = require("../types/color");
/**
 * @private
 * Validate the RGB color array.
 * @param {RGB} color - The RGB color array.
 * @throws Will throw an error if the RGB array is invalid.
 */
const validateColor = (color) => {
    if (!Array.isArray(color) || color.length !== 3) {
        throw new Error('Invalid RGB array. RGB should be an array of three numbers.');
    }
    if (!color.every((value) => typeof value === 'number' && value >= 0 && value <= 255)) {
        throw new Error('Invalid RGB values. Each value should be a number between 0 and 255.');
    }
};
exports.validateColor = validateColor;
/**
 * @private
 * Validate the target luminance value.
 * @param {number} luminance - The luminance value.
 * @throws Will throw an error if the luminance is invalid.
 */
const validateLuminance = (luminance) => {
    if (typeof luminance !== 'number' || luminance <= 0) {
        throw new Error('Invalid target luminance. Target luminance should be a number greater than 0.');
    }
    else if (luminance > 21) {
        throw new Error('Invalid target luminance. Target luminance should be a number less than or equal to 21.');
    }
};
exports.validateLuminance = validateLuminance;
/**
 * @private
 * Calculate contrast ratio between two luminance values.
 * @param {number} lum1 - The first luminance value.
 * @param {number} lum2 - The second luminance value.
 * @returns {number} The contrast ratio.
 */
const calculateContrastRatio = (lum1, lum2) => {
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};
exports.calculateContrastRatio = calculateContrastRatio;
/**
 * Calculate contrast ratio between two RGB colors.
 * @param {RGB} color1 - The first RGB color.
 * @param {RGB} color2 - The second RGB color.
 * @returns {number} The contrast ratio.
 */
const getContrastRatio = (color1, color2) => {
    return (0, exports.calculateContrastRatio)((0, exports.getLuminance)(color1), (0, exports.getLuminance)(color2));
};
exports.getContrastRatio = getContrastRatio;
/**
 * Calculate luminance from RGB values.
 * @param {RGB} RGBValue - The RGB color array.
 * @returns {number} The calculated luminance.
 */
const getLuminance = (RGBValue) => {
    const LinearRGB = RGBValue.map(exports.RGB8bitToLinear);
    return 0.2126 * LinearRGB[0] + 0.7152 * LinearRGB[1] + 0.0722 * LinearRGB[2];
};
exports.getLuminance = getLuminance;
/**
 * @private
 * Normalize an 8-bit RGB element to a 0-1 range.
 * @param {number} element - The 8-bit RGB element.
 * @returns {number} The normalized value.
 */
const normalizeElement = (element) => {
    return element / 255;
};
exports.normalizeElement = normalizeElement;
/**
 * @private
 * Linearize an RGB element (convert to linear RGB space).
 * @param {number} element - The normalized RGB element.
 * @returns {number} The linearized value.
 */
const linearizeElement = (element) => {
    return element <= 0.03928
        ? element / 12.92
        : Math.pow((element + 0.055) / 1.055, 2.4);
};
exports.linearizeElement = linearizeElement;
/**
 * @private
 * Denormalize a linear RGB element back to 8-bit RGB.
 * @param {number} element - The linear RGB element.
 * @returns {number} The denormalized value.
 */
const denormalizeElement = (element) => {
    return element * 255;
};
exports.denormalizeElement = denormalizeElement;
/**
 * @private
 * Delinearize an RGB element (convert from linear RGB space).
 * @param {number} element - The linear RGB element.
 * @returns {number} The delinearized value.
 */
const delinearizeElement = (element) => {
    return element <= 0.00303949
        ? element * 12.92
        : Math.pow(element, 1 / 2.4) * 1.055 - 0.055;
};
exports.delinearizeElement = delinearizeElement;
/**
 * @private
 * Convert an 8-bit RGB channel value to a linear RGB value.
 * @param {number} channelValue - The 8-bit RGB channel value.
 * @returns {number} The linear RGB value.
 */
const RGB8bitToLinear = (channelValue) => {
    if (channelValue < 0 || channelValue > 255) {
        throw new Error('Invalid 8-bit RGB channel value.');
    }
    const normalizedValue = (0, exports.normalizeElement)(channelValue);
    const linearizedValue = (0, exports.linearizeElement)(normalizedValue);
    return linearizedValue;
};
exports.RGB8bitToLinear = RGB8bitToLinear;
/**
 * @private
 * Convert a linear RGB value to an 8-bit RGB channel value.
 * @param {number} linearValue - The linear RGB value.
 * @returns {number} The 8-bit RGB channel value.
 */
const RGBLinearTo8bit = (linearValue) => {
    if (linearValue < 0 || linearValue > 1) {
        throw new Error(`Invalid linear RGB value`);
    }
    const delinearizedValue = (0, exports.delinearizeElement)(linearValue);
    const denormalizedValue = (0, exports.denormalizeElement)(delinearizedValue);
    return Math.round(denormalizedValue);
};
exports.RGBLinearTo8bit = RGBLinearTo8bit;
/**
 * @private
 * Calculate the lower and upper bounds for contrast calculation.
 * @param {number} multiplier - The multiplier for the bounds.
 * @param {number} luminance - The luminance value.
 * @returns {[number, number]} The lower and upper bounds.
 */
const calculateBounds = (multiplier, luminance) => {
    const lowerBound = luminance / multiplier + 0.05 * (1 / multiplier - 1);
    const upperBound = multiplier * luminance + 0.05 * (multiplier - 1);
    return [Math.max(0, lowerBound), Math.min(1, upperBound)];
};
exports.calculateBounds = calculateBounds;
/**
 * @private
 * Calculate the total length between the lower and upper bounds.
 * @param {number[]} bounds - The bounds as an array of two numbers.
 * @returns {number} The total length between the bounds.
 */
const calculateTotalLength = (bounds) => {
    const lowerBound = bounds[0];
    const upperBound = bounds[1];
    return lowerBound + 1 - upperBound;
};
exports.calculateTotalLength = calculateTotalLength;
/**
 * @private
 * Get the linear RGB value from the luminance and target RGB element.
 * @param {number} luminance - The luminance value.
 * @param {RGBElement} target - The target RGB element (R, G, or B).
 * @returns {number} The linear RGB value.
 */
const LinearRGBfromLuminance = (luminance, target) => {
    return luminance / color_1.RGBChannelWeights[target];
};
exports.LinearRGBfromLuminance = LinearRGBfromLuminance;
/**
 * @private
 * Generate target luminance within bounds using randomization.
 * @param {number} totalLength - The total length between bounds.
 * @param {number} lowerBound - The lower bound for luminance.
 * @param {number} upperBound - The upper bound for luminance.
 * @param {number} weight - The weight of the RGB channel.
 * @returns {number} The target luminance value.
 */
const generateTargetLuminance = (totalLength, lowerBound, upperBound, weight) => {
    const _tmp = Math.random() * totalLength * weight;
    return _tmp > lowerBound ? _tmp + (-lowerBound + upperBound) * weight : _tmp;
};
exports.generateTargetLuminance = generateTargetLuminance;
/**
 * @private
 * Finds a color that has the contrast greater than the specified luminance with the given base color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The target luminance value.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
const calculateContrastColorInnerLogic = (color, luminance) => {
    let backgroundLuminance = (0, exports.getLuminance)(color);
    let [lowerBound, upperBound] = (0, exports.calculateBounds)(luminance, backgroundLuminance);
    let totalLength = (0, exports.calculateTotalLength)([lowerBound, upperBound]);
    let _targetLuminance = (0, exports.generateTargetLuminance)(totalLength, lowerBound, upperBound, color_1.RGBChannelWeights.R);
    const LinearR = (0, exports.LinearRGBfromLuminance)(_targetLuminance, 'R');
    const _8bitR = (0, exports.RGBLinearTo8bit)(LinearR);
    backgroundLuminance -= _targetLuminance;
    [lowerBound, upperBound] = (0, exports.calculateBounds)(luminance, backgroundLuminance);
    totalLength = (0, exports.calculateTotalLength)([lowerBound, upperBound]);
    _targetLuminance = (0, exports.generateTargetLuminance)(totalLength, lowerBound, upperBound, color_1.RGBChannelWeights.G);
    const LinearG = (0, exports.LinearRGBfromLuminance)(_targetLuminance, 'G');
    const _8bitG = (0, exports.RGBLinearTo8bit)(LinearG);
    backgroundLuminance -= _targetLuminance;
    [lowerBound, upperBound] = (0, exports.calculateBounds)(luminance, backgroundLuminance);
    totalLength = (0, exports.calculateTotalLength)([lowerBound, upperBound]);
    _targetLuminance = (0, exports.generateTargetLuminance)(totalLength, lowerBound, upperBound, color_1.RGBChannelWeights.B);
    const LinearB = (0, exports.LinearRGBfromLuminance)(_targetLuminance, 'B');
    const _8bitB = (0, exports.RGBLinearTo8bit)(LinearB);
    return [_8bitR, _8bitG, _8bitB];
};
exports.calculateContrastColorInnerLogic = calculateContrastColorInnerLogic;
/**
 * Finds a color that has a contrast ratio greater than the specified luminance with the given base color.
 * @param {RGB} color - The base RGB color.
 * @param {number} luminance - The target luminance value for the contrast ratio (e.g., 3.0, 4.5, 7.0).
 * @throws Will throw an error if the RGB array is invalid or the luminance is invalid.
 * @returns {RGB | null} The contrast color, or null if no suitable color is found.
 */
const getContrastColor = (color, luminance) => {
    // validate parameters
    (0, exports.validateColor)(color);
    (0, exports.validateLuminance)(luminance);
    const bgColor = color;
    let i = 0;
    while (i < 1000) {
        i++;
        try {
            const targetColor = (0, exports.calculateContrastColorInnerLogic)(bgColor, luminance);
            if ((0, exports.getContrastRatio)(targetColor, bgColor) > luminance) {
                return targetColor;
            }
        }
        catch (e) {
            if (e.message === 'Invalid linear RGB value') {
                continue;
            }
            else {
                throw e;
            }
        }
    }
    // return null if no suitable color is found
    return null;
};
exports.getContrastColor = getContrastColor;

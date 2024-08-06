"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContrastColor = exports.getLuminance = void 0;
const color_1 = require("../types/color");
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
const RGBLinearTo8bit = (linearValue) => {
    if (linearValue < 0 || linearValue > 1) {
        throw new Error(`Invalid linear RGB value`);
    }
    return linearValue <= 0.00303949
        ? Math.round(linearValue * 12.92 * 255)
        : Math.round((1.055 * Math.pow(linearValue, 1 / 2.4) - 0.055) * 255);
};
/**
 * Calculate luminance from RGB values.
 * @param {Array} RGBValue - Array containing R, G, B values.
 * @returns {number} The calculated luminance.
 */
const getLuminance = (RGBValue) => {
    const LinearRGB = RGBValue.map(RGB8bitToLinear);
    return 0.2126 * LinearRGB[0] + 0.7152 * LinearRGB[1] + 0.0722 * LinearRGB[2];
};
exports.getLuminance = getLuminance;
/**
 * @private
 * @param {number} multiplier - The multiplier for the bounds.
 * @param {number} luminance - The luminance value.
 * @returns {number[]} The lower and upper bounds.
 */
const getBounds = (multiplier, luminance) => {
    const lowerBound = luminance / multiplier + 0.05 * (1 / multiplier - 1);
    const upperBound = multiplier * luminance + 0.05 * (multiplier - 1);
    return [Math.max(0, lowerBound), Math.min(1, upperBound)];
};
const calculateContrast = (lum1, lum2) => {
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};
const getTotalLength = (bounds) => {
    const lowerBound = Math.max(0, bounds[0]);
    const upperBound = Math.min(1, bounds[1]);
    return lowerBound + 1 - upperBound;
};
const getLinearRGBfromLuminance = (luminance, target) => {
    return luminance / color_1.RGBChannelWeights[target];
};
const validateColor = (color) => {
    if (!Array.isArray(color) || color.length !== 3) {
        throw new Error('Invalid RGB array. RGB should be an array of three numbers.');
    }
    if (!color.every((value) => typeof value === 'number' && value >= 0 && value <= 255)) {
        throw new Error('Invalid RGB values. Each value should be a number between 0 and 255.');
    }
    return true;
};
const validateLuminance = (luminance) => {
    if (typeof luminance !== 'number' || luminance <= 0) {
        throw new Error('Invalid target luminance. Target luminance should be a number greater than 0.');
    }
    else if (luminance > 21) {
        throw new Error('Invalid target luminance. Target luminance should be a number less than or equal to 21.');
    }
    return true;
};
/**
 * Finds Color which has the contrast bigger than the luminance with the given color.
 * @param {RGB} color
 * @param {number} luminance - 3.0, 4.5, 7.0
 * @returns {RGB} The contrast color.
 */
const getContrastColorInnerLogic = (color, luminance) => {
    if (!validateColor(color) || !validateLuminance(luminance)) {
        return;
    }
    let backgroundLuminance = (0, exports.getLuminance)(color);
    let [lowerBound, upperBound] = getBounds(luminance, backgroundLuminance);
    let totalLength = getTotalLength([lowerBound, upperBound]);
    let _tmp = Math.random() * totalLength * color_1.RGBChannelWeights.R;
    let _targetLuminance = _tmp > lowerBound
        ? _tmp + (-lowerBound + upperBound) * color_1.RGBChannelWeights.R
        : _tmp;
    const LinearR = getLinearRGBfromLuminance(_targetLuminance, 'R');
    const _8bitR = RGBLinearTo8bit(LinearR);
    backgroundLuminance -= _targetLuminance;
    [lowerBound, upperBound] = getBounds(luminance, backgroundLuminance);
    totalLength = getTotalLength([lowerBound, upperBound]);
    _tmp = Math.random() * totalLength * color_1.RGBChannelWeights.G;
    _targetLuminance =
        _tmp > lowerBound
            ? _tmp + (-lowerBound + upperBound) * color_1.RGBChannelWeights.G
            : _tmp;
    const LinearG = getLinearRGBfromLuminance(_targetLuminance, 'G');
    const _8bitG = RGBLinearTo8bit(LinearG);
    backgroundLuminance -= _targetLuminance;
    [lowerBound, upperBound] = getBounds(luminance, backgroundLuminance);
    totalLength = getTotalLength([lowerBound, upperBound]);
    _tmp = Math.random() * totalLength * color_1.RGBChannelWeights.B;
    _targetLuminance =
        _tmp > lowerBound
            ? _tmp + (-lowerBound + upperBound) * color_1.RGBChannelWeights.B
            : _tmp;
    const LinearB = getLinearRGBfromLuminance(_targetLuminance, 'B');
    const _8bitB = RGBLinearTo8bit(LinearB);
    return [_8bitR, _8bitG, _8bitB];
};
const getContrastColor = (color, luminance) => {
    let i = 0;
    while (i < 1000) {
        i++;
        const bgContrast = (0, exports.getLuminance)(color);
        try {
            const targetColor = getContrastColorInnerLogic(color, luminance);
            const targetContrast = (0, exports.getLuminance)(targetColor);
            if (calculateContrast(targetContrast, bgContrast) > luminance) {
                console.log(i);
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
    return null;
};
exports.getContrastColor = getContrastColor;

export type RGB = [number, number, number];

export type RGBElement = 'R' | 'G' | 'B';

/**
 * Object for RGB channel weights used to calculate luminance.
 */
export const RGBChannelWeights = {
  R: 0.2126,
  G: 0.7152,
  B: 0.0722,
};

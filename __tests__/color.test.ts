import { getContrastColor, getLuminance, getContrastRatio } from '../lib/color';
import type { RGB } from '../types/color';

// Test data assets
const color1: RGB = [255, 0, 0]; // Red
const color2: RGB = [0, 255, 0]; // Green
const color3: RGB = [0, 0, 255]; // Blue
const color4: RGB = [128, 128, 128]; // Mid Gray
const color5: RGB = [255, 255, 255]; // White
const color6: RGB = [0, 0, 0]; // Black

const testColor = (color: RGB, luminance: number) => {
  const contrastColor = getContrastColor(color, luminance);
  expect(contrastColor).not.toBeNull();
  expect(contrastColor).toHaveLength(3);
  expect(contrastColor!.every((value) => value >= 0 && value <= 255)).toBe(
    true
  );
  expect(getContrastRatio(color, contrastColor!)).toBeGreaterThan(luminance);
};

describe('getLuminance', () => {
  test('calculates luminance correctly', () => {
    expect(getLuminance(color1)).toBeCloseTo(0.2126, 5);
    expect(getLuminance(color2)).toBeCloseTo(0.7152, 5);
    expect(getLuminance(color3)).toBeCloseTo(0.0722, 5);
    expect(getLuminance(color4)).toBeCloseTo(0.21586, 5);
    expect(getLuminance(color5)).toBeCloseTo(1, 5);
    expect(getLuminance(color6)).toBeCloseTo(0, 5);
  });
});

describe('getContrastRatio', () => {
  test('calculates correct contrast ratio for different luminance values', () => {
    expect(getContrastRatio(color1, color2)).toBeCloseTo(2.91, 2);
    expect(getContrastRatio(color1, color3)).toBeCloseTo(2.15, 2);
    expect(getContrastRatio(color1, color5)).toBeCloseTo(4, 2);
    expect(getContrastRatio(color4, color5)).toBeCloseTo(3.95, 2);
    expect(getContrastRatio(color6, color5)).toBeCloseTo(21, 1);
  });

  test('returns 1 for identical luminance values', () => {
    expect(getContrastRatio(color1, color1)).toBe(1);
    expect(getContrastRatio(color2, color2)).toBe(1);
  });

  test('handles edge cases of very low luminance values', () => {
    expect(
      getContrastRatio([0.0001, 0.0001, 0.0001], [0.0001, 0.0001, 0.0001])
    ).toBe(1);
    expect(getContrastRatio([0.0001, 0.0001, 0.0001], [0, 0, 0])).toBeCloseTo(
      1.0,
      3
    );
  });

  test('handles edge cases of very high luminance values', () => {
    expect(getContrastRatio([255, 255, 255], [0, 0, 0])).toBeCloseTo(21, 1);
  });
});

describe('getContrastColor', () => {
  test('returns a color with sufficient contrast', () => {
    testColor(color1, 3.0);
    testColor(color2, 3.0);
    testColor(color3, 3.0);
    testColor(color4, 3.0);
    testColor(color5, 3.0);
    testColor(color6, 3.0);
  });

  test('throws error for invalid input color', () => {
    expect(() => getContrastColor([-1, 0, 0], 3.0)).toThrow();
    expect(() => getContrastColor([256, 0, 0], 3.0)).toThrow();
    expect(() =>
      getContrastColor([255, '0', 0] as unknown as number[], 3.0)
    ).toThrow();
    expect(() => getContrastColor([255, 0], 3.0)).toThrow();
    expect(() =>
      getContrastColor('#ff0000' as unknown as number[], 3.0)
    ).toThrow();
  });

  test('throws error for invalid luminance', () => {
    expect(() => getContrastColor(color1, -1)).toThrow();
    expect(() => getContrastColor(color1, 22)).toThrow();
  });
});

import { RGB } from '../types/color';

const hexToRGB = (hex: string): RGB => {
  // Remove the hash at the start if it's there
  hex = hex.replace('#', '');

  // If the hex code is shorthand (3 characters), convert it to full form (6 characters)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Ensure that the hex code is now 6 characters long
  if (hex.length !== 6) {
    throw new Error('Invalid hex color');
  }

  // Convert hex to RGB
  const rgb = hex.match(/.{1,2}/g)!.map((value) => parseInt(value, 16)) as [
    number,
    number,
    number
  ];

  return rgb;
};

import { getContrastColor, getLuminance } from '../lib/color';
import { RGB } from '../types/color';
const calculateContrast = (lum1: number, lum2: number) => {
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

const lumBg = getLuminance([128, 128, 128]);
let i = 0;
while (i < 1000) {
  i++;
  try {
    const targetColor = getContrastColor([128, 128, 128], -1);
    const lumTargetColor = getLuminance(targetColor! as RGB);
    if (calculateContrast(lumTargetColor, lumBg) > 3) {
      console.log(targetColor, calculateContrast(lumTargetColor, lumBg));
      break;
    }
  } catch (e) {
    continue;
  }
}
console.log(i);

// console.log(targetColor, getLuminance(targetColor! as RGB));

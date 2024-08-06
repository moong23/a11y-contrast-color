"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../lib/color");
const calculateContrast = (lum1, lum2) => {
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};
const lumBg = (0, color_1.getLuminance)([128, 128, 128]);
let i = 0;
while (i < 1000) {
    i++;
    try {
        const targetColor = (0, color_1.getContrastColor)([128, 128, 128], -1);
        const lumTargetColor = (0, color_1.getLuminance)(targetColor);
        if (calculateContrast(lumTargetColor, lumBg) > 3) {
            console.log(targetColor, calculateContrast(lumTargetColor, lumBg));
            break;
        }
    }
    catch (e) {
        continue;
    }
}
console.log(i);
// console.log(targetColor, getLuminance(targetColor! as RGB));

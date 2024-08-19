"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContrastColor = exports.getLuminance = exports.getContrastRatio = void 0;
var color_1 = require("../lib/color");
Object.defineProperty(exports, "getContrastRatio", { enumerable: true, get: function () { return color_1.getContrastRatio; } });
Object.defineProperty(exports, "getLuminance", { enumerable: true, get: function () { return color_1.getLuminance; } });
Object.defineProperty(exports, "getContrastColor", { enumerable: true, get: function () { return color_1.getContrastColor; } });
__exportStar(require("../types/color"), exports);

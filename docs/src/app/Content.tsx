"use client";

import { useState } from "react";

import { RGB } from "a11y-contrast-color/dist/types/color";
import { hexToRGB, rgbToHex } from "@/util";
import { getContrastColor, getContrastRatio } from "a11y-contrast-color";

const ContentComponent = () => {
  const [bgColor, setBgColor] = useState<RGB>([255, 255, 255]);
  const [fgColor, setFgColor] = useState<RGB>([0, 0, 0]);
  const [contrastLevel, setContrastLevel] = useState<3 | 4.5 | 7>(3.0);

  const handleBtnClick = () => {
    const fgContrastColor = getContrastColor(bgColor, contrastLevel);
    if (fgContrastColor) {
      setFgColor(fgContrastColor);
    } else {
      alert(
        "No contrast color found : " + bgColor + " with ratio" + contrastLevel
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <h1 className="text-4xl font-bold">🎨 A11y-contrast-color 🎨</h1>
      <div className="flex flex-row flex-wrap items-center justify-between w-full h-32 text-lg font-semibold">
        <span className="flex flex-col items-center lg:basis-80">
          BgColor
          <span className="text-lg font-normal">
            [{bgColor[0]}, {bgColor[1]}, {bgColor[2]}]
          </span>
        </span>
        <span className="flex flex-col items-center lg:basis-80">
          FgColor / Contrast Ratio
          <span className="text-lg font-normal">
            [{fgColor[0]}, {fgColor[1]}, {fgColor[2]}] /{" "}
            {getContrastRatio(bgColor, fgColor).toFixed(2)}
          </span>
        </span>
      </div>

      <div className="flex flex-row items-center w-full gap-10 shrink-0 max-lg:flex-col">
        <div className="flex flex-col items-center justify-center gap-5 p-5 bg-white border w-80 h-80 border-slate-600 shrink-0">
          <span className="flex flex-col w-full gap-2">
            <span className="flex items-center justify-between w-full px-4 text-lg font-normal text-red-600">
              <span className="text-center basis-4 shrink-0">R</span>
              <input
                type="range"
                min="0"
                max="255"
                value={bgColor[0]}
                onChange={(e) =>
                  setBgColor((prev) => [
                    parseInt(e.target.value),
                    prev[1],
                    prev[2],
                  ])
                }
              />
              <input
                className="w-10 text-center border border-slate-800 focus:outline-none"
                type="number"
                tabIndex={1}
                min={0}
                max={255}
                value={bgColor[0]}
                onChange={(e) => {
                  let target = Number(e.target.value);
                  if (target < 0) target = 0;
                  if (target > 255) target = 255;
                  setBgColor((prev) => [target, prev[1], prev[2]]);
                }}
              />
            </span>
            <span className="flex items-center justify-between w-full px-4 text-lg font-normal text-green-600">
              <span className="text-center basis-4 shrink-0">G</span>
              <input
                type="range"
                min="0"
                max="255"
                value={bgColor[1]}
                onChange={(e) =>
                  setBgColor((prev) => [
                    prev[0],
                    parseInt(e.target.value),
                    prev[2],
                  ])
                }
              />
              <input
                className="w-10 text-center border border-slate-800 focus:outline-none"
                tabIndex={2}
                type="number"
                value={bgColor[1]}
                onChange={(e) => {
                  let target = Number(e.target.value);
                  if (target < 0) target = 0;
                  if (target > 255) target = 255;
                  setBgColor((prev) => [prev[0], target, prev[2]]);
                }}
              />
            </span>
            <span className="flex items-center justify-between w-full px-4 text-lg font-normal text-blue-600">
              <span className="text-center basis-4 shrink-0">B</span>
              <input
                type="range"
                min="0"
                max="255"
                value={bgColor[2]}
                onChange={(e) =>
                  setBgColor((prev) => [
                    prev[0],
                    prev[1],
                    parseInt(e.target.value),
                  ])
                }
              />
              <input
                className="w-10 text-center border border-slate-800 focus:outline-none"
                tabIndex={3}
                type="number"
                value={bgColor[2]}
                onChange={(e) => {
                  let target = Number(e.target.value);
                  if (target < 0) target = 0;
                  if (target > 255) target = 255;
                  setBgColor((prev) => [prev[0], prev[1], target]);
                }}
              />
            </span>
          </span>
          <input
            className="w-4/5 h-10"
            type="color"
            value={rgbToHex(...bgColor)}
            onChange={(e) => {
              setBgColor(hexToRGB(e.target.value));
            }}
          />
          <span className="flex flex-row justify-around w-full">
            Contrast Ratio
            <label className="flex flex-row gap-2">
              <input
                tabIndex={4}
                type="radio"
                name="contrast"
                value="3"
                checked={contrastLevel === 3}
                onChange={() => setContrastLevel(3)}
              />
              3.0
            </label>
            <label className="flex flex-row gap-2">
              <input
                tabIndex={4}
                type="radio"
                name="contrast"
                value="3"
                checked={contrastLevel === 4.5}
                onChange={() => setContrastLevel(4.5)}
              />
              4.5
            </label>
            <label className="flex flex-row gap-2">
              <input
                tabIndex={4}
                type="radio"
                name="contrast"
                value="3"
                checked={contrastLevel === 7}
                onChange={() => setContrastLevel(7)}
              />
              7.0
            </label>
          </span>
          <input
            type="button"
            tabIndex={7}
            onClick={handleBtnClick}
            className="w-4/5 h-10 rounded-md cursor-pointer bg-slate-400"
            value="Extract FgColor"
          />
        </div>
        <div
          style={{ backgroundColor: rgbToHex(...bgColor) }}
          className="flex flex-col items-center justify-center gap-5 px-5 py-10 border w-80 h-80 border-slate-600 shrink-0"
        >
          <span
            style={{
              color: rgbToHex(...fgColor),
            }}
            className="text-lg"
          >
            Lorem ipsum dolor sit amet,
          </span>
          <span
            style={{
              color: rgbToHex(...fgColor),
            }}
            className="text-xl font-bold"
          >
            consectetur adipiscing elit.
          </span>
          <div
            className="w-10 rounded-full aspect-square"
            style={{
              backgroundColor: rgbToHex(...fgColor),
            }}
          />
          <input
            style={{
              color: rgbToHex(...fgColor),
              borderColor: rgbToHex(...fgColor),
            }}
            type="text"
            placeholder="type in text to test contrast"
            className="w-4/5 text-center bg-transparent border-2 focus:outline-none"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;

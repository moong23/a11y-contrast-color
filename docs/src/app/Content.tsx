"use client";

import { useState } from "react";

import { RGB } from "a11y-contrast-color/dist/types/color";

const ContentComponent = () => {
  const [bgColor, setBgColor] = useState<RGB>([255, 255, 255]);
  return (
    <div className="flex flex-row w-full h-full justify-between">
      <div className="h-full aspect-square bg-blue-200 border border-slate-600">
        test123
      </div>
      <div className="h-full aspect-square bg-blue-200 border border-slate-600">
        test123
      </div>
    </div>
  );
};

export default ContentComponent;

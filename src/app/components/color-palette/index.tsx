import { extractColors } from "@/app/utils/extractColor";

import { useCallback, useEffect, useState } from "react";
import Loading from "../loading";

interface props {
  imageData: ImageData;
  numColors: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

export default function ColorPalette({ imageData, numColors }: props) {
  const [colors, setColors] = useState<Color[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const fetchColors = useCallback(async () => {
    try {
      const extractedColors = await extractColors(imageData, numColors);
      setColors(extractedColors);
    } catch (error) {
      console.error("Error extracting colors:", error);
    }
  }, [imageData, numColors]);

  useEffect(() => {
    if (imageData && numColors) {
      fetchColors();
    }
  }, [imageData, numColors, fetchColors]);

  const handleGenerateAgain = () => {
    setColors([]);
    fetchColors();
  };

  function handleReturnClick() {
    window.location.reload();
  }

  function getTextColorForBackground(rgb: {
    r: number;
    g: number;
    b: number;
  }): string {
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    return luminance > 128 ? "text-black" : "text-white";
  }

  const handleCopy = async (index: number, color: Color) => {
    const copyText = `rgb(${color.r}, ${color.g}, ${color.b})`;
    if (copyText) {
      try {
        await navigator.clipboard.writeText(copyText);
        setCopied(index);

        setTimeout(() => {
          setCopied(null);
        }, 2000);
      } catch (err) {
        alert(`Failed to copy: ${err}`);
      }
    }
  };

  return (
    <>
      {colors.length !== 0 ? (
        <div className="flex flex-col gap-10 items-center justify-center text-center p-3">
          <h1 className="w-5/6 h-fit p-2 font-[family-name:var(--font-geist-mono)] text-2xl">
            Your color palette
          </h1>
          <div className="flex items-center justify-center gap-1 w-5/6 md:w-4/6 lg:w-3/6 h-2/5">
            {colors.map((color, index) => (
              <div
                id="copyDiv"
                onClick={() => handleCopy(index, color)}
                key={index}
                className="w-full h-full rounded text-center flex items-center justify-center [writing-mode:vertical-lr] cursor-pointer relative"
                style={{
                  backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                }}
              >
                {copied === index && (
                  <div
                    className="w-fit h-fit absolute top-auto left-auto p-2 text-xs text-black bg-slate-200 rounded"
                    style={{
                      zIndex: 9,
                      rotate: "-90deg",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Copied!
                  </div>
                )}
                <p
                  className={`font-[family-name:var(--font-geist-sans)] h-2/4 ${getTextColorForBackground(
                    color
                  )}`}
                >{`rgb(${color.r}, ${color.g}, ${color.b})`}</p>
              </div>
            ))}
          </div>

          <div className="w-5/6 md:w-4/6 lg:w-3/6 max-h-16">
            <div className="w-full max-h-16 flex justify-between">
              <button
                className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center border-b-4 border-l-4 border-blue-400 hover:border-slate-500 max-w-45 max-h-10 shadow-md shadow-black gap-2"
                onClick={handleReturnClick}
              >
                <svg
                  className="w-4 h-4 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                <span>Return</span>
              </button>
              <button
                className="bg-green-200 hover:bg-green-300 text-gray-900 font-bold py-2 px-2 gap-2 rounded inline-flex items-center border-b-4 border-r-4 border-green-600 hover:border-green-700 max-w-45 max-h-10 shadow-md shadow-black"
                onClick={handleGenerateAgain}
              >
                <span> Generate again</span>
                <svg
                  className="w-5 h-5 text-gray-800 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

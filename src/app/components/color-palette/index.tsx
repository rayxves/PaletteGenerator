import { extractColors } from "@/app/utils/extractColor";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchColors() {
      const extractedColors = await extractColors(imageData, numColors);
      setColors(extractedColors);
    }

    fetchColors();
  }, [imageData, numColors]);

  return (
    <div>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            border: "1px solid #000",
          }}
        ></div>
      ))}
    </div>
  );
}

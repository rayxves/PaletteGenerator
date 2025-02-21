"use client";

import { useState } from "react";
import ImageUploader from "./components/image-uploader";
import ColorPalette from "./components/color-palette";

export default function Home() {
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [progressFromImagePreview, setProgressFromImagePreview] =
    useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageData>({} as ImageData);

  const handleImageUpload = async (file: File) => {
    const imageBitmap = await createImageBitmap(file, {
      resizeWidth: 200,
      resizeHeight: 200,
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    ctx?.drawImage(imageBitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (imageData) {
      setImageData(imageData);
      setIsImageUploaded(true);
    } else {
      setImageData({} as ImageData);
      setIsImageUploaded(false);
    }
    return imageData;
  };

  const handleImagePreviewProgress = () => {
    setProgressFromImagePreview(true);
  };

  return (
    <div className="w-full h-full">
      {isImageUploaded && progressFromImagePreview ? (
        <ColorPalette imageData={imageData} numColors={6} />
      ) : (
        <ImageUploader onImageUpload={handleImageUpload} onImagePreviewProgress={handleImagePreviewProgress}/>
      )}
    </div>
  );
}

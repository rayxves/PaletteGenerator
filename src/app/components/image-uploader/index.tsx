"use client";
import Image from "next/image";
import { useRef, useState } from "react";

interface props {
  onImageUpload: (file: File) => void;
  onImagePreviewProgress: () => void;
}

export default function ImageUploader({
  onImageUpload,
  onImagePreviewProgress,
}: props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files?.[0];
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8 ">
      <div className="flex flex-col items-center justify-center h-fit w-10/12 sm:w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 gap-10  p-10 border-2 border-slate-100 border-dashed rounded-md">
        <h1 className="text-xl md:text-2xl text-center font-[family-name:var(--font-geist-mono)]">
          Find your ideal color palette
        </h1>
        {imagePreview ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={250}
              className="rounded-md"
            ></Image>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-[family-name:var(--font-geist-sans)]">
              Image preview
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center ">
            {" "}
            <svg
              className="w-2/5 h-fit fill-[#8e8e8e]"
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M160 80H512c8.8 0 16 7.2 16 16V320c0 8.8-7.2 16-16 16H490.8L388.1 178.9c-4.4-6.8-12-10.9-20.1-10.9s-15.7 4.1-20.1 10.9l-52.2 79.8-12.4-16.9c-4.5-6.2-11.7-9.8-19.4-9.8s-14.8 3.6-19.4 9.8L175.6 336H160c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16zM96 96V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
            </svg>

         
          </div>
        )}

        {imagePreview ? (
          <div className="flex h-fit w-full gap-2 justify-between">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-2 sm:px-3 rounded inline-flex items-center border-b-4 border-l-4 border-blue-400 hover:border-slate-500 max-w-45 max-h-10 shadow-md shadow-black sm:gap-2 text-sm sm:text-md"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                className="fill-current w-3 h-3 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Change File</span>
            </button>
            <button
              className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-2 sm:pl-5 sm:px-1 rounded inline-flex items-center border-b-4 border-r-4 border-blue-400 hover:border-slate-500 max-w-45 max-h-10 shadow-md shadow-black sm:gap-2 text-sm sm:text-md"
              onClick={onImagePreviewProgress}
            >
              <span> Continue</span>
              <svg
                className="w-4 h-3 sm:w-5 sm:h-4 text-gray-800"
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border-b-4 border-r-4 border-slate-400 hover:border-slate-700 max-w-45 max-h-10"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Choose File</span>
            </button>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-[family-name:var(--font-geist-sans)]">
              Upload your image here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

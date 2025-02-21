"use client";
import Image from "next/image";
import upload_image from "../../../../public/freepik__adjust__90241.png";
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
      <div className="flex flex-col items-center justify-center h-fit w-10/12 sm:w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 gap-5 p-10 border-2 border-slate-100 border-dashed rounded-md">
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
          <Image src={upload_image} alt=""></Image>
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

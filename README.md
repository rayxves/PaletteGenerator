# 🎨 Color Palette Generator

## Overview
Color Palette Extractor is a web application that enables users to upload an image and extract a color palette from it. The app is built using Next.js and React and leverages the Canvas API, TensorFlow.js and machine learning techniques for color extraction.

## Features
- Upload an image
- Preview the uploaded image
- Extract dominant colors using **K-Means clustering**
- Display the extracted color palette
- Allows users to copy rgb color

## Technologies Used
- Next.js
- React
- Tailwind CSS (for styling)
- TensorFlow.js (for machine learning)
- Canvas (for image processing)

## Installation

### Prerequisites
- Node.js 
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/rayxves/PaletteGenerator.git
   ```
2. Install dependencies:
   ```sh
   npm install  
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open the app in your browser:
   ```
   http://localhost:3000
   ```


## How It Works
1. User uploads an image.
2. The image is drawn onto a <canvas> element.
3. The getImageData() method extracts pixel data (color information) from the canvas.
4. The pixel data is passed to TensorFlow.js for processing.
5. K-Means clustering is used to identify the most dominant colors in the image.
6. The dominant colors (clusters) are extracted by finding centroids of color groups.
7. The extracted colors are shown to the user in a color palette using the ColorPalette component.

## Learnings & Insights
Developing this project provided valuable insights into:
- **Image Processing:** Used the Canvas API to extract pixel data from images.
- **Machine Learning with TensorFlow.js:** Implemented K-Means clustering for color extraction, leveraging unsupervised learning.
- **Efficient File Handling:** Managed image uploads and processing efficiently in Next.js.
- **UI Design:** Created a responsive and visually appealing UI using Tailwind CSS.

## Deployment
- The project is live! Check out the deployed version here: [palette-generator](https://palettegenerator-4oqd.onrender.com/)

## Author
- Rayssa Guimarães - [GitHub Profile](https://github.com/rayxves)


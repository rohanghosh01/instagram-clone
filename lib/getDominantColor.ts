import ColorThief from "colorthief";

export const getDominantColor = (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable CORS for cross-origin images
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(img);
      resolve(dominantColor);
    };

    img.onerror = (err) => {
      reject(`Error loading image: ${err}`);
    };
  });
};

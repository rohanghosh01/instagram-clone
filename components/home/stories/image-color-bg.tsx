import { useEffect, useState } from "react";
import { getDominantColor } from "../../../lib/getDominantColor";

const ImageWithDominantColor = (imageUrl: any) => {
  const [dominantColor, setDominantColor] = useState<any>(null);

  useEffect(() => {
    async function fetchColor() {
      try {
        const color: any = await getDominantColor(imageUrl);
        setDominantColor(color);
      } catch (error) {
        console.error(error);
      }
    }
    fetchColor();
  }, []);

  return dominantColor;
};

export default ImageWithDominantColor;

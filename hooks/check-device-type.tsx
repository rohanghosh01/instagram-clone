import { useState, useEffect } from "react";

type DeviceType = "mobile" | "desktop";

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const checkDeviceType = () => {
      // Define breakpoints
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };

    // Check device type on initial render
    checkDeviceType();

    // You can optionally add a resize listener if needed for other purposes (like changing layout on resize)
    // window.addEventListener('resize', checkDeviceType);

    return () => {
      // Optional cleanup if resize listener is added
      // window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return deviceType;
};

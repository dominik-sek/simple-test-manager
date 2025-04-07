import { useEffect, useState } from "react";

const tailwindSizes = {
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
    "3xl": 1920,
    "4xl": 3840,
    "5xl": 5120
};

export const ScreenSizeWidget = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [tailwindSize, setTailwindSize] = useState("sm");

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            setScreenSize({ width: innerWidth, height: innerHeight });

            let currentSize = "sm";
            for (const key in tailwindSizes) {
                // @ts-ignore
                if (innerWidth >= tailwindSizes[key]) {
                    currentSize = key;
                }
            }
            setTailwindSize(currentSize);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 w-64 h-32 text-3xl bg-black opacity-20 text-white p-2">
            <p>Screen Size:</p>
            <p>{screenSize.width} x {screenSize.height}</p>
            <p>{tailwindSize}</p>
        </div>
    );
};

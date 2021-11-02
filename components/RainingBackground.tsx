import Script from "next/script";
import clsx from "clsx";

interface RainingBackgroundProps {
  show?: boolean;
}

const RainingBackground = ({ show = true }: RainingBackgroundProps) => {
  return (
    <>
      <canvas
        id="raining-canvas"
        className={clsx(
          "absolute z-0 w-full h-full bg-white/50 select-none",
          show ? "block" : "hidden"
        )}
      />
      <Script type="text/javascript" src="/scripts/rain.js" />
    </>
  );
};

export default RainingBackground;

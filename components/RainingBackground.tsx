import Script from "next/script";

const RainingBackground = () => {
  return (
    <>
      <canvas
        id="raining-canvas"
        className="absolute z-0 w-full h-full bg-white/50 select-none"
      />
      <Script type="text/javascript" src="/scripts/rain.js" />
    </>
  );
};

export default RainingBackground;

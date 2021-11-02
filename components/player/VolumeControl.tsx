import { VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

interface VolumeControl {
  volume: number;
  changeVolume?: (volume: number) => void;
}

const VolumeControl = ({ volume, changeVolume }: VolumeControl) => {
  const [prevVolume, setPrevVolume] = useState(volume);

  /**
   * Change audio volume.
   * 
   * @param e Change event.
   */
  const volumeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    changeVolume(newVolume);
    setPrevVolume(newVolume);
  };

  /**
   * Turn volume on/off.
   */
  const volumeButtonHandler = () => {
    if (volume === 0) {
      changeVolume(prevVolume);
    } else {
      changeVolume(0);
    }
  };

  return (
    <div className="group flex gap-x-0.5 items-center">
      <input
        type="range"
        className="volume"
        style={{ backgroundSize: `${volume * 100}% 100%` }}
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={volumeChangeHandler}
      />
      <button onClick={volumeButtonHandler}>
        {volume === 0 ? (
          <VolumeOffIcon className="w-4 h-4 text-white/50 group-hover:text-white" />
        ) : (
          <VolumeUpIcon className="w-4 h-4 text-white/50 group-hover:text-white" />
        )}
      </button>
    </div>
  );
};

export default VolumeControl;

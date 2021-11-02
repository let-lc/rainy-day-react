import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { RefreshIcon, LinkIcon } from "@heroicons/react/outline";
import { PauseIcon, PlayIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { formatTime } from "@rd/utils";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";

interface AudioEvent extends React.SyntheticEvent<HTMLAudioElement, Event> {}

interface PlayerProps {
  /**
   * Function trigger the url input to appear.
   */
  enableInputHandler: VoidFunction;
  /**
   * Play the next video.
   */
  nextVideo: VoidFunction;
  /**
   * Data response from the `/api/ytdl` API endpoint.
   */
  data: YtdlData;
}

const Player = ({ data, enableInputHandler, nextVideo }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [enableRepeatOne, setEnableRepeatOne] = useState(false);
  const [volume, setVolume] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");

  /**
   * Trigger audio element play/pause.
   */
  useEffect(() => {
    if (audioRef && audioRef.current && isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  /**
   * Update audio source state when new url passed in.
   */
  useEffect(() => {
    setAudioSrc(data.current.url);
  }, [data.current.url]);

  /**
   * Change audio element volume.
   */
  useEffect(() => {
    if (audioRef) audioRef.current.volume = volume;
  }, [volume]);

  /**
   * Set volume to 25% on mount.
   */
  useEffect(() => {
    if (audioRef && audioRef.current) setVolume(0.25);
  }, []);

  /**
   * Update current time state on time update of the audio element.
   *
   * @param e AudioEvent
   */
  const onTimeUpdate = (e: AudioEvent) => {
    if (!e.currentTarget.paused) setCurrentTime(e.currentTarget.currentTime);
  };

  /**
   * Set playing state to true when audio data is loaded.
   */
  const onLoadedData = () => {
    setIsPlaying(true);
  };

  /**
   * Update duration when audio metadata is loaded.
   *
   * @param e AudioEvent
   */
  const onLoadedMetadata = (e: AudioEvent) => {
    setDuration(e.currentTarget.duration);
  };

  /**
   * When progress bar change start(click down), pause the audio.
   */
  const changeCurrentTimeStart = () => {
    setIsPlaying(false);
  };

  /**
   * Change current time state.
   *
   * @param e Change event.
   */
  const changingCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.currentTarget.value));
  };

  /**
   * When progress bar changed finished, update audio element current time and start playing.
   *
   * @param e Mouse event.
   */
  const changeCurrentTimeEnd = (e: React.MouseEvent<HTMLInputElement>) => {
    audioRef.current.currentTime = Number(e.currentTarget.value);
    setIsPlaying(true);
  };

  /**
   * Trigger repeat the same audio or play next when the current audio ended.
   */
  const onAudioEnd = () => {
    if (enableRepeatOne) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextVideo();
    }
  };

  return (
    <div className="flex flex-col">
      <audio
        autoPlay
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onAudioEnd}
        className="w-full"
      />
      <div className="w-full flex gap-x-2 items-center">
        <ProgressBar
          min={0}
          max={Math.floor(duration)}
          percent={currentTime ? (currentTime / duration) * 100 : 0}
          value={currentTime}
          onMouseDown={changeCurrentTimeStart}
          onChange={changingCurrentTime}
          onMouseUp={changeCurrentTimeEnd}
        />
        <p className="select-none">
          <span className="text-sm font-bold select-none">
            {formatTime(currentTime)}
          </span>
          <span className="font-bold text-white/50 px-0.5 text-sm">/</span>
          <span className="text-sm font-bold select-none">
            {formatTime(duration)}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 w-24">
          <button
            onClick={enableInputHandler}
            className="opacity-80 hover:opacity-100"
          >
            <LinkIcon className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex items-center" title={isPlaying ? "Pause" : "Play"}>
          <button
            onClick={() => setEnableRepeatOne((p) => !p)}
            className={clsx(
              "mr-2 relative",
              enableRepeatOne &&
                'after:content-["•"] after:absolute after:-bottom-3.5 after:right-1.5 after:pr-px'
            )}
            title="Repeat"
          >
            <RefreshIcon
              className={clsx(
                "w-5 h-5 transition-all duration-300",
                enableRepeatOne
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              )}
            />
          </button>
          {/* Play/Pause Button */}
          <button onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? (
              <PauseIcon className="w-16 h-16 drop-shadow-white-md text-white/80 hover:text-white transition-all duration-300" />
            ) : (
              <PlayIcon className="w-16 h-16 drop-shadow-white-md text-white/80 hover:text-white transition-all duration-300" />
            )}
          </button>
          <button className="relative" title="Next" onClick={nextVideo}>
            <ChevronRightIcon className="w-8 h-8 text-white/80 hover:text-white transition-all duration-300" />
          </button>
        </div>
        <div>
          <VolumeControl volume={volume} changeVolume={setVolume} />
        </div>
      </div>
    </div>
  );
};

export default Player;

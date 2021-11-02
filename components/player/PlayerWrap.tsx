import React, { useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import { getURLVideoID } from "ytdl-core";

import Player from "./Player";
import AudioInfo from "./AudioInfo";

/**
 * Default YTDL data.
 */
const DEFAULT_DATA: YtdlData = {
  current: {
    channel: "",
    thumbnail: "/img/logo.svg",
    title: "",
    url: "",
    videoId: "",
  },
  next: { channel: "", thumbnail: "", title: "", videoId: "" },
};

const PlayerWrap = () => {
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const [urlInput, setUrlInput] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [data, setData] = useState<YtdlData>(DEFAULT_DATA);

  /**
   * Request ytdl audio data.
   *
   * @param videoId YouTube video id.
   */
  const getVideoData = (videoId: string) => {
    axios
      .post("/api/ytdl", { videoId })
      .then((res) => {
        setData(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });
  };

  /**
   * Reset image to placehoder on error.
   */
  const onImageError = () => {
    setData((p) => ({
      ...p,
      current: { ...p.current, thumbnail: "/img/logo.svg" },
    }));
  };

  /**
   * Trigger request when "Enter" key is pressed.
   *
   * @param e Keyboard event
   */
  const triggerRequest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const videoId = getURLVideoID(urlInput);
        getVideoData(videoId);
      } catch (err) {
        console.log(err.message);
        setUrlInput("");
      }
    }
  };

  /**
   * Update url input state.
   *
   * @param e Change event.
   */
  const inputUrlHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  /**
   * Request the next video data.
   */
  const nextVideo = () => {
    if (data.next.videoId) {
      getVideoData(data.next.videoId);
    }
  };

  return (
    <div className="w-full h-full max-w-5xl overflow-hidden rounded-md bg-white/10 shadow-white-3xl max-h-96">
      <div className="z-20 flex px-12 pt-12 gap-x-8">
        <div className="flex items-center justify-center w-48 h-48">
          <div className="flex items-center justify-center w-48 h-48 rounded-full shadow-white-md bg-white/25">
            <img
              src={data.current.thumbnail}
              ref={thumbnailRef}
              draggable={false}
              onError={onImageError}
              alt="Thumbnail"
              className="object-cover rounded-full select-none w-36 h-36"
            />
          </div>
        </div>
        <div className="flex flex-col flex-grow overflow-hidden text-white">
          <AudioInfo
            title={data.current.title}
            uploader={data.current.channel}
            source={`https://www.youtube.com/watch?v=${data.current.videoId}`}
          />
          <hr className="my-2 opacity-25" />
          <Player
            data={data}
            enableInputHandler={() => setEnableInput(!enableInput)}
            nextVideo={nextVideo}
          />
        </div>
      </div>
      <div className="z-20 flex px-12 py-10 pt-2 gap-x-8">
        <div className="w-48"></div>
        {enableInput && (
          <div className="flex-grow opacity-50 focus-within:opacity-100">
            <input
              value={urlInput}
              placeholder="Enter a YouTube video url."
              onKeyPress={triggerRequest}
              onChange={inputUrlHandler}
              onBlur={() => setEnableInput(false)}
              className="w-full px-2 py-px text-sm text-white placeholder-white/80 bg-transparent border rounded ring-1 ring-white/50 border-white/80 focus:outline-none caret-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerWrap;

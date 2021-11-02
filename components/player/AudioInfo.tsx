import React from "react";
import { YoutubeFilled } from "@ant-design/icons";
import { UserCircleIcon } from "@heroicons/react/solid";

interface AudioInfoProps {
  /**
   * YouTube video title.
   */
  title?: string;
  /**
   * YouTube video channel/uploader/author name.
   */
  uploader?: string;
  /**
   * YouTube video source url.
   */
  source?: string;
}

const AudioInfo = ({
  title = "<unknown_video_title>",
  uploader = "<unknown_uploader>",
  source = "#",
}: AudioInfoProps) => {
  return (
    <div className="flex-grow flex flex-col">
      <h1 className="w-full text-2xl font-bold line-clamp-2 drop-shadow-2xl flex-grow">
        {title || "<unknown_video_title>"}
      </h1>
      <h2 className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-x-1">
          <UserCircleIcon className="w-5 h-5 drop-shadow-2xl" />
          <span className="text-sm font-medium drop-shadow-2xl">
            {uploader || "<unknown_uploader>"}
          </span>
        </div>
        <a
          href={source || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <YoutubeFilled className="text-white/80 hover:text-white" />
        </a>
      </h2>
    </div>
  );
};

export default AudioInfo;

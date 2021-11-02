/**
 * Currently playing data.
 */
type CurrentAudio = {
  /**
   * YouTube video thumbnail image url.
   */
  thumbnail: string;
  /**
   * YouTube video id.
   */
  videoId: string;
  /**
   * YouTube video title.
   */
  title: string;
  /**
   * YouTube video channel name.
   */
  channel: string;
  /**
   * Audio file url.
   */
  url: string;
};

/**
 * Play next data.
 */
type NextAudio = {
  /**
   * YouTube video thumbnail image url.
   */
  thumbnail: string
  /**
   * YouTube video id.
   */;
  videoId: string
  /**
   * YouTube video title.
   */;
  title: string
  /**
   * YouTube video channel name.
   */;
  channel: string;
};

/**
 * YTDL endpoint response data.
 */
type YtdlData = {
  current: CurrentAudio;
  next: NextAudio;
};

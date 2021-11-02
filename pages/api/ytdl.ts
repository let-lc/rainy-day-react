import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

const YTDL = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { videoId } = req.body;

  if (req.method !== "POST" || !videoId) {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    const info = await ytdl.getInfo(videoId);
    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highest",
      filter: "audioonly",
    });

    res.status(200).json({
      current: {
        thumbnail:
          info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]
            .url,
        videoId: info.videoDetails.videoId,
        title: info.videoDetails.title,
        channel: info.videoDetails.ownerChannelName,
        url: audioFormat.url,
      },
      next: {
        thumbnail:
          info.related_videos[0].thumbnails[
            info.related_videos[0].thumbnails.length - 1
          ].url,
        videoId: info.related_videos[0].id,
        title: info.related_videos[0].title,
        channel:
          typeof info.related_videos[0].author === "string"
            ? info.related_videos[0].author
            : info.related_videos[0].author.name,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default YTDL;

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";

function VideoNugget() {
  const { updateVideoNugget } = useContext(NuggetsContext);
  const [caption, setCaption] = useState("");
  const [videoUrl, setvideoUrl] = useState("");

  const captionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
    updateVideoNugget({videoCaption: event.target.value})
  };
  const videoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvideoUrl(event.target.value);
    updateVideoNugget({videoURI: event.target.value})
  };

  // useEffect(() => {
  //   if (updateVideoNugget && caption && videoUrl)
  //     updateVideoNugget({
  //       videoCaption: caption,
  //       videoURI: videoUrl,
  //     });
  // }, [caption, videoUrl]);
  return (
    <>
      <div className="card-header add-section">
        <div className="video-caption">
          <p>Title (Optional)</p>
          <input
            className="image-type-input"
            type="text"
            value={caption}
            onChange={captionChange}
            placeholder="Caption"
          />
        </div>
        <div className="video-caption">
          <p>Video URL</p>
          <input
            className="image-type-input"
            type="url"
            value={videoUrl}
            onChange={videoUrlChange}
            placeholder="Video Url"
          />
        </div>
      </div>
    </>
  );
}

export default VideoNugget;

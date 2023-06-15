import React, { useMemo, useRef } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from "react";
// import { url } from 'inspector';

function VideoPrev() {
  const { nugget } = useContext(NuggetsContext);
  const playerUrl = useMemo(() => {
    return "blob:https://admin-video.penpencil.xyz/41cfb779-a6aa-4c35-afd6-889c198cf339";
  }, []);

  return (
    <>
      <div className="ImagePrev">
        <video
          width="320"
          height="240"
          preload="auto"
          controls
          autoPlay
          src={playerUrl}
        >
          Your browser does not support the video tag.
        </video>
        <p>{nugget?.caption}</p>
      </div>
    </>
  );
}

export default VideoPrev;

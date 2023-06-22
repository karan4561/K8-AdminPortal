import React, { useMemo, useRef } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from "react";
// import { url } from 'inspector';

function VideoPrev() {
  const { nugget } = useContext(NuggetsContext);
  const playerUrl = useMemo(() => {
    return "https://d1d34p8vz63oiq.cloudfront.net/c7e9a2d6-328a-42cb-b879-b00b0db4cc4a/master.mpd";
  }, []);

  return (
    <>
      <div className="ImagePrev">
        <iframe
          src={`https://pw-video-player-stage.penpencil.co?url=${playerUrl}&type=MPD&default_muted=false&default_paused=true&video_details=eyJ2aWRlb0RldGFpbHMiOnsidHlwZXMiOlsiREFTSCJdfX0=`}
        />
        <p>{nugget?.caption}</p>
      </div>
    </>
  );
}

export default VideoPrev;

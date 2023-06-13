import React, { useMemo, useRef } from 'react'
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';
// import { url } from 'inspector';

function VideoPrev() {
    const { nugget } = useContext(NuggetsContext)
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const playerUrl = useMemo(() => {
        return (
            "https://pw-video-player-dev.penpencil.co" +
            '?encoded_url=' +
            '&type=MP4' +
            '&hide_controls=true' +
            '&loop=true' +
            '&default_muted=' +
            // isMute +
            '&default_paused=' +
            '&video_details='
        );
    }, []);

    return (
        <>
            <div className='ImagePrev'>
                {/* <video width="500px" height="500px" controls>
      <source src={`nugget.videoURI`} type="video/mp4"/>
      </video> */}
                <iframe 
                width="720" 
                height="350" 
                src={playerUrl}
                ref={iframeRef}
                />
                <p>{nugget?.caption}</p>
            </div>
        </>
    )
}

export default VideoPrev
import React, { useRef } from 'react'

function AudioPrev({ nugget }: any) {

    const audioRef = useRef(null);

    return (
        <>
            <div className='AudioPrev ImagePrev'>
                {(!!nugget.audioUri) && <audio ref={audioRef} controls>
                    <source src={nugget.audioUri.baseUrl+nugget.audioUri.key} type="audio/mpeg" />
                </audio>}
                {/* {(!!nugget.imageUri) && <img src={nugget.audioUri.baseUrl + nugget.audioUri.key} width={30} height={250} alt='' />} */}
                <p>{nugget?.caption}</p>
            </div>
        </>
    )
}

export default AudioPrev
import React, { useRef } from 'react'

function AudioPrev({ nugget }: any) {
    const audioRef = useRef();

    // const play = () => {
    //   if (audioRef.current) {
    //     audioRef.current.play()
    //   } else {
    //     // Throw error
    //   }
    // }
  
    return (
        <>
            <div className='ImagePrev'>
                {(!!nugget.audioUri) && <audio ref={audioRef} src={nugget.audioUri.baseUrl+nugget.audioUri.key} />}
                {/* {(!!nugget.imageUri) && <img src={nugget.audioUri.baseUrl + nugget.audioUri.key} width={30} height={250} alt='' />} */}
                <p>{nugget?.caption}</p>
            </div>
        </>
    )
}

export default AudioPrev
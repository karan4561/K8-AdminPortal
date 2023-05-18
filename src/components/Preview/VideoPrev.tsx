import React from 'react'
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';

function VideoPrev() {
    const {nugget} =useContext(NuggetsContext)
    
    return (
        <>
            <div className='ImagePrev'>
                {/* <video width="500px" height="500px" controls>
      <source src={`nugget.videoURI`} type="video/mp4"/>
      </video> */}
                <iframe width="720" height="350" src={nugget?.videoURI}></iframe>
                <p>{nugget?.caption}</p>
            </div>
        </>
    )
}

export default VideoPrev
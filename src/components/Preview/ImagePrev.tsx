import React from 'react'
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';
import Image from 'next/image';

function ImagePrev({nugget}:any) {
    // const {nugget} = useContext(NuggetsContext)
    return (
        <>
            <div className='ImagePrev'>
                {(!!nugget.imageUri) && <img src={nugget.imageUri.baseUrl+nugget.imageUri.key} width={30} height={250} alt='' />}
                <p>{nugget?.caption}</p>
            </div>
        </>
    )
}

export default ImagePrev
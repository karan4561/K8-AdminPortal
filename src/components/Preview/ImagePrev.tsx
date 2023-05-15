import React from 'react'
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';
import Image from 'next/image';

function ImagePrev() {
    const {nugget} = useContext(NuggetsContext)
    return (
        <>
            <div className='ImagePrev'>
                <Image src='/pencil.png' width={30} height={250} alt='' />
                <p>{nugget?.caption}</p>
            </div>
        </>
    )
}

export default ImagePrev
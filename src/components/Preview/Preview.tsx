import React from 'react'
import TrueFalsePrev from './TrueFalsePrev'
import ImagePrev from './ImagePrev';
import VideoPrev from './VideoPrev';
import SCQPrev from './SCQPrev';
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';
import { log } from 'console';

function Preview() {
    const { test } = useContext(NuggetsContext);
    return (
        <>
            <div className="preview">
                <h2>Preview</h2>
                <div className='headerimage-headertitle'>
                    {/* {(!!nugget?.headerTitle) && <Image src='/pencil.png' alt='' height={18.33} width={18.33}/>} */}
                    <h4>{test?.headerTitle}</h4>
                </div>
                {/* {(test?.kind == 'IMG') && <ImagePrev />} */}
                {/* {(test?.kind == 'Video') && <VideoPrev />} */}
                {/* {(test?.kind == 'TrueFalse') && <TrueFalsePrev />} */}
                {(test?.kind == 'SCQ') && <SCQPrev />}
                {(test?.kind == 'MCQ') && <SCQPrev />}
                {/* {(test?.kind=='Note') && <NoteNugget/>} */}
            </div>
        </>
    )
}

export default Preview
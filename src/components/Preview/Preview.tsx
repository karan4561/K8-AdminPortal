import React from 'react'
import TrueFalsePrev from './TrueFalsePrev'
import ImagePrev from './ImagePrev';
import VideoPrev from './VideoPrev';
import SCQPrev from './SCQPrev';
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';

function Preview() {
    const { nugget } = useContext(NuggetsContext);
    return (
        <>
            <div className="preview">
                <h2>Preview</h2>
                <div className='headerimage-headertitle'>
                    {/* {(!!nugget?.headerTitle) && <Image src='/pencil.png' alt='' height={18.33} width={18.33}/>} */}
                    <h4>{nugget?.headerTitle}</h4>
                </div>
                {(nugget?.kind == 'IMG') && <ImagePrev />}
                {(nugget?.kind == 'Video') && <VideoPrev />}
                {/* {(nugget?.kind=='Note') && <NoteNugget/>} */}
                {(nugget?.kind == 'TrueFalse') && <TrueFalsePrev />}
                {(nugget?.kind == 'SCQ') && <SCQPrev />}
                {(nugget?.kind == 'MCQ') && <SCQPrev />}
            </div>
        </>
    )
}

export default Preview
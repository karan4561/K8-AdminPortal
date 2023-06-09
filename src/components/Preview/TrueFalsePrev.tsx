import React from 'react'
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';

function TrueFalsePrev({ nugget }:any) {
    console.log("tfprev");
    return (
        <>
            {(!!nugget?.question?.content?.english) && <p dangerouslySetInnerHTML={{ __html: nugget.question.content.english }} />}
            <div className='TFPrev'>
                <div className='TFOptionPrev' style={{backgroundColor: (nugget.question?.bilingual_options.english[0].text=="true")?"#d5d7d6":"#fffaf7"}}>
                    <div style={{backgroundColor: (nugget.question?.bilingual_options.english[0].text=="true")?"gray":"white"}}></div>
                    <p>True</p>
                </div>
                <div className='TFOptionPrev' style={{backgroundColor: (nugget.question?.bilingual_options.english[0].text=="false")?"#d5d7d6":"#fffaf7"}}>
                    <div style={{backgroundColor: (nugget.question?.bilingual_options.english[0].text=="false")?"gray":"white"}}></div>
                    <p>False</p>
                </div>
            </div>
            <div className='prev-buttons'>
                <p>Hint</p>
                <p className='Submit-prev'>Submit</p>
                <p className='Submit-prev prev-color'>Don't Know</p>
            </div>
            {(!!nugget.question?.solutions?.[0]?.english.text) && <div className='Hint-Prev-box'>
                <h4>Solution</h4>
                {(!!nugget.question?.solutions[0]?.english.text) && <p dangerouslySetInnerHTML={{ __html: nugget.question.solutions[0]?.english.text }} />}
            </div>}
            {(!!nugget.question?.solutions?.[0]?.english.hint) && <div className='Hint-Prev-box'>
                <h4>Hint</h4>
                {(!!nugget.question?.solutions?.[0]?.english.hint) && <p dangerouslySetInnerHTML={{ __html: nugget.question.solutions[0]?.english.hint }} />}
            </div>}
        </>
    )
}

export default TrueFalsePrev
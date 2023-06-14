import React from 'react'
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext } from 'react';

function TrueFalsePrev({ TFPrevData }) {
    const parse = require('html-react-parser');
    console.log("tfprev");
    return (
        <>
            {(!!TFPrevData.question?.content?.english) && <p>{parse(TFPrevData.question.content.english)}</p>}
            <div className='TFPrev'>
                <div className='TFOptionPrev' style={{backgroundColor: (TFPrevData.question?.bilingual_options.english[0].text=="true")?"#d5d7d6":"#fffaf7"}}>
                    <div style={{backgroundColor: (TFPrevData.question?.bilingual_options.english[0].text=="true")?"gray":"white"}}></div>
                    <p>True</p>
                </div>
                <div className='TFOptionPrev' style={{backgroundColor: (TFPrevData.question?.bilingual_options.english[0].text=="false")?"#d5d7d6":"#fffaf7"}}>
                    <div style={{backgroundColor: (TFPrevData.question?.bilingual_options.english[0].text=="false")?"gray":"white"}}></div>
                    <p>False</p>
                </div>
            </div>
            <div className='prev-buttons'>
                <p>Hint</p>
                <p className='Submit-prev'>Submit</p>
                <p className='Submit-prev prev-color'>Don't Know</p>
            </div>
            {(!!TFPrevData.question?.solutions[0]?.english.text) && <div className='Hint-Prev-box'>
                <h4>Solution</h4>
                {(!!TFPrevData.question?.solutions[0]?.english.text) && <p>{parse(TFPrevData.question.solutions[0]?.english.text)}</p>}
            </div>}
            {(!!TFPrevData.question?.solutions[0]?.english.hint) && <div className='Hint-Prev-box'>
                <h4>Hint</h4>
                {(!!TFPrevData.question?.solutions[0]?.english.hint) && <p>{parse(TFPrevData.question.solutions[0]?.english.hint)}</p>}
            </div>}
        </>
    )
}

export default TrueFalsePrev
import React from 'react'
import { useState,useContext,useEffect } from 'react'
import TextEditor  from './TextEditor'
// import HintTextEditor from './HintTextEditor'
// import SolutionTextEditor from './Solution'
import { NuggetsContext } from "../../context/NuggetsContext";
interface OptionType {
    value: 'True' | 'False';
  }
function TrueFalseNugget() {
    const [solContent,setSolContent]=useState<string>()
    const [hintContent,setHintContent]=useState<string>()
    const { nugget,updateTFAnswer,updateTFSolHint,updateTFQuestion } = useContext(NuggetsContext);
    const onUpdateQues = (content:string) => {
        updateTFQuestion({
            english: content,
        })
        // setQuestionContent(content);
      };
      const onUpdateSol = (content:string) => {
        setSolContent(content);
      };
      const onUpdateHint = (content:string) => {
        setHintContent(content);
      };
    //   console.log(quesContent,solContent,hintContent);
    const OptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTFAnswer({
            answer: event.target.value as OptionType['value']
        })
    };
    useEffect(()=>{
        updateTFSolHint({
            text: solContent,
            hint: hintContent,
        })
    },[solContent,hintContent])
    return (
        <>
            <div className='card-header NuggetId TrueFalseNugget'>
                <h4>Question</h4>
                <TextEditor onUpdate={onUpdateQues}/>
                <h4>Answers Options</h4>
                <div className='TFOption'>
                    <p>A.  True</p>
                </div>
                <div className='TFOption'>
                    <p>A.  False</p>
                </div>
                <h4>Hint</h4>
                <TextEditor onUpdate={onUpdateHint}/>
                <h4>Solution</h4>
                <TextEditor onUpdate={onUpdateSol}/>
                <div className='TrueFalseOption'>
                    <h4>Select Correct<br />Answer</h4>
                    <label className='label-option'>
                        <input
                            type="radio"
                            name="optio"
                            value="True"
                            checked={nugget.question?.answer?.english === 'True'}
                            onChange={OptionChange}
                        />
                        True
                    </label>
                    <label className='label-option'>
                        <input
                            type="radio"
                            name="optio"
                            value="False"
                            checked={nugget.question?.answer?.english === 'False'}
                            onChange={OptionChange}
                        />
                        False
                    </label>
                </div>
            </div>
        </>
    )
}
export default TrueFalseNugget
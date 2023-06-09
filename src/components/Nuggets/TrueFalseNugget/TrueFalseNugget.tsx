import React from "react";
import { useState, useContext, useEffect } from "react";
import TextEditor from "./TextEditor";
import { NuggetsContext } from "../../../context/NuggetsContext";
interface OptionType {
  value: "True" | "False";
}
function TrueFalseNugget() {
  const [solContent, setSolContent] = useState<string>();
  const [hintContent, setHintContent] = useState<string>();
  const {
    nugget,
    updateAnswer,
    updateSolHint,
    updateQuestion,
  } = useContext(NuggetsContext);
  const onUpdateQues = (content: string) => {
    if (updateQuestion)
      updateQuestion({
        english: content,
      });
  };
  const onUpdateSol = (content: string) => {
    setSolContent(content);
  };
  const onUpdateHint = (content: string) => {
    setHintContent(content);
  };
  const OptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true";
    if (updateAnswer)
      updateAnswer({
        answer:value
      });
  };
  // useEffect(() => {
  //   updateSolHint({
  //     text: solContent,
  //     hint: hintContent,
  //   });
  // }, [solContent, hintContent]);
  return (
    <>
      <div className="card-header NuggetId TrueFalseNugget">
        <h4>Question</h4>
        <TextEditor value={nugget.question.content?.english} onUpdate={onUpdateQues} />
        <h4>Answers Options</h4>
        <div className="TFOption">
          <p>A. True</p>
        </div>
        <div className="TFOption">
          <p>A. False</p>
        </div>
        <h4>Hint</h4>
        <TextEditor value={nugget.question.solutions[0].english.hint} onUpdate={(content: string) => updateSolHint({hint:content})} />
        <h4>Solution</h4>
        <TextEditor value={nugget.question.solutions[0].english.text} onUpdate={(content: string) => updateSolHint({text:content})} />
        <div className="TrueFalseOption">
          <h4>
            Select Correct
            <br />
            Answer
          </h4>
          <label className="label-option">
            <input
              type="radio"
              name="optio"
              value={false.toString()}
              checked={nugget.question?.bilingual_options.english[0].isCorrect === true}
              onChange={OptionChange}
            />
            True
          </label>
          <label className="label-option">
            <input
              type="radio"
              name="optio"
              value={false.toString()}
              checked={nugget.question?.bilingual_options.english[0].isCorrect === false}
              onChange={OptionChange}
            />
            False
          </label>
        </div>
      </div>
    </>
  );
}
export default TrueFalseNugget;

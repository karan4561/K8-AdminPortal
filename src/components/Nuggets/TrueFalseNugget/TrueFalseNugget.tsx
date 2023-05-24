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
    nugget: test,
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
    if (updateAnswer)
      updateAnswer({
        answer: event.target.value as OptionType["value"],
      });
  };
  useEffect(() => {
    updateSolHint({
      text: solContent,
      hint: hintContent,
    });
  }, [solContent, hintContent]);
  return (
    <>
      <div className="card-header NuggetId TrueFalseNugget">
        <h4>Question</h4>
        <TextEditor onUpdate={onUpdateQues} />
        <h4>Answers Options</h4>
        <div className="TFOption">
          <p>A. True</p>
        </div>
        <div className="TFOption">
          <p>A. False</p>
        </div>
        <h4>Hint</h4>
        <TextEditor onUpdate={onUpdateHint} />
        <h4>Solution</h4>
        <TextEditor onUpdate={onUpdateSol} />
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
              value="True"
              checked={test.question?.answer?.english === "True"}
              onChange={OptionChange}
            />
            True
          </label>
          <label className="label-option">
            <input
              type="radio"
              name="optio"
              value="False"
              checked={test.question?.answer?.english === "False"}
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

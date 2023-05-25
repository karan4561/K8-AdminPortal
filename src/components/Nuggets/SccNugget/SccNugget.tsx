import React from "react";
import TextEditor from "../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "../../../context/NuggetsContext";
import { useState, useContext, useEffect } from "react";
import AddTextEditor from "./AddTextEditor";

function SccNugget() {
  const {
    nugget: nugget,
    updateQuestion,
    updateSolHint,
    updateCorrectOption,
  } = useContext(NuggetsContext);
  const [option, setOption] = useState<number>();
  const [solContent, setSolContent] = useState<string>();
  const [hintContent, setHintContent] = useState<string>();
  const OptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(Number(event.target.value));
    updateCorrectOption({
      index: Number(event.target.value),
      isCorrect: true,
    });
  };
  const onUpdateQues = (content: string) => {
    if (updateQuestion)
      updateQuestion({
        english: content,
      });
  };
  const onUpdateHint = (content: string) => {
    setHintContent(content);
  };
  const onUpdateSol = (content: string) => {
    setSolContent(content);
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
        <div>
          <h4>Answers Options</h4>
        </div>
        <div>
          <AddTextEditor />
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
          {nugget.question?.bilingual_options?.english.map(
            (arrayData, index) => {
              const indexToAlpha = (index = 1) => {
                // ASCII value of first character
                const A = "A".charCodeAt(0);
                let numberToCharacter = (number: number) => {
                  return String.fromCharCode(A + number);
                };
                return numberToCharacter(index);
              };
              return (
                <>
                  <label className="label-option">
                    <input
                      type="radio"
                      name="SCCOption"
                      value={index}
                      checked={option === index}
                      onChange={OptionChange}
                    />
                    Option {indexToAlpha(index)}
                  </label>
                </>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default SccNugget;

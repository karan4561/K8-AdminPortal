import React from "react";
import TextEditor from "../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "../../../context/NuggetsContext";
import { useState, useContext, useEffect } from "react";
import AddOptionTextEditor from "../SccNugget/AddTextEditor";

function MCQNugget() {
  const {
    updateQuestion,
    updateSolHint,
    updateCorrectOption,
    nugget: test,
  } = useContext(NuggetsContext);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [solContent, setSolContent] = useState<string>();
  const [hintContent, setHintContent] = useState<string>();

  const OptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionIndex = Number(event.target.value);
    const selectedOptionIndex = selectedOptions.indexOf(optionIndex);
    if (selectedOptionIndex === -1) {
      // Add option to selected options
      setSelectedOptions([...selectedOptions, optionIndex]);
      updateCorrectOption({
        index: optionIndex,
        isCorrect: true,
      });
    } else {
      // Remove option from selected options
      setSelectedOptions(
        selectedOptions.filter((index) => index !== optionIndex)
      );
      updateCorrectOption({
        index: optionIndex,
        isCorrect: false,
      });
    }
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
          <AddOptionTextEditor />
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
          {test.question?.bilingual_options?.english.map((arrayData, index) => {
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
                    type="checkbox"
                    name="SCCOption"
                    value={index}
                    checked={selectedOptions.includes(index)}
                    onChange={OptionChange}
                  />
                  Option {indexToAlpha(index)}
                </label>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MCQNugget;

// empty option
// validation on option required or not
// selecting every option
// connect with product team for validation = test cases

//preview

//INuggetContext improving

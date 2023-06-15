import React, { useState, useContext, useEffect } from "react";
import TextEditor from "../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "../../../context/NuggetsContext";
import AddTextEditor from "./AddTextEditor";
import { text } from "stream/consumers";

function SccNugget() {
  let indexTrue: number;
  const { nugget, updateQuestion, updateSolHint, updateCorrectOption } =
    useContext(NuggetsContext);

  const OptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCorrectOption({
      index: Number(event.target.value),
      isCorrect: true,
    });
  };

  const onUpdateQues = (content: string) => {
    if (updateQuestion) {
      updateQuestion({
        english: content,
      });
    }
  };

  return (
    <>
      <div className="card-header NuggetId TrueFalseNugget">
        <h4>Question</h4>
        <TextEditor
          value={nugget.question.content?.english}
          onUpdate={(content: string) => onUpdateQues(content)}
        />
        <div>
          <h4>Answers Options</h4>
        </div>
        <div>
          <AddTextEditor />
        </div>
        <h4>Hint</h4>
        <TextEditor
          value={nugget.question.solutions[0].english.hint}
          onUpdate={(content: string) => updateSolHint({ hint: content })}
        />
        <h4>Solution</h4>
        <TextEditor
          value={nugget.question.solutions[0].english.text}
          onUpdate={(content: string) => updateSolHint({ text: content })}
        />
        <div className="TrueFalseOption">
          <h4>
            Select Correct
            <br />
            Answer
          </h4>
          {nugget.question?.bilingual_options?.english.map(
            (arrayData, index) => {
              const indexToAlpha = (index = 1) => {
                const A = "A".charCodeAt(0);
                let numberToCharacter = (number: number) => {
                  return String.fromCharCode(A + number);
                };
                return numberToCharacter(index);
              };

              if (arrayData.isCorrect === true) {
                indexTrue = index;
              }

              return (
                <label className="label-option" key={index}>
                  <input
                    type="radio"
                    name="SCCOption"
                    value={index}
                    checked={indexTrue === index}
                    onChange={OptionChange}
                  />
                  Option {indexToAlpha(index)}
                </label>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default SccNugget;

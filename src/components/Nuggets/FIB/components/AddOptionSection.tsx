import React from "react";
import TextEditor from "../../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "../../../../context/NuggetsContext";
import { useState, useEffect, useContext } from "react";

function AddOptionSection() {
  const {
    nugget: test,
    updateFIBOption,
    deleteFIBOption,
    addFIBOption,
  } = useContext(NuggetsContext);

  function addSection() {
    addFIBOption();
  }

  function handleDelete(index: number) {
    deleteFIBOption({ index });
  }

  function updateAnswerOption(index: number, content: string) {
    updateFIBOption({ index, text: content });
  }

  const sectionElements = test.question?.extraOptions?.english.map(
    (section, index) => {
      return (
        <>
          <div key={index}>
            <TextEditor
              value={section.text}
              onUpdate={(content: string) => updateAnswerOption(index, content)}
              fibExtraOption={"fibExtraOption"}
            />
          </div>
          {test.question.extraOptions.english.length !== 1 && (
            <button onClick={() => handleDelete(index)}>Delete</button>
          )}
        </>
      );
    }
  );

  return (
    <>
      <button className="other-option-button" onClick={addSection}>
        + Add Other Option
      </button>
      {sectionElements}
    </>
  );
}

export default AddOptionSection;

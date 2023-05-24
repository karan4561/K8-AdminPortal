import React from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import { useState, useContext } from "react";

function SCQPrev() {
  const { test } = useContext(NuggetsContext);
  const parse = require("html-react-parser");
  return (
    <>
      {!!test?.question?.content?.english && (
        <p>{parse(test?.question.content?.english)}</p>
      )}
      {!!test?.question?.bilingual_options?.english && (
        <div className="TFPrev">
          {test.question.bilingual_options.english.map((optionData, index) => {
            return (
              <>
                <div className="TFOptionPrev scq-option-prev">
                  <p>
                    {index + 1}. {parse(optionData.text)}
                  </p>
                  <div></div>
                </div>
              </>
            );
          })}
        </div>
      )}
      <div className="prev-buttons">
        <p>Hint</p>
        <p className="Submit-prev">Submit</p>
        <p className="Submit-prev prev-color">Don't Know</p>
      </div>
      {!!test.question?.solutions[0].english.text && (
        <div className="Hint-Prev-box">
          <h4>Solution</h4>
          {!!test.question?.solutions[0]?.english.text && (
            <p>{parse(test.question.solutions[0]?.english.text)}</p>
          )}
        </div>
      )}
      {!!test?.question?.solutions[0]?.english.hint && (
        <div className="Hint-Prev-box">
          <h4>Hint</h4>
          {!!test?.question?.solutions[0]?.english.hint && (
            <p>{parse(test?.question.solutions[0]?.english.hint)}</p>
          )}
        </div>
      )}
    </>
  );
}

export default SCQPrev;

//Text Editor

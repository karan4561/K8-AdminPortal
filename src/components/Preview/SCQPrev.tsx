import React from "react";
import { Nugget } from "@/interfaces/INugget";

function SCQPrev({ nugget }) {
  // const { nugget } = useContext(NuggetsContext);
  const parse = require("html-react-parser");
  return (
    <>
      {!!nugget?.question?.content?.english && (
        <p>{parse(nugget?.question.content?.english)}</p>
      )}
      {
        <div className="TFPrev">
          {nugget.question.bilingual_options.english.map(
            (optionData, index) => {
              // console.log(optionData.text,"optionData.text");
              return (
                <>
                  {!!optionData.text && (
                    <div className="TFOptionPrev scq-option-prev">
                      <p>
                        {index + 1}. {parse(optionData.text)}
                      </p>
                      <div></div>
                    </div>
                  )}
                </>
              );
            }
          )}
        </div>
      }
      <div className="prev-buttons">
        <p>Hint</p>
        <p className="Submit-prev">Submit</p>
        <p className="Submit-prev prev-color">Don't Know</p>
      </div>
      {!!nugget.question?.solutions[0]?.english.text && (
        <div className="Hint-Prev-box">
          <h4>Solution</h4>
          {!!nugget.question?.solutions[0]?.english.text && (
            <p>{parse(nugget.question.solutions[0]?.english.text)}</p>
          )}
        </div>
      )}
      {!!nugget?.question?.solutions[0]?.english.hint && (
        <div className="Hint-Prev-box">
          <h4>Hint</h4>
          {!!nugget?.question?.solutions[0]?.english.hint && (
            <p>{parse(nugget?.question.solutions[0]?.english.hint)}</p>
          )}
        </div>
      )}
    </>
  );
}

export default SCQPrev;

//Text Editor

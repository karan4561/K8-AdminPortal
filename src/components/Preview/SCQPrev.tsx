import React from "react";
import { Nugget } from "@/interfaces/INugget";

function SCQPrev({ nugget }: any) {
  // const { nugget } = useContext(NuggetsContext);
  const parse = require("html-react-parser");
  return (
    <>
      <div className="image-width">
        {!!nugget?.question?.content?.english && (
          <p
            dangerouslySetInnerHTML={{
              __html: nugget?.question?.content?.english,
            }}
          />
        )}
        {
          <div className="SCQPrev">
            {nugget.question?.bilingual_options &&
              nugget.question?.bilingual_options.english.map(
                (optionData, index) => {
                  return (
                    <>
                      {!!optionData.text && (
                        <div
                          className="TFOptionPrev scq-option-prev"
                          style={{
                            backgroundColor: optionData.isCorrect
                              ? "#d5d7d6"
                              : "#fffaf7",
                          }}
                        >
                          <p>
                            {index + 1}. {parse(optionData.text)}
                          </p>
                          <div
                            style={{
                              backgroundColor: optionData.isCorrect
                                ? "gray"
                                : "white",
                            }}
                          ></div>
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
        {!!nugget.question?.solutions?.[0].english.text && (
          <div className="Hint-Prev-box">
            <h4>Solution</h4>
            {!!nugget.question?.solutions[0]?.english.text && (
              <p>{parse(nugget.question.solutions[0]?.english.text)}</p>
            )}
          </div>
        )}
        {!!nugget?.question?.solutions?.[0].english.hint && (
          <div className="Hint-Prev-box">
            <h4>Hint</h4>
            {!!nugget?.question?.solutions[0]?.english.hint && (
              <p>{parse(nugget?.question.solutions[0]?.english.hint)}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SCQPrev;

//Text Editor

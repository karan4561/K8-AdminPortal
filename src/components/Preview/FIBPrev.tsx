import React from "react";

interface OptionType {
  value: string;
  type: string;
}

interface ExtraOptions {
  text: string;
}

function FIBPrev({ nugget }: any) {
  return (
    <>
      <h2>Fill In The Blanks</h2>
      {(!!nugget.question.fib?.english ||
        !!nugget.question.extraOptions?.english) && (
        <div className="fib-prev-header">
          {!!nugget.question.fib?.english && (
            <p className="fib-header">
              {nugget.question.fib?.english.map((fibData: OptionType) => {
                return (
                  <>
                    {fibData.type == "text" && (
                      <p
                        className="fib"
                        dangerouslySetInnerHTML={{ __html: fibData.value }}
                      />
                    )}
                    {fibData.type == "blank" && (
                      <p
                        className="fib-blank-type"
                        dangerouslySetInnerHTML={{ __html: fibData.value }}
                      />
                    )}
                  </>
                );
              })}
            </p>
          )}
          {!!nugget.question.extraOptions?.english && <h2>Extra Option</h2>}
          {!!nugget.question.extraOptions?.english && (
            <p className="fib-header">
              {nugget.question.extraOptions?.english.map(
                (extraOptionsData: ExtraOptions) => {
                  return (
                    <>
                      {!!extraOptionsData.text && (
                        <p
                          className="fib-blank-type"
                          dangerouslySetInnerHTML={{
                            __html: extraOptionsData.text,
                          }}
                        />
                      )}
                    </>
                  );
                }
              )}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default FIBPrev;

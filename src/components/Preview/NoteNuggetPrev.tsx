import React from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import { useState, useContext } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { before } from "node:test";
import { colors } from "react-select/dist/declarations/src/theme";

function convertToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  var str = "";

  for (var i of Object.keys(roman)) {
    var q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}

function NoteNuggetPrev({ nugget }: any) {
  var value = 10;
  // const { nugget } = useContext(NuggetsContext);
  // console.log(nugget,"noteprev");

  return (
    <>
      {nugget.content?.map((contentData, index) => {
        return (
          <>
            {contentData.kind == "H1" && (
              <div className="h1-title">
                {nugget.content[index].icon && (
                  <img
                    src={
                      nugget.content[index].icon?.baseUrl +
                      nugget.content[index].icon?.key
                    }
                    alt=""
                    height={25}
                    width={25}
                  />
                )}
                {contentData.list?.map((listData, index) => {
                  if (!!listData) {
                    return (
                      <>
                        <h1
                          key={index}
                          dangerouslySetInnerHTML={{ __html: listData.rtx }}
                        />
                      </>
                    );
                  }
                })}
              </div>
            )}
            {contentData.kind == "H2" && (
              <div className="h1-title">
                {nugget.content[index].icon && (
                  <img
                    src={
                      nugget.content[index].icon?.baseUrl +
                      nugget.content[index].icon?.key
                    }
                    alt=""
                    height={25}
                    width={25}
                  />
                )}
                {contentData.list?.map((listData, index) => {
                  return (
                    <>
                      {!!listData && (
                        <h2
                          key={index}
                          className="h2Prev"
                          dangerouslySetInnerHTML={{ __html: listData.rtx }}
                        />
                      )}
                    </>
                  );
                })}
              </div>
            )}
            {contentData.kind == "OL" && (
              <div>
                {contentData.list?.map((listData, index) => {
                  return (
                    <>
                      <div className="pre-suff-val-prev">
                        <p>{contentData.bullet?.prefix}</p>
                        <p
                          style={{
                            color: contentData.bullet?.color,
                            margin: "0px 2px",
                          }}
                        >
                          {contentData.bullet?.value == "1" && index + 1}
                          {contentData.bullet?.value === "I" &&
                            convertToRoman(index + 1)}
                          {contentData.bullet?.value === "I" &&
                            convertToRoman(index + 1)}
                          {contentData.bullet?.value === "a" &&
                            (index + 10).toString(36).toLowerCase()}
                        </p>
                        <p>{contentData.bullet?.suffix}</p>
                        <p
                          className="OL-text"
                          key={index}
                          dangerouslySetInnerHTML={{ __html: listData.rtx }}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            )}
            {contentData.kind == "P" && (
              <div className="text-prev">
                {contentData.list?.map((listData, index) => {
                  return (
                    <>
                      {!!listData && (
                        <p
                          key={index}
                          dangerouslySetInnerHTML={{ __html: listData.rtx }}
                        />
                      )}
                    </>
                  );
                })}
              </div>
            )}
            {contentData.kind == "UL" && (
              <div className="text-prev">
                {contentData.list?.map((listData, ulIndex) => {
                  return (
                    <>
                      <div className="ul-ls-item">
                        {!!nugget.content[index]?.icon && (
                          <img
                            src={
                              nugget.content[index].icon?.baseUrl +
                              nugget.content[index].icon?.key
                            }
                            alt=""
                            height={25}
                            width={25}
                          />
                        )}
                        {!!listData && (
                          <p
                            key={ulIndex}
                            dangerouslySetInnerHTML={{ __html: listData.rtx }}
                          />
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </>
        );
      })}
    </>
  );
}

export default NoteNuggetPrev;

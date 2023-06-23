import React from "react";
import { NuggetsContext } from "../../../context/NuggetsContext";
import { useState, useContext } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { before } from "node:test";
import { colors } from "react-select/dist/declarations/src/theme";
function NoteNuggetPrev({ nugget }: any) {
  const parse = require("html-react-parser");
  // const { nugget } = useContext(NuggetsContext);
  // console.log(nugget,"noteprev");

  return (
    <>
      {nugget.content?.map((contentData) => {
        return (
          <>
            {contentData.kind == "H1" && (
              <div className="h1-title">
                <Image src="/pencil.png" alt="" height={25} width={25} />
                {contentData.list?.map((listData, index) => {
                  if (!!listData) {
                    return (
                      <>
                        <h1 key={index}>{parse(listData.rtx)}</h1>
                      </>
                    );
                  }
                })}
              </div>
            )}
            {contentData.kind == "H2" && (
              <div className="h1-title">
                <Image src="/pencil.png" alt="" height={20} width={20} />
                {contentData.list?.map((listData, index) => {
                  return (
                    <>
                      {!!listData && (
                        <h2 key={index} className="h2Prev">
                          {parse(listData.rtx)}
                        </h2>
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
                          {index + 1}
                        </p>
                        <p>{contentData.bullet?.suffix}</p>
                        <p className="OL-text" key={index}>
                          {parse(listData.rtx)}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
            {contentData.kind == "Text" && (
              <div className="text-prev">
                {contentData.list?.map((listData, index) => {
                  return (
                    <>
                      {!!listData && <p key={index}>{parse(listData.rtx)}</p>}
                    </>
                  );
                })}
              </div>
            )}
            {contentData.kind == "UL" && (
              <div className="text-prev">
                <ul>
                  {contentData.list?.map((listData, index) => {
                    return (
                      <>
                        {!!listData && (
                          <li key={index}>{parse(listData.rtx)}</li>
                        )}
                      </>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        );
      })}
    </>
  );
}

export default NoteNuggetPrev;

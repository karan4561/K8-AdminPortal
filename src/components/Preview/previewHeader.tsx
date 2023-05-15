import React from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import NoteNugget from "./components/NoteNuggetPrev";
import { useContext, useState } from "react";
import Image from "next/image";
function PreviewHeader() {
  const { nugget } = useContext(NuggetsContext);
  return (
    <>
      <div className="preview">
        <h2>Preview</h2>
        <div className="headerimage-headertitle">
          {!!nugget?.headerTitle && (
            <Image src="/pencil.png" alt="" height={18.33} width={18.33} />
          )}
          <h4>{nugget?.headerTitle}</h4>
        </div>
        {nugget?.kind == "Note" && <NoteNugget />}
      </div>
    </>
  );
}

export default PreviewHeader;

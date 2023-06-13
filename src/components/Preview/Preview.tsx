import React, { useState } from "react";
import TrueFalsePrev from "./TrueFalsePrev";
import ImagePrev from "./ImagePrev";
import VideoPrev from "./VideoPrev";
import SCQPrev from "./SCQPrev";
import { NuggetsContext } from "../../context/NuggetsContext";
import { useContext,useEffect } from "react";
import { log } from "console";
import { Nugget } from "@/interfaces/INugget";

function Preview() {
  const { nugget } = useContext(NuggetsContext);
  const [color, setColor] =useState("");
  // let color
  useEffect(()=>{
    if(nugget.IsKnowledgeCap){
      setColor("#de0e100a")
    }
    else{
      setColor("#d9d7ec")
    }
  },[nugget.IsKnowledgeCap])
  return (
    <>
      <div className="preview" style={{backgroundColor: color}}>
        <div className="prev-sticky">
          <h2>Preview</h2>
          <div className="headerimage-headertitle">
            {(!!nugget?.headerIcon) && <img src={nugget.headerIcon.baseUrl+nugget.headerIcon.key} alt='' height={18.33} width={18.33}/>}
            <h4>{nugget?.headerTitle}</h4>
          </div>
          {/* {(test?.kind == 'IMG') && <ImagePrev />} */}
          {(nugget?.kind == 'Video') && <VideoPrev />}
          {nugget?.kind == "TRUEFALSE" && <TrueFalsePrev TFPrevData={nugget}/>}
          {nugget?.kind == "SCQ" && <SCQPrev nugget={nugget}/>}
          {nugget?.kind == "MCQ" && <SCQPrev nugget={nugget}/>}
          {/* {(test?.kind=='Note') && <NoteNugget/>} */}
        </div>
      </div>
    </>
  );
}

export default Preview;

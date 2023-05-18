import React, { useContext, useEffect, useRef } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import AddNuggetHeader from "../addNugget/AddNuggetHeader";
import NuggetInfo from "../NuggetInfo/NuggetInfo";
import XPTimer from "../XP&Timer/XP&Timer";

import TrueFalse from "../TrueFalseNugget/TrueFalseNugget";
import Preview from "../Preview/Preview";
import ImageNugget from "../ImageNugget/ImageNugget";
import VideoNugget from "../VideoNugget/VideoNugget";
import SccNugget from "../SccNugget/SccNugget";
import MCQNugget from "../MCQNugget/MCQNugget";
import LTI from "../LTI/LTI";

import NoteNugget from "../Nuggets/NoteNugget/NoteNugget";
import PreviewHeader from "../Preview/previewHeader";
import FIBNugget from "../Nuggets/FIB/FIBNugget";


interface OptionType {
  label:
    | "Video"
    | "SCQ"
    | "MCQ"
    | "Note"
    | "FIB"
    | "IMG"
    | "AUDIOCLIP"
    | "LTI"
    | "TrueFalse"
    | "Audio";
  value: string;
}

function NuggetsLanding() {
  const { nugget, nuggetKind, setNuggetKind } = useContext(NuggetsContext);

  const nuggetsRef = useRef("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNuggetKind(event.target.value as OptionType["value"]);
  };

  console.log(nugget);

  useEffect(() => {
    setNuggetKind(nuggetKind);
    console.log(nuggetKind);
  }, [nuggetKind]);

  const options: OptionType[] = [
    { value: "Video", label: "Video" },
    { value: "SCQ", label: "SCQ" },
    { value: "MCQ", label: "MCQ" },
    { value: "Note", label: "Note" },
    { value: "FIB", label: "FIB" },
    { value: "IMG", label: "IMG" },
    { value: "AUDIOCLIP", label: "AUDIOCLIP" },
    { value: "LTI", label: "LTI" },
    { value: "TrueFalse", label: "TrueFalse" },
    { value: "Audio", label: "Audio" },
  ];

  return (
    <div className="nugget">
      <div className="create-nugget">
        <button>Create Nugget</button>
        <div className="cards-parent">
          <AddNuggetHeader />
          <div className="card-header NuggetId">
            <h2 className="text-2xl">Nugget ID</h2>
            <div className="NuggetIdOption">
              {options.map((op) => (
                <label key={op.label} className="label-option">
                  <input
                    type="radio"
                    name="option"
                    value={op.value}
                    checked={nuggetKind === op.label}
                    onChange={handleOptionChange}
                  />
                  {op.label}
                </label>
              ))}
            </div>
          </div>
          <NuggetInfo />
          <XPTimer />

          {(nugget?.kind=="TrueFalse") && <TrueFalse/>}
          {(nugget?.kind=="IMG") && <ImageNugget/>}
          {(nugget?.kind=="Video") && <VideoNugget/>}
          {(nugget?.kind=="SCQ") && <SccNugget/>}
          {(nugget?.kind=="MCQ") && <MCQNugget/>}
          {(nugget?.kind=="LTI") && <LTI/>}

        </div>
      </div>
      <Preview/>

          {nuggetKind == "Note" && <NoteNugget />}
          {nuggetKind == "FIB" && <FIBNugget />}
        </div>
      </div>
      <PreviewHeader />

    </div>
  );
}

export default NuggetsLanding;
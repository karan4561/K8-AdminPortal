import React, { useContext, useEffect, useRef } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import AddNuggetHeader from "../addNugget/AddNuggetHeader";
import NuggetInfo from "../NuggetInfo/NuggetInfo";
import XPTimer from "../XP&Timer/XP&Timer";

import TrueFalse from "../Nuggets/TrueFalseNugget/TrueFalseNugget";
import Preview from "../Preview/Preview";
import ImageNugget from "../Nuggets/ImageNugget/ImageNugget";
import VideoNugget from "../VideoNugget/VideoNugget";
import SccNugget from "../Nuggets/SccNugget/SccNugget";
import MCQNugget from "../Nuggets/MCQNugget/MCQNugget";
import LTI from "../LTI/LTI";

import NoteNugget from "../Nuggets/NoteNugget/NoteNugget";
import PreviewHeader from "../Preview/previewHeader";
import FIBNugget from "../Nuggets/FIB/FIBNugget";
import { get, post } from "@/api/api";

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
  const { updateNuggetKind, test } = useContext(NuggetsContext);

  const nuggetsRef = useRef("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateNuggetKind(event.target.value as OptionType["value"]);
  };
  
  useEffect(() => {
    if (test.kind) updateNuggetKind(test.kind);
  }, [test.kind]);

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
                    checked={test.kind === op.label}
                    onChange={handleOptionChange}
                  />
                  {op.label}
                </label>
              ))}
            </div>
          </div>
          <NuggetInfo />
          <XPTimer />
          {test.kind == "Note" && <NoteNugget />}
          {test.kind == "FIB" && <FIBNugget />}
          {test.kind == "TrueFalse" && <TrueFalse />}
          {test.kind == "IMG" && <ImageNugget />}
          {test.kind == "Video" && <VideoNugget />}
          {test.kind == "SCQ" && <SccNugget />}
          {test.kind == "MCQ" && <MCQNugget />}
          {test.kind == "LTI" && <LTI />}
        </div>
      </div>
      <Preview />
      
    </div>
  );
}

export default NuggetsLanding;

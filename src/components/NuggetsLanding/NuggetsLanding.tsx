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
import { Nugget } from "@/interfaces/INugget";
import { submitNugget } from "@/api/utils";

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

//NOTE => OL , xyz , OL

function NuggetsLanding() {
  const {
    updateNuggetKind,
    nugget: nugget,
    submit,
    setSubmit,
    formErrors,
    setFormErrors,
    validateErrors,
  } = useContext(NuggetsContext);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateNuggetKind(event.target.value as OptionType["value"]);
  };

  useEffect(() => {
    if (nugget.kind) updateNuggetKind(nugget.kind);
  }, [nugget.kind]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmit(true);
    if (validateErrors) setFormErrors(validateErrors(nugget));

    console.log("The Errors in the form : ", formErrors);

    console.log("Submit Value: ", submit);

    if (Object && Object.keys(formErrors || {}).length === 0 && submit) {
      //console.log("Form is Submitted Successfully");
      submitNugget(nugget);
    }
  };

  //defne error type
  //add error object to nugget (INugget)

  return (
    <div className="nugget">
      <div className="create-nugget">
        <button onClick={handleSubmit}>Create Nugget</button>
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
                    checked={nugget.kind === op.label}
                    onChange={handleOptionChange}
                  />
                  {op.label}
                </label>
              ))}
            </div>
          </div>
          <NuggetInfo />
          <XPTimer />
          {nugget.kind == "Note" && <NoteNugget />}
          {nugget.kind == "FIB" && <FIBNugget />}
          {nugget.kind == "TrueFalse" && <TrueFalse />}
          {nugget.kind == "IMG" && <ImageNugget />}
          {nugget.kind == "Video" && <VideoNugget />}
          {nugget.kind == "SCQ" && <SccNugget />}
          {nugget.kind == "MCQ" && <MCQNugget />}
          {nugget.kind == "LTI" && <LTI />}
        </div>
      </div>
      {/* <Preview /> */}
    </div>
  );
}

export default NuggetsLanding;

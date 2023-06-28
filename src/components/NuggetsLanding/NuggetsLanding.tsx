import React, { useContext, useEffect, useState } from "react";
import { NuggetsContext } from "../../context/NuggetsContext";
import AddNuggetHeader from "../addNugget/AddNuggetHeader";
import NuggetInfo from "../NuggetInfo/NuggetInfo";
import XPTimer from "../XP&Timer/XP&Timer";
import toast, { Toaster } from "react-hot-toast";
import TrueFalse from "../Nuggets/TrueFalseNugget/TrueFalseNugget";
import Preview from "../Preview/Preview";
import ImageNugget from "../Nuggets/ImageNugget/ImageNugget";
import VideoNugget from "../VideoNugget/VideoNugget";
import SccNugget from "../Nuggets/SccNugget/SccNugget";
import MCQNugget from "../Nuggets/MCQNugget/MCQNugget";
import LTI from "../Nuggets/LTI/LTI";
import NoteNugget from "../Nuggets/NoteNugget/NoteNugget";
import FIBNugget from "../Nuggets/FIB/FIBNugget";
import AudioNugget from "../Nuggets/AudioNugget/AudioNugget";
import { submitNugget, updateNugget, getHeaderIcons } from "@/api/utils";

interface OptionType {
  label:
    | "Video"
    | "SCQ"
    | "MCQ"
    | "NOTE"
    | "FIB"
    | "IMAGE"
    | "AUDIOCLIP"
    | "LTI"
    | "TRUEFALSE";
  value: string;
}

function NuggetsLanding({ nuggetId }: any) {
  const {
    updateNuggetKind,
    nugget,
    validateErrors,
    fetchNuggetContent,
    updateFileObj,
    setNuggetId,
  } = useContext(NuggetsContext);

  const options: OptionType[] = [
    { value: "Video", label: "Video" },
    { value: "SCQ", label: "SCQ" },
    { value: "MCQ", label: "MCQ" },
    { value: "NOTE", label: "NOTE" },
    { value: "FIB", label: "FIB" },
    { value: "IMAGE", label: "IMAGE" },
    { value: "AUDIOCLIP", label: "AUDIOCLIP" },
    { value: "LTI", label: "LTI" },
    { value: "TRUEFALSE", label: "TRUEFALSE" },
  ];

  useEffect(() => {
    fetchNuggetContent(nuggetId);
    if (setNuggetId) setNuggetId(nuggetId);
  }, []);

  useEffect(() => {
    getHeaderIcons().then((data) => updateFileObj(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateErrors) {
      if (Object && Object.keys(validateErrors(nugget) || {}).length === 0) {
        try {
          if (!nuggetId) {
            await submitNugget(nugget);
            toast.success("Form is Submitted Successfully");
          } else {
            await updateNugget(nugget, nuggetId);
            toast.success("Form is Updated Successfully");
          }
        } catch (e: any) {
          if (e.response.status == 401) {
            toast.error("Unauthorized Entry");
            //alert("Unauthorized Entry");
          } else if (e.response.status == 403) {
            toast.error("Scope Error");
            //alert("Scope Error");
          } else if (e.response.status == 500) {
            toast.error(e.response.message);
            //alert("Server Error Entry");
          } else if (e.response.status == 400) {
            toast.error(e.response?.data?.error?.message);
            console.log(e.response?.data?.error?.message);
          }
        }
      } else {
        //alert("Add Required Fields");
        toast.error("Add Required Fields");
      }
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="nugget">
        <div className="create-nugget">
          {!nuggetId && <button onClick={handleSubmit}>Create Nugget</button>}
          {nuggetId && <button onClick={handleSubmit}>Update Nugget</button>}
          <div className="cards-parent">
            <AddNuggetHeader nuggetId={nuggetId} />
            <div
              className="card-header NuggetId"
              style={nuggetId ? { pointerEvents: "none", opacity: 0.5 } : {}}
            >
              <h2 className="text-2xl">Nugget ID</h2>
              <div className="NuggetIdOption">
                {options.map((op) => (
                  <label key={op.label} className="label-option">
                    <input
                      type="radio"
                      name="option"
                      value={op.value}
                      checked={nugget.kind === op.label}
                      onChange={() => {
                        updateNuggetKind(op.value);
                      }}
                    />
                    {op.label}
                  </label>
                ))}
              </div>
            </div>
            <NuggetInfo />
            <XPTimer />
            {nugget.kind == "NOTE" && <NoteNugget />}
            {nugget.kind == "AUDIOCLIP" && <AudioNugget />}
            {nugget.kind == "FIB" && <FIBNugget />}
            {nugget.kind == "TRUEFALSE" && <TrueFalse />}
            {nugget.kind == "IMAGE" && <ImageNugget />}
            {nugget.kind == "Video" && <VideoNugget />}
            {nugget.kind == "SCQ" && <SccNugget />}
            {nugget.kind == "MCQ" && <MCQNugget />}
            {nugget.kind == "LTI" && <LTI />}
          </div>
        </div>
        <Preview />
      </div>
    </>
  );
}

export default NuggetsLanding;

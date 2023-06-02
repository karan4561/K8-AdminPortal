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
import LTI from "../LTI/LTI";
import NoteNugget from "../Nuggets/NoteNugget/NoteNugget";
import FIBNugget from "../Nuggets/FIB/FIBNugget";
import { fetchNugget, submitNugget } from "@/api/utils";
import { log } from "console";

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
    | "TRUEFALSE"
    | "Audio";
  value: string;
}

function NuggetsLanding({ nuggetId }: any) {
  console.log("****Nuggets Landing*****", nuggetId);
  const {
    updateNuggetKind,
    nugget: nugget,
    setNugget,
    validateErrors,
  } = useContext(NuggetsContext);
  const [isVisible, setIsVisible] = useState(true);

  const options: OptionType[] = [
    { value: "Video", label: "Video" },
    { value: "SCQ", label: "SCQ" },
    { value: "MCQ", label: "MCQ" },
    { value: "Note", label: "Note" },
    { value: "FIB", label: "FIB" },
    { value: "IMG", label: "IMG" },
    { value: "AUDIOCLIP", label: "AUDIOCLIP" },
    { value: "LTI", label: "LTI" },
    { value: "TRUEFALSE", label: "TRUEFALSE" },
    { value: "Audio", label: "Audio" },
  ];
  function fetchNuggetContent() {
    console.log("***Nugget Info Dynamic - 1 ******", nugget);
    if (!nuggetId) return;
    else {
      fetchNugget([nuggetId]).then((data) => {
        console.log("***Nugget in FetchContent", data);
        setNugget(data[0]);
      });
    }
    console.log("***Nugget Info Dynamic - 2 *******", nugget);
  }

  useEffect(() => {
    fetchNuggetContent();
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateErrors) {
      if (Object && Object.keys(validateErrors(nugget) || {}).length === 0) {
        console.log("Form is Submitted Successfully");
        toast.success("Form is Submitted Successfully");
        try {
          await submitNugget(nugget);
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
        <Preview />
      </div>
    </>
  );
}

export default NuggetsLanding;

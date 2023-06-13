import React, { useState, useContext, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import TextEditor from "../../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "@/context/NuggetsContext";
import TextInput from "../utils/TextInput";

interface OptionType {
  value: "TEXT" | "BLANK";
  label: "TEXT" | "BLANK";
}

function FIBSection(props: any) {
  const { nugget, updateFIBContent } = useContext(NuggetsContext);
  const options: OptionType[] = [
    { value: "TEXT", label: "TEXT" },
    { value: "BLANK", label: "BLANK" },
  ];

  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);
  const [fibContent, setFibContent] = useState<string>("");

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOption(selectedOption as OptionType);
  };

  const updateSolHint = (content: string) => {
    setFibContent(content);
  };

  useEffect(()=>{
    updateFIBContent({
      index:props.id,
      text: fibContent,
      type: selectedOption.value
    })
  },[fibContent,selectedOption.value,props.id])

  return (
    <>
      <div className="fib-card-header">
        <div className="fib-option-editor">
          <Select
            className="AddNuggetCategory "
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder="TEXT"
          />
          <TextEditor  idx={props.id} value={nugget.question.fib.english[props.id].value} onUpdate={updateSolHint}  fibOption={"fibOption"}/>
        </div>
      </div>
    </>
  );
}

export default FIBSection;

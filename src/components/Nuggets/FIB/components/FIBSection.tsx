import React, { useState, useContext, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import TextEditor from "../../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "@/context/NuggetsContext";

interface OptionType {
  value: "text" | "blank";
  label: "TEXT" | "BLANK";
}

function FIBSection(props: any) {
  const { nugget, updateFIBContentText, updateFIBContentType } =
    useContext(NuggetsContext);
  const options: OptionType[] = [
    { value: "text", label: "TEXT" },
    { value: "blank", label: "BLANK" },
  ];

  useEffect(() => {
    handleChange(options[0]);
  }, []);

  let selectedOption: OptionType = options[0];
  if (nugget.question.fib.english[props.id].type == "blank") {
    selectedOption = options[1];
  } else if (nugget.question.fib.english[props.id].type == "text") {
    selectedOption = options[0];
  }

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (updateFIBContentType && selectedOption)
      updateFIBContentType({
        index: props.id,
        type: selectedOption.value,
      });
  };

  const updateText = (content: string) => {
    if (updateFIBContentText)
      updateFIBContentText({
        index: props.id,
        text: content,
      });
  };

  const blankFIBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (updateFIBContentText)
      updateFIBContentText({
        index: props.id,
        text: event.target.value,
      });
  };
  return (
    <>
      <div className="fib-card-header">
        <div className="fib-option-editor">
          <Select
            className="AddNuggetCategory "
            onChange={handleChange}
            options={options}
            placeholder="Select"
            value={selectedOption}
          />
          {selectedOption == options[0] ? (
            <TextEditor
              idx={props.id}
              value={nugget.question.fib.english[props.id].value}
              onUpdate={(content: string) => updateText(content)}
              fibOption={"fibOption"}
            />
          ) : (
            <input
              id={props.id}
              className="image-type-input"
              value={nugget.question.fib.english[props.id].value}
              onChange={blankFIBChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FIBSection;

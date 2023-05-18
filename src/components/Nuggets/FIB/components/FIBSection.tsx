import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

import TextInput from "../utils/TextInput";

interface OptionType {
  value: "TEXT" | "BLANK";
  label: "TEXT" | "BLANK";
}

function FIBSection(props: any) {
  const options: OptionType[] = [
    { value: "TEXT", label: "TEXT" },
    { value: "BLANK", label: "BLANK" },
  ];
  console.log("this is props.id: ", props.id);

  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOption(selectedOption as OptionType);
  };

  return (
    <>
      <div className="card-header add-section">
        <div className="textEditor-addButton">
          <Select
            className="AddNuggetCategory "
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder="TEXT"
          />
          <TextInput kind={selectedOption.value} idx={props.id} />
        </div>
      </div>
    </>
  );
}

export default FIBSection;

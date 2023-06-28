import Select, { SingleValue } from "react-select";
import { useEffect, useState, useContext } from "react";
import H1 from "../utils/H1/H1Header";
import OL from "../utils/OL/OL";
import ImageType from "../utils/Image-kind/ImageHeader";
import IconDropdown from "@/utils/IconDropdown/IconDropdown";
import Text from "../utils/AddInputTextEditor";
import TextEditor from "../utils/Tinymce";
import TextEditor2 from "../../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "@/context/NuggetsContext";
import BulletColor from "../utils/OL/BulletColor";
import { textChangeRangeIsUnchanged } from "typescript";
interface OptionType {
  value: "H1" | "H2" | "P" | "UL" | "OL" | "IMG";
  label: "H1" | "H2" | "Text" | "UL" | "OL" | "Image";
}
interface Props {
  idx: number;
}

export default function (props: Props) {
  const { nugget, updateContentItem, updateListItem, updateNoteKind } =
    useContext(NuggetsContext);
  const options: OptionType[] = [
    { value: "H1", label: "H1" },
    { value: "H2", label: "H2" },
    { value: "P", label: "Text" },
    { value: "OL", label: "OL" },
    { value: "IMG", label: "Image" },
    { value: "UL", label: "UL" },
  ];
  //const [selectedValue, setSelectedValue] = useState<OptionType>(options[0]);

  let selectedOption: OptionType = options[0];
  if (nugget.content[props.idx].kind == "H1") {
    selectedOption = options[0];
  } else if (nugget.content[props.idx].kind == "H2") {
    selectedOption = options[1];
  } else if (nugget.content[props.idx].kind == "P") {
    selectedOption = options[2];
  } else if (nugget.content[props.idx].kind == "OL") {
    selectedOption = options[3];
  } else if (nugget.content[props.idx].kind == "IMG") {
    selectedOption = options[4];
  } else if (nugget.content[props.idx].kind == "UL") {
    selectedOption = options[5];
  }

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    //setSelectedValue(selectedOption as OptionType);
    if (updateNoteKind && selectedOption)
      updateNoteKind(props.idx, selectedOption?.value);
  };

  const onUpdateSol = (content: string) => {
    if (updateContentItem) {
      console.log("********HERE********", selectedOption.value);
      updateContentItem(props.idx, content);
    }
  };

  return (
    <>
      <div className="card-header add-section">
        <div className="HeadingOption-IconOption">
          <Select
            className="AddNuggetCategory"
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder="Select"
          />
          {(selectedOption?.value == "IMG" ||
            selectedOption?.value == "H1" ||
            selectedOption?.value == "UL" ||
            selectedOption?.value == "H2") && <IconDropdown value="Content" ContentID={props.idx} />}
          {(selectedOption?.value == "H1" ||
            selectedOption?.value == "H2" ||
            selectedOption?.value == "P") && (
            <TextEditor2
              NOTE={selectedOption.value} // to be changed
              value={nugget.content[props.idx]?.list?.[0]?.rtx}
              onUpdate={onUpdateSol}
            />
          )}
          {selectedOption?.value == "OL" && <OL idx={props.idx} />}
          {(selectedOption?.value == "OL" || selectedOption?.value == "UL") && (
            <Text kind={selectedOption.value} idx={props.idx} />
          )}
        </div>
        {selectedOption?.value == "IMG" && <ImageType idx={props.idx} />}
        {selectedOption?.value == "OL" && <BulletColor idx={props.idx} />}
      </div>
    </>
  );
}

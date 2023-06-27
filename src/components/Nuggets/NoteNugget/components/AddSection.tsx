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
  const { nugget, updateContentItem, updateListItem } =
    useContext(NuggetsContext);
  const options: OptionType[] = [
    { value: "H1", label: "H1" },
    { value: "H2", label: "H2" },
    { value: "P", label: "Text" },
    { value: "OL", label: "OL" },
    { value: "IMG", label: "Image" },
    { value: "UL", label: "UL" },
  ];
  const [selectedValue, setSelectedValue] = useState<OptionType>(options[0]);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedValue(selectedOption as OptionType);
  };

  const onUpdateSol = (content: string) => {
    if (updateContentItem) {
      updateContentItem(props.idx, selectedValue.value, content);
    }
  };

  //console.log("........addsectios-id......", props.id);
  return (
    <>
      <div className="card-header add-section">
        <div className="HeadingOption-IconOption">
          <Select
            className="AddNuggetCategory"
            value={selectedValue}
            onChange={handleChange}
            options={options}
            placeholder="H1"
          />
          {(selectedValue?.value == "IMG" ||
            selectedValue?.value == "H1" ||
            selectedValue?.value == "UL" ||
            selectedValue?.value == "H2") && <IconDropdown value="Content" ContentID={props.idx} />}
          {(selectedValue?.value == "H1" ||
            selectedValue?.value == "H2" ||
            selectedValue?.value == "P") && (
            <TextEditor2
              NOTE={selectedValue.value} // to be changed
              value={nugget.content[props.idx]?.list?.[0]?.rtx}
              onUpdate={onUpdateSol}
            />
          )}
          {selectedValue?.value == "OL" && <OL idx={props.idx} />}
          {(selectedValue?.value == "OL" || selectedValue?.value == "UL") && (
            <Text kind={selectedValue.value} idx={props.idx} />
          )}
        </div>
        {selectedValue?.value == "IMG" && <ImageType idx={props.idx} />}
        {selectedValue?.value == "OL" && <BulletColor idx={props.idx} />}
      </div>
    </>
  );
}

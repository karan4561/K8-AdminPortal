import Select, { SingleValue } from "react-select";
import { useEffect, useState, useContext } from "react";
import H1 from "../utils/H1/H1Header";
import OL from "../utils/OL/OL";
import ImageType from "../utils/Image-kind/ImageHeader";
import Icon from "../utils/Icon_type";
import Text from "../utils/AddInputTextEditor";
import TextEditor from "../utils/Tinymce";
import BulletColor from "../utils/OL/BulletColor";
import { NuggetsContext } from "../../../context/NuggetsContext";
interface OptionType {
  value: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  label: string;
}
export default function () {
  const { updateContentKind } = useContext(NuggetsContext);
  // console.log(nugget);
  const options: OptionType[] = [
    { value: "H1", label: "H1" },
    { value: "H2", label: "H2" },
    { value: "Text", label: "Text" },
    { value: "OL", label: "OL" },
    { value: "IMG", label: "Image" },
    { value: "UL", label: "UL" },
  ];
  const [selectedValue, setSelectedValue] = useState<OptionType>(options[0]);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedValue(selectedOption as OptionType);
  };
  useEffect(() => {
    updateContentKind?.({
      kind: selectedValue.value,
    });
  }, [selectedValue]);
  // console.log(selectedValue.value,"hii");

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
            selectedValue?.value == "H2") && <Icon />}
          {(selectedValue?.value == "H1" ||
            selectedValue?.value == "H2" ||
            selectedValue?.value == "Text") && (
            <TextEditor kind={selectedValue.value} />
          )}

          {selectedValue?.value == "OL" && <OL />}
          {(selectedValue?.value == "OL" || selectedValue?.value == "UL") && (
            <Text />
          )}
          {/* {(selectedValue?.value=="Text") && <Text/>} */}
        </div>
        {selectedValue?.value == "IMG" && <ImageType />}
        {selectedValue?.value == "OL" && <BulletColor />}
      </div>
    </>
  );
}

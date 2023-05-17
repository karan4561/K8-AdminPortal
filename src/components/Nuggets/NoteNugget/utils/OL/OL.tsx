import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { NuggetsContext } from "../../../../../context/NuggetsContext";
interface OptionType {
  value: string;
  label: string;
}
export default function () {
  const { bullet, setBullet } = useContext(NuggetsContext);
  const [prefixValue, setPrefixValue] = useState("");
  const [suffixValue, setSuffixValue] = useState("");

  const prefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrefixValue(event.target.value);
    console.log("Prefix VALUE:", prefixValue);
  };
  const suffixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuffixValue(event.target.value);
    console.log("Suffix Value", suffixValue);
  };
  const optionsXP = [
    { label: "1", value: "1" },
    { label: "i", value: "i" },
    { label: "a", value: "a" },
    { label: "I", value: "I" },
  ];
  const [OLType, setOLType] = useState<OptionType>(optionsXP[0]);
  const handleChangeXP = (selectedOption: OptionType) => {
    setOLType(selectedOption);
  };
  useEffect(() => {
    if (setBullet) {
      setBullet({
        value: OLType.value,
        prefix: prefixValue,
        suffix: suffixValue,
      });
    }
    console.log("The Value of Bullet is here:", bullet);
  }, [OLType.value, prefixValue, suffixValue]);

  return (
    <>
      <input
        className="input-suffix-prefix"
        type="text"
        value={prefixValue}
        onChange={prefixChange}
        placeholder="Prefix"
      />
      <Select
        className="drop-down-bar"
        value={OLType}
        onChange={handleChangeXP}
        options={optionsXP}
      />
      <input
        className="input-suffix-prefix"
        type="text"
        value={suffixValue}
        onChange={suffixChange}
        placeholder="suffix"
      />
    </>
  );
}

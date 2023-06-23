import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { NuggetsContext } from "../../../../../context/NuggetsContext";
interface OptionType {
  value: string;
  label: string;
}

interface Props {
  idx: number;
}
export default function (props: Props) {
  const { bullet, setBullet } = useContext(NuggetsContext);
  const [prefixValue, setPrefixValue] = useState("");
  const [suffixValue, setSuffixValue] = useState("");

  const prefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrefixValue(event.target.value);
  };
  const suffixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuffixValue(event.target.value);
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
    if (bullet && setBullet) {
      const obj = [...bullet];
      obj[props.idx] = {
        ...obj[props.idx],
        value: OLType.value,
        prefix: prefixValue,
        suffix: suffixValue,
      };
      setBullet(obj);
    }
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

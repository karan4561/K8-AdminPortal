import { useState, useContext, useEffect } from "react";
import { NuggetsContext } from "../../../../../context/NuggetsContext";

interface Props {
  idx: number;
}

export default function BulletColor(props: Props) {
  const { bullet, setBullet } = useContext(NuggetsContext);

  const [selectedColor, setSelectedColor] = useState("#000000");

  function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedColor(event.target.value);
  }
  useEffect(() => {
    if (setBullet && bullet) {
      const obj = [...bullet];
      obj[props.idx] = {
        ...obj[props.idx],
        color: selectedColor,
      };
      setBullet(obj);
    }
  }, [selectedColor]);

  return (
    <>
      <div className="bullet-color">
        <label htmlFor="color-picker">Bullet Color:</label>
        <input
          type="color"
          id="color-picker"
          value={selectedColor}
          onChange={handleColorChange}
        />
      </div>
    </>
  );
}

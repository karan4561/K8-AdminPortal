import { useState, useContext, useEffect } from "react";
import { NuggetsContext } from "../../../../../context/NuggetsContext";
export default function BulletColor() {
  const { setBullet } = useContext(NuggetsContext);

  const [selectedColor, setSelectedColor] = useState("#000000");

  function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedColor(event.target.value);
  }
  // console.log(selectedColor,"color");
  useEffect(() => {
    if (setBullet) {
      setBullet({ color: selectedColor });
    }
  }, [selectedColor]);
  // console.log(nugget);

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

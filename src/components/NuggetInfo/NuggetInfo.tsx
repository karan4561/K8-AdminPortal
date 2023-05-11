import { NuggetsContext } from "../../context/NuggetsContext";
import Icon from "../../utils/IconType/IconType";
import { useContext, useState, useEffect } from "react";

export default function NuggetInfo() {
  const { updateNuggetInfo } = useContext(NuggetsContext);
  const [headerTitle, setheaderTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [sideNote, setsideNote] = useState("");
  const headerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheaderTitle(event.target.value);
  };

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  const sideNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsideNote(event.target.value);
  };
  useEffect(() => {
    updateNuggetInfo({
      headerTitle: headerTitle,
      sideNote: sideNote,
      isKnowledgeCap: isChecked,
    });
  }, [headerTitle, sideNote, isChecked]);

  return (
    <>
      <div className="card-header NuggetId">
        <h2>Nugget Info</h2>
        <h4>Header</h4>
        <div className="NuggetInfo-iconHeadertitle Info">
          <Icon />
          <input
            className="image-type-input"
            type="text"
            value={headerTitle}
            onChange={headerTitleChange}
            placeholder="Header Title"
          />
        </div>
        <label htmlFor="checkbox">Is knowledge cap</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="NuggetInfo-iconHeadertitle sideNote">
          <p>Side</p>
          <input
            className="image-type-input"
            type="text"
            value={sideNote}
            onChange={sideNoteChange}
            placeholder="Side Note"
          />
        </div>
      </div>
    </>
  );
}

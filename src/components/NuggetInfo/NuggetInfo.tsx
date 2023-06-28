import { NuggetsContext } from "../../context/NuggetsContext";
import IconDropdown from "../../utils/IconDropdown/IconDropdown";
import { useContext, useState, useEffect } from "react";

export default function NuggetInfo() {
  const {
    updateNuggetInfoHeader,
    updateNuggetInfoSideNote,
    updateNuggetInfoKnowledgeCap,
    nugget,
  } = useContext(NuggetsContext);
  // const [headerTitle, setheaderTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [sideNote, setsideNote] = useState("");

  const headerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setheaderTitle(event.target.value);
    updateNuggetInfoHeader(event.target.value);
  };

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    updateNuggetInfoKnowledgeCap(!isChecked);
  }

  const sideNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsideNote(event.target.value);
    updateNuggetInfoSideNote(event.target.value);
  };

  return (
    <>
      <div className="card-header NuggetId">
        <h2>Nugget Info</h2>
        <h4>Header</h4>
        <div className="NuggetInfo-iconHeadertitle Info">
          <IconDropdown value="nuggetInfo"/>
          <input
            className="image-type-input"
            type="text"
            value={nugget?.headerTitle}
            onChange={headerTitleChange}
            placeholder="Header Title"
          />
        </div>
        <label htmlFor="checkbox">Is knowledge cap</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={nugget?.IsKnowledgeCap}
          onChange={handleCheckboxChange}
        />
        <div className="NuggetInfo-iconHeadertitle sideNote">
          <p>Side</p>
          <input
            className="image-type-input"
            type="text"
            value={nugget?.sideNote}
            onChange={sideNoteChange}
            placeholder="Side Note"
          />
        </div>
      </div>
    </>
  );
}

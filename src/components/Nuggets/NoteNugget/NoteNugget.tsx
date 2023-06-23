import AddSection from "./components/AddSection";
import { useContext } from "react";
import { NuggetsContext } from "@/context/NuggetsContext";
import { ContentObject } from "@/interfaces/INugget";

function NoteNugget() {
  const { nugget, addContentItem, handleDeleteNoteContent } =
    useContext(NuggetsContext);

  const initialContentObject = { kind: "H1", list: [] } as ContentObject;

  function addSection2() {
    if (addContentItem) addContentItem(initialContentObject);
  }
  const sectionElements = nugget.content?.map((section, idx) => {
    return (
      <section key={idx}>
        <AddSection idx={idx} />
        {handleDeleteNoteContent && (
          <button onClick={() => handleDeleteNoteContent(idx)}>Delete</button>
        )}
      </section>
    );
  });

  return (
    <>
      <div>{sectionElements}</div>
      <button className="add-section-button" onClick={addSection2}>
        Add Section
      </button>
    </>
  );
}

export default NoteNugget;

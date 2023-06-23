import TinyMCE from "./Tinymce";
import { useContext } from "react";
import { NuggetsContext } from "../../../../context/NuggetsContext";

interface SectionProps {
  idi: number;
  idj: number;
  //onDelete: (id: number) => void;
  // kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  // };
}

function Section(props: SectionProps) {
  const { handleDeleteNoteContentList } = useContext(NuggetsContext);
  function handleDelete() {
    if (handleDeleteNoteContentList) {
      handleDeleteNoteContentList(props.idi, props.idj);
    }
  }
  return (
    <>
      <div>
        <TinyMCE kind={props.kind} idx={props.idi} idj={props.idj} />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

function SectionList(props: {
  // kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  // };
  idx: number;
}) {
  const { nugget, addListItem, handleDeleteNoteContentList } =
    useContext(NuggetsContext);

  function addSection() {
    if (addListItem) {
      addListItem(props.idx, { rtx: "" });
    }
  }
  const sectionElements = nugget.content[props.idx].list.map((section, idj) => {
    return <Section key={idj} idj={idj} idi={props.idx} kind={props.kind} />;
  });

  return (
    <>
      <div className="textEditor-addButton">
        {sectionElements}
        <button className="subcard-addSection" onClick={addSection}>
          Add Section
        </button>
      </div>
    </>
  );
}

export default SectionList;

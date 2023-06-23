import TinyMCE from "./Tinymce";
import TextEditor from "@/components/Nuggets/TrueFalseNugget/TextEditor";
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
  const { nugget, addListItem, handleDeleteNoteContentList,updateContentItem, updateListItem, bullet } =
    useContext(NuggetsContext);

  function addSection() {
    if (addListItem) {
      addListItem(props.idx, { rtx: "" });
    }
  }

  function updateAnswerOption(content: string,idj:number) {
    updateListItem(props.idx, content, props.kind, idj);
  }

  function handleDelete(index:number) {
    if (handleDeleteNoteContentList) {
      handleDeleteNoteContentList(props.idx, index);
    }
  }

  const sectionElements = nugget.content[props.idx].list.map((section, idj) => {
    // return <Section key={idj} idj={idj} idi={props.idx} kind={props.kind} />;
    return (
      <>
        <div>
          <TextEditor
            value={section.rtx}
            onUpdate={(content: string) => updateAnswerOption(content,idj)}
            List={"LIST"}
          />
          <button onClick={() => handleDelete(idj)}>Delete</button>
        </div>
      </>
    );
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

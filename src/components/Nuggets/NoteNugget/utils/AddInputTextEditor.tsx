import TinyMCE from "./Tinymce";
import TextEditor from "@/components/Nuggets/TrueFalseNugget/TextEditor";
import { useContext, useEffect, useState } from "react";
import { NuggetsContext } from "../../../../context/NuggetsContext";

interface SectionProps {
  idi: number;
  idj: number;
  //onDelete: (id: number) => void;
  // kind: {
  kind: "H1" | "H2" | "P" | "UL" | "OL" | "IMG";
  // };
}

// function Section(props: SectionProps) {
//   const { handleDeleteNoteContentList } = useContext(NuggetsContext);
//   function handleDelete() {
//     if (handleDeleteNoteContentList) {
//       handleDeleteNoteContentList(props.idi, props.idj);
//     }
//   }
//   return (
//     <>
//       <div>
//         <TinyMCE kind={props.kind} idx={props.idi} idj={props.idj} />
//         <button onClick={handleDelete}>Delete</button>
//       </div>
//     </>
//   );
// }

function SectionList(props: {
  // kind: {
  kind: "H1" | "H2" | "P" | "UL" | "OL" | "IMG";
  // };
  idx: number;
}) {
  const [content, setContent] = useState("");

  const {
    nugget,
    addListItem,
    handleDeleteNoteContentList,
    updateListItem,
    updateListBullet,
    bullet,
  } = useContext(NuggetsContext);

  useEffect(() => {
    if (updateListBullet && bullet) {
      updateListBullet(props.idx, bullet[props.idx]);
    }
  }, [bullet]);

  function addSection() {
    if (addListItem) {
      addListItem(props.idx, { rtx: "" });
    }
  }

  function updateAnswerOption(content: string, idj: number) {
    setContent(content);
    if (updateListItem) updateListItem(props.idx, content, props.kind, idj);
  }

  function handleDelete(index: number) {
    if (handleDeleteNoteContentList) {
      handleDeleteNoteContentList(props.idx, index);
    }
  }

  const sectionElements = nugget.content[props.idx].list?.map(
    (section, idj) => {
      // return <Section key={idj} idj={idj} idi={props.idx} kind={props.kind} />;
      return (
        <>
          <div>
            <TextEditor
              value={section.rtx}
              onUpdate={(content: string) => updateAnswerOption(content, idj)}
              List={"LIST"}
            />
            <button onClick={() => handleDelete(idj)}>Delete</button>
          </div>
        </>
      );
    }
  );

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

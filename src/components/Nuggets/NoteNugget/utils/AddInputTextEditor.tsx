import TinyMCE from "./Tinymce";
import { useState, useContext, useEffect } from "react";
import { NuggetsContext } from "../../../../context/NuggetsContext";
// import { useState } from 'react';
interface SectionProps {
  idi: number;
  idj: number;
  onDelete: (id: number) => void;
  kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  };
}

function Section(props: SectionProps) {
  function handleDelete() {
    props.onDelete(props.idj);
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
  kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  };
  idx: number;
}) {
  const { list, setList, addListItem } = useContext(NuggetsContext);

  function addSection() {
    addListItem("");
  }

  function handleDelete(idx: number) {
    console.log("This is OL list before deleteing", list);

    if (list) {
      list.splice(idx, 1);
      setList(list);
    }
  }

  console.log("ths is list", list);
  const sectionElements = list?.map((section, idj) => {
    return (
      <Section
        key={idj}
        idj={idj}
        idi={props.idx}
        kind={props.kind}
        onDelete={handleDelete}
      />
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

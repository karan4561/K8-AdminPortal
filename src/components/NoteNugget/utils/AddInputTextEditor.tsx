import TinyMCE from "./Tinymce";
import { useState, useContext } from "react";
import { NuggetsContext } from "../../../context/NuggetsContext";
// import { useState } from 'react';
interface SectionProps {
  id: number;
  onDelete: (id: number) => void;
}
function Section(props: SectionProps) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <>
      <div>
        <TinyMCE />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

function SectionList() {
  const [sectionCount, setSectionCount] = useState(1);
  const [sections, setSections] = useState([{ id: 0 }]);

  function addSection() {
    const newSectionCount = sectionCount + 1;
    const newSections = [...sections, { id: newSectionCount - 1 }];
    setSectionCount(newSectionCount);
    setSections(newSections);
  }

  function handleDelete(id) {
    const newSections = sections.filter((section) => {
      // console.log(id,section.id !== id);
      return section.id !== id;
    });
    const newSectionCount = newSections.length;
    setSectionCount(newSectionCount);
    setSections(newSections);
  }

  // console.log(sections);

  const sectionElements = sections.map((section) => {
    return <Section key={section.id} id={section.id} onDelete={handleDelete} />;
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

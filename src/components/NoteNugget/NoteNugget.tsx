import AddSection from "./components/AddSection";
import { useState, useContext, useEffect } from "react";
import uuid from "react-uuid";

function NoteNugget() {
  const [sectionCount, setSectionCount] = useState(1);
  const [sections, setSections] = useState([{ id: uuid() }]);

  useEffect(() => {
    setSectionCount(sectionCount);
    setSections(sections);
    console.log("After add sectionCount", sectionCount);
    console.log("After add section", sections);
  }, [sectionCount, sections]);

  function addSection() {
    const newSectionCount = sectionCount + 1;
    const newSections = [...sections, { id: uuid() }];
    setSectionCount(newSectionCount);
    setSections(newSections);
  }

  function handleDelete(id: any) {
    const sectionCopy = [...sections];
    console.log(id);
    setSections(sectionCopy.filter((section) => section.id !== id));
  }
  const sectionElements = sections.map((section) => {
    return (
      <section key={section.id}>
        <AddSection />
        <button onClick={() => handleDelete(section.id)}>Delete</button>
      </section>
    );
  });

  return (
    <>
      <div>{sectionElements}</div>
      <button className="add-section-button" onClick={addSection}>
        Add Section
      </button>
    </>
  );
}

export default NoteNugget;

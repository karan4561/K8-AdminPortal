import TextEditor from "../TrueFalseNugget/TextEditor";
import { useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { NuggetsContext } from "../../context/NuggetsContext";
import { text } from "stream/consumers";

interface SectionProps {
  id: any;
  content: string
  onUpdate: (id: number, rtx: string) => void;
  onDelete: (id: number) => void;
}

function Section(props: SectionProps) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  function updateAnswerOption(content: string) {
    props.onUpdate(props.id, content);
  }

  return (
    <div>
      <TextEditor value={props.content} onUpdate={updateAnswerOption} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

function AddTextEditor() {
  const { nugget, updateOption } = useContext(NuggetsContext)
  const arr: string[] = [];
  let options: { text: string; }[]
  // const [sectionCount, setSectionCount] = useState(1);
  const [sections, setSections] = useState([{ id: uuid(), text: "" }]);

  function addSection() {
    // const newSectionCount = sectionCount + 1;
    const newSections = [...sections, { id: uuid(), text: "" }];
    // setSectionCount(newSectionCount); 
    setSections(newSections);
  }

  function handleDelete(id: any) {
    const newSections = sections.filter((section) => {
      // console.log(id,section.id !== id);
      return section.id !== id;
    });
    const newSectionCount = newSections.length;
    // setSectionCount(newSectionCount);
    setSections(newSections);
  }
  function updateAnswerOption(id: any, content: string) {
    const newSections = [...sections];
    const sectionIndex = newSections.findIndex((section) => section.id === id);
    if (sectionIndex !== -1) {
      newSections[sectionIndex] = { ...newSections[sectionIndex], text: content };
      setSections(newSections);
    }
  }
  useEffect(() => {
    sections.map((text) => {
      arr.push(text.text)
    })
    options = arr.map((text) => ({ text }));
    updateOption({
      option: options,
    })
  }, [sections])
  
  // console.log(arr);
  // useEffect(() => {
  // }, [options])
  const sectionElements = sections.map((section, index) => {
    const indexToAlpha = (index = 1) => {
      // ASCII value of first character
      const A = 'A'.charCodeAt(0);
      let numberToCharacter = (number: number) => {
        return String.fromCharCode(A + number);
      };
      return numberToCharacter(index);
    };
    return (
      <>
        <div className="option-editor">
          <p>{indexToAlpha(index)}</p>
          <Section key={section.id} id={section.id} onUpdate={updateAnswerOption} content={section.text} onDelete={handleDelete} />
        </div>
      </>
    );
  });

  return (
    <>
      {/* <div> */}
      <button className="subcard-addSection" onClick={addSection}>Add Section</button>
      {sectionElements}
      {/* </div> */}
    </>
  );
}

export default AddTextEditor;

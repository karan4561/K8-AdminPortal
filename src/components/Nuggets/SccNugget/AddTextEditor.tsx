import TextEditor from "../TrueFalseNugget/TextEditor";
import { useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { NuggetsContext } from "../../../context/NuggetsContext";

function AddTextEditor() {
  const { test, updateSCQOption, deleteSCQOption, addSCQOption } =
    useContext(NuggetsContext);
  // const [sections, setSections] = useState(nugget.question?.bilingual_options?.english || []);

  if (!test.question?.bilingual_options?.english) {
    useEffect(() => {
      addSCQOption()
    }, [])
  }
  // console.log(test.question?.bilingual_options?.english.length,"len");
  
  function addSection() {
    // const newSection = { text: "" };
    // setSections([...sections, newSection]);
    addSCQOption();
  }

  function handleDelete(index: number) {
    // const updatedSections = [...sections];
    // updatedSections.splice(index, 1);
    // setSections(updatedSections);
    deleteSCQOption({ index });
  }

  function updateAnswerOption(index: number, content: string) {
    // const updatedSections = [...sections];
    // updatedSections[index] = { text: content };
    // setSections(updatedSections);
    updateSCQOption({ index, text: content, });
  }

  const sectionElements = test.question?.bilingual_options?.english.map(
    (section, index) => {
      const indexToAlpha = (index = 1) => {
        const A = "A".charCodeAt(0);
        let numberToCharacter = (number: number) => {
          return String.fromCharCode(A + number);
        };
        return numberToCharacter(index);
      };
      return (
        <>
          <div className="option-editor" key={index}>
            <p>{indexToAlpha(index)}</p>
            <TextEditor
              value={section.text}
              onUpdate={(content: string) => updateAnswerOption(index, content)}
            />
          </div>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </>
      );
    }
  );

  return (
    <>
      <button className="subcard-addSection" onClick={addSection}>
        Add Section
      </button>
      {sectionElements}
    </>
  );
}
export default AddTextEditor;

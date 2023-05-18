// import TextEditor from "../TrueFalseNugget/TextEditor";
// import { useState, useEffect, useContext } from "react";
// import uuid from "react-uuid";
// import { NuggetsContext } from "../../context/NuggetsContext";

// interface SectionProps {
//   id: any;
//   content: string
//   onUpdate: (id: number, rtx: string) => void;
//   onDelete: (id: number) => void;
// }

// function Section(props: SectionProps) {
//   function handleDelete() {
//     props.onDelete(props.id);
//   }

//   function updateAnswerOption(content: string) {
//     props.onUpdate(props.id, content);
//   }

//   return (
//     <div>
//       <TextEditor value={props.content} onUpdate={updateAnswerOption} />
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// }

// function AddTextEditor() {
//   const { nugget, updateOption } = useContext(NuggetsContext)
//   const arr: string[] = [];
//   let options: { text: string; }[]
//   // const [sectionCount, setSectionCount] = useState(1);
//   const [sections, setSections] = useState([{ id: uuid(), text: "" }]);

//   function addSection() {
//     // const newSectionCount = sectionCount + 1;
//     const newSections = [...sections, { id: uuid(), text: "" }];
//     // setSectionCount(newSectionCount); 
//     setSections(newSections);
//   }

//   function handleDelete(id: any) {
//     const newSections = sections.filter((section) => {
//       // console.log(id,section.id !== id);
//       return section.id !== id;
//     });
//     // const newSectionCount = newSections.length; 
//     // setSectionCount(newSectionCount);
//     setSections(newSections);
//   }

//   function updateAnswerOption(id: any, content: string) {
//     const newSections = [...sections];
//     const sectionIndex = newSections.findIndex((section) => section.id === id);
//     if (sectionIndex !== -1) {
//       newSections[sectionIndex] = { ...newSections[sectionIndex], text: content };
//       setSections(newSections);
//     }
//   }
//   useEffect(() => {
//     sections.map((text) => {
//       arr.push(text.text)
//     })
//     options = arr.map((text) => ({ text }));
//     updateOption({
//       option: options,
//     })
//   }, [sections])
//   const sectionElements = sections.map((section, index) => {
//     const indexToAlpha = (index = 1) => {
//       // ASCII value of first character
//       const A = 'A'.charCodeAt(0);
//       let numberToCharacter = (number: number) => {
//         return String.fromCharCode(A + number);
//       };
//       return numberToCharacter(index);
//     };
//     return (
//       <>
//         <div className="option-editor">
//           <p>{indexToAlpha(index)}</p>
//           <Section key={section.id} id={section.id} onUpdate={updateAnswerOption} content={section.text} onDelete={handleDelete} />
//         </div>
//       </>
//     );
//   });

//   return (
//     <>
//       {/* <div> */}
//       <button className="subcard-addSection" onClick={addSection}>Add Section</button>
//       {sectionElements}
//       {/* </div> */}
//     </>
//   );
// }

// export default AddTextEditor;

import TextEditor from "../TrueFalseNugget/TextEditor";
import { useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { NuggetsContext } from "../../context/NuggetsContext";

function AddTextEditor() {
  const { nugget, updateSCQOption, deleteSCQOption, addSCQOption } = useContext(NuggetsContext);
  // const [sections, setSections] = useState(nugget.question?.bilingual_options?.english || []);

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
    updateSCQOption({ index, text: content });
  }

  const sectionElements = nugget.question?.bilingual_options?.english.map((section, index) => {
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
          <TextEditor value={section.text} onUpdate={(content: string) => updateAnswerOption(index, content)} />
        </div>
        <button onClick={() => handleDelete(index)}>Delete</button>
      </>
    );
  });

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
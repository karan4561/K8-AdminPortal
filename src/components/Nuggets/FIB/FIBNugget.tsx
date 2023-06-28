import React, { useContext, useEffect } from "react";
import FIBSection from "./components/FIBSection";
import AddOptionSection from "./components/AddOptionSection";
import { NuggetsContext } from "@/context/NuggetsContext";
import TextEditor from "../TrueFalseNugget/TextEditor";

interface FIB {
  value?: string;
  type: "text" | "blank";
}

function FIBNugget() {
  const { nugget, addFIBContent, deleteFIBContent, updateSolHint } =
    useContext(NuggetsContext);

  const sectionElement = nugget.question.fib?.english.map((section, idx) => {
    return (
      <section key={idx}>
        <FIBSection id={idx} value={section.value} />
        {deleteFIBContent && nugget.question.fib.english?.length !== 1 && (
          <button onClick={() => deleteFIBContent({ index: idx })}>
            Delete
          </button>
        )}
      </section>
    );
  });

  return (
    <>
      <div>
        <div className="fib-card">
          <div>{sectionElement}</div>
          <button className="subcard-addSection" onClick={addFIBContent}>
            Add Section
          </button>
        </div>
        <div className="fib-card">
          <h4>Add Other options</h4>
          <AddOptionSection value="fib"/>
        </div>
        <h4>Hint</h4>
        <TextEditor
          value={nugget.question.solutions?.[0].english.hint}
          onUpdate={(content: string) => updateSolHint({ hint: content })}
        />
        <h4>Solution</h4>
        <TextEditor
          value={nugget.question.solutions?.[0].english.text}
          onUpdate={(content: string) => updateSolHint({ text: content })}
        />
      </div>
    </>
  );
}

export default FIBNugget;

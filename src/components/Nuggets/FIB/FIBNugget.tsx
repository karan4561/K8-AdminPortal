import React, { useContext } from "react";
import FIBSection from "./components/FIBSection";
import { NuggetsContext } from "@/context/NuggetsContext";

interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}

function FIBNugget() {
  const initialFIBObject = { value: "", type: "TEXT" } as FIB;

  const { ques, addFIBItem } = useContext(NuggetsContext);

  function addSection() {
    addFIBItem(initialFIBObject);
  }

  const sectionElement = ques?.fib?.english.map((section, idx) => {
    return (
      <section key={idx}>
        <FIBSection id={idx} />
      </section>
    );
  });
  return (
    <>
      <div>{sectionElement}</div>
      <button className="add-section-button" onClick={addSection}>
        Add Section
      </button>
    </>
  );
}

export default FIBNugget;

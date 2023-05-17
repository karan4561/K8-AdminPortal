import AddSection from "./components/AddSection";
import { useState, useContext, useEffect } from "react";
import uuid from "react-uuid";
import { NuggetsContext } from "@/context/NuggetsContext";
import { ContentObject } from "@/interfaces/INugget";

function NoteNugget() {
  const { test, addContentItem, handleDeleteNoteContent } =
    useContext(NuggetsContext);

  const initialContentObject = { kind: "H1", list: [] } as ContentObject;

  function addSection2() {
    addContentItem(initialContentObject);
  }
  const sectionElements = test.content?.map((section, idx) => {
    return (
      <section key={idx}>
        <AddSection id={idx} />
        <button onClick={() => handleDeleteNoteContent(idx)}>Delete</button>
      </section>
    );
  });

  return (
    <>
      <div>{sectionElements}</div>
      <button className="add-section-button" onClick={addSection2}>
        Add Section
      </button>
    </>
  );
}

export default NoteNugget;

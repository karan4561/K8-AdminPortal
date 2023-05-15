import React, { createContext, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";
import { useEffect } from "react";
import { ContentObject, Nugget } from "@/interfaces/INugget";

interface OptionType {
  label:
    | "Video"
    | "SCQ"
    | "MCQ"
    | "Note"
    | "FIB"
    | "IMG"
    | "AUDIOCLIP"
    | "LTI"
    | "TrueFalse"
    | "Audio";
  value: string;
}

const initialState = {} as INuggetContext;
const initialStateTest = {} as Nugget;

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

const NuggetProvider = (props: any) => {
  const [test, setTest] = useState<Nugget>(initialStateTest);
  const [state, setState] = useState<INuggetContext>(initialState);
  const [nuggetKind, setNuggetKind] = useState<string>("");
  const [note, setNote] = useState<ContentObject>();

  console.log("this is testing file", test);
  useEffect(() => {
    updateKind(nuggetKind);
    if (note) {
      addListItem(note);
    }
  }, [nuggetKind, note]);

  function updateCategoryObject(Category: {
    Category: string;
    Chapter: string;
    Subject: string;
    Topic?: string;
  }) {
    setTest((prev) => ({
      ...prev,
      categories: {
        categoryId: Category.Category,
        subjectId: Category.Subject,
        chapterId: Category.Chapter,
        topicId: Category.Topic,
      },
    }));
  }

  function updateKind(nuggetkind: string) {
    setTest((prev) => ({
      ...prev,
      kind: nuggetkind,
    }));
  }

  function updateNuggetInfo(NuggetInfo: {
    headerTitle?: string;
    sideNote?: string;
    isKnowledgeCap?: boolean;
  }) {
    setTest((prev) => ({
      ...prev,
      headerTitle: NuggetInfo.headerTitle,
      sideNote: NuggetInfo.sideNote,
      IsKnowledgeCap: NuggetInfo.isKnowledgeCap,
    }));
  }

  function updateXPTimer(XPTimer: { reward: number; timeToReward: number }) {
    setTest((prev) => ({
      ...prev,
      reward: XPTimer.reward,
      timeToReward: XPTimer.timeToReward,
    }));
  }

  function updateContentKind(kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  }) {
    setTest((prev) => ({ ...prev, kind: kind.kind }));
  }

  function addListItem(note: ContentObject) {
    console.log("here: ");
    if (!test.content) setTest((prev) => ({ ...prev, content: [note] }));
    else {
      setTest((prev) => ({ ...prev, content: [...prev.content, note] }));
    }
  }

  return (
    <div>
      <NuggetsContext.Provider
        value={{
          ...state,
          nuggetKind,
          note,
          setNote,
          setNuggetKind,
          updateCategoryObject,
          updateNuggetInfo,
          updateXPTimer,
          updateContentKind,
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

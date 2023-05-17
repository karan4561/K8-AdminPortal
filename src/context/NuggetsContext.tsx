import React, { createContext, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";
import { useEffect } from "react";
import {
  BulletObject,
  ContentObject,
  ListItemObject,
  Nugget,
} from "@/interfaces/INugget";

const initialState = {} as INuggetContext;
const initialStateTest = {} as Nugget;

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

const NuggetProvider = (props: any) => {
  const [test, setTest] = useState<Nugget>(initialStateTest);
  const [nuggetKind, setNuggetKind] = useState<string>("");
  const [bullet, setBullet] = useState<BulletObject>();
  const [list, setList] = useState<Array<string>>([""]);

  console.log("this is list file", list);
  console.log("this is testing file", test);
  useEffect(() => {
    updateKind(nuggetKind);
  }, [nuggetKind]);

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

  function addContentItem(note: ContentObject) {
    console.log("here: ");
    if (!test.content) setTest((prev) => ({ ...prev, content: [note] }));
    else {
      setTest((prev) => ({ ...prev, content: [...prev.content, note] }));
      test.content.filter((content) => content.list !== undefined);
    }
  }

  function addListItem(item: string) {
    //list.push(item);
    setList((prev) => [...prev, item]);
    console.log("Here is list", list);
  }

  function updateContentItem(idx: number, note: ContentObject) {
    console.log("..........idx..........", idx);
    console.log("..........note..........", note);
    if (test.content) test.content[idx] = note;
    setTest({ ...test });
  }

  //use alternate kind definition

  function updateListItem(
    idi: number,
    item: string,
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG",
    idj: number
  ) {
    if (list) {
      list[idj] = item;
      setList(list);
    }
    // console.log("..........idj..........", idj);
    // console.log("..........idi..........", idi);
    if (kind == "OL") {
      updateContentItem(idi, { kind: kind, list: list, bullet: bullet });
    } else if (kind == "UL") {
      updateContentItem(idi, { kind: kind, list: list });
    }
  }

  function handleDeleteNoteContent(id: number) {
    if (test.content) {
      test.content.splice(id, 1);
    }
    setTest(test);
  }

  return (
    <div>
      <NuggetsContext.Provider
        value={{
          test,
          setTest,
          nuggetKind,
          bullet,
          list,
          setList,
          setBullet,
          setNuggetKind,
          updateCategoryObject,
          updateNuggetInfo,
          updateXPTimer,
          updateContentKind,
          addContentItem,
          updateContentItem,
          addListItem,
          updateListItem,
          handleDeleteNoteContent,
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

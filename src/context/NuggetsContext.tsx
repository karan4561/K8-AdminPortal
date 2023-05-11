import React, { createContext, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";
import { useEffect } from "react";

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

export const NuggetsContext = React.createContext<any>("");

const NuggetProvider = (props: any) => {
  const [state, setState] = useState<INuggetContext>(initialState);
  const [nuggetKind, setNuggetKind] = useState<string>("");

  useEffect(() => {
    updateKind(nuggetKind);
  }, [nuggetKind]);

  function updateCategoryObject(Category: {
    Category: string;
    Chapter: string;
    Subject: string;
    Topic?: string;
  }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        categories: {
          categoryId: Category.Category,
          subjectId: Category.Subject,
          chapterId: Category.Chapter,
          topicId: Category.Topic,
        },
      },
    });
  }

  function updateKind(nuggetkind: string) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        kind: nuggetkind,
      },
    });
  }

  function updateNuggetInfo(NuggetInfo: {
    headerTitle?: string;
    sideNote?: string;
    isKnowledgeCap?: boolean;
  }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        headerTitle: NuggetInfo.headerTitle,
        sideNote: NuggetInfo.sideNote,
        IsKnowledgeCap: NuggetInfo.isKnowledgeCap,
      },
    });
  }

  function updateXPTimer(XPTimer: { reward: number; timeToReward: number }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        reward: XPTimer.reward,
        timeToReward: XPTimer.timeToReward,
      },
    });
  }

  return (
    <div>
      <NuggetsContext.Provider
        value={{
          nuggetKind,
          setNuggetKind,
          updateCategoryObject,
          updateNuggetInfo,
          updateXPTimer,
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

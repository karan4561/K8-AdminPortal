import React, { createContext, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";
import { useEffect } from "react";
import { ContentObject } from "@/interfaces/INugget";

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

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

const NuggetProvider = (props: any) => {
  const [state, setState] = useState<INuggetContext>(initialState);
  const [nuggetKind, setNuggetKind] = useState<string>("");
  const [note, setNote] = useState<ContentObject>({
    kind: "H1",
    list: [],
  });

  useEffect(() => {
    updateKind(nuggetKind);
  }, [nuggetKind, note]);

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

  function updateContentKind(kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        content: [
          {
            ...state.content,
            kind: kind.kind,
          },
        ],
      },
    });
  }

  function addListItem(item: { rtx: string }) {}

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

import React, { createContext, useContext, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";
import { useEffect } from "react";

import { Nugget } from "@/interfaces/INugget";

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

import {
  BulletObject,
  ContentObject,
  ListItemObject,
  QuestionObject,
} from "@/interfaces/INugget";

const initialState = {} as INuggetContext;
const initialStateTest = {} as Nugget;

interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

const NuggetProvider = (props: any) => {
  const [state, setState] = useState<INuggetContext>(initialState);
  const [test, setTest] = useState<Nugget>(initialStateTest);
  //const [nuggetKind, setNuggetKind] = useState<string>("");
  const [bullet, setBullet] = useState<BulletObject>();
  const [list, setList] = useState<Array<string>>([""]);
  const [ques, setQues] = useState<QuestionObject>();

  console.log("this is list file", list);
  console.log("this is testing file", test);
  console.log("this is question object", ques);
  console.log("this is state being tested", state);

  // useEffect(() => {
  //   updateKind(nuggetKind);
  // }, [nuggetKind]);

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

  function updateNuggetKind(
    nuggetkind:
      | "Video"
      | "SCQ"
      | "MCQ"
      | "Note"
      | "FIB"
      | "IMG"
      | "AUDIOCLIP"
      | "LTI"
      | "TrueFalse"
      | "Audio"
  ) {
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

  function addFIBItem(note: FIB) {
    if (!ques?.fib)
      setQues((prev) => ({ ...prev, fib: { ...prev?.fib, english: [note] } }));
    else {
      setQues((prev) => ({
        ...prev,
        fib: { ...prev?.fib, english: [...prev?.fib?.english, note] },
      }));
    }
    //console.log("wuhoo");
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

  function updateFIBItem(idx: number, note: FIB) {
    if (ques?.fib?.english) {
      ques.fib.english[idx] = note;
    }
    setQues({ ...ques });
  }

  function handleDeleteNoteContent(id: number) {
    if (test.content) {
      test.content.splice(id, 1);
    }
    setTest(test);
  }

  function updateSolHint(SolHint: { text?: string; hint?: string }) {
    setTest((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        solutions: [
          {
            english: {
              hint: SolHint.hint,
              text: SolHint.text,
              otherSolutions: undefined,
              videoSolutions: undefined,
            },
            hindi: {
              hint: "",
              text: "",
              otherSolutions: "",
              videoSolutions: "",
            },
            default: {
              hint: undefined,
              text: undefined,
              otherSolutions: undefined,
              videoSolutions: undefined,
            },
          },
        ],
      },
    }));
  }
  function updateQuestion(question: { english: string }) {
    setTest((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        content: { ...prev.question.content, english: question.english },
      },
    }));
  }
  function updateAnswer(Answer: { answer: string }) {
    setTest((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        answer: { ...prev.question.answer, english: Answer.answer },
      },
    }));
  }
  function updateCaption(caption: { caption?: string }) {
    setTest({ ...test, caption: caption.caption });
  }

  function updateVideoNugget(videoNugget: {
    videoCaption?: string;
    videoURI?: string;
  }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        caption: videoNugget.videoCaption,
        videoURI: videoNugget.videoURI,
      },
    });
  }

  function updateFileObj(FileObj: {
    id?: string;
    name?: string;
    baseUrl: string;
    key: string;
    type?:
      | "CONTENT"
      | "TEST"
      | "SUBJECTIVE_TEST_SOLUTIONS"
      | "VIMEO"
      | "JWPLAYER";
    organization?: string;
    size?: number;
    details?: string;
  }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        imageURI: {
          _id: FileObj.id,
          name: FileObj.name,
          baseUrl: FileObj.baseUrl,
          key: FileObj.key,
          type: FileObj.type,
          organization: FileObj.organization,
          size: FileObj.size,
          details: FileObj.details,
        },
      },
    });
  }

  function updateOption(Option: { option: { text: string }[] }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        question: {
          ...state.nugget.question,
          bilingual_options: {
            ...state.nugget.question?.bilingual_options,
            english: Option.option,
          },
        },
      },
    });
  }

  function updateCorrectOption(Option: { isCorrect: boolean; index: number }) {
    setTest((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        bilingual_options: {
          ...prev.question.bilingual_options,
          english: test.question.bilingual_options!.english.map((option, i) => {
            if (test.kind === "SCQ") {
              console.log("scq");
              if (i === Option.index) {
                return {
                  ...option,
                  isCorrect: Option.isCorrect,
                };
              } else {
                return {
                  ...option,
                  isCorrect: false,
                };
              }
            } else {
              if (i === Option.index) {
                return {
                  ...option,
                  isCorrect: Option.isCorrect,
                };
              }
              return option;
            }
          }),
        },
      },
    }));
  }

  function addSCQOption() {
    const newOption = {
      text: "",
    };
    if (!test.question.bilingual_options?.english)
      setTest((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          bilingual_options: {
            ...prev.question.bilingual_options,
            english: [newOption],
          },
        },
      }));
    else
      setTest((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          bilingual_options: {
            ...prev.question.bilingual_options,
            english: [...prev.question.bilingual_options?.english, newOption],
          },
        },
      }));
  }
  function deleteSCQOption(Option: { index: number }) {
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     nugget: {
    //       ...prevState.nugget,
    //       question: {
    //         ...prevState.nugget.question,
    //         bilingual_options: {
    //           ...prevState.nugget.question.bilingual_options,
    //           english:
    //             prevState.nugget.question.bilingual_options.english.filter(
    //               (_, i) => i !== Option.index
    //             ),
    //         },
    //       },
    //     },
    //   };
    // });
    test.question.bilingual_options?.english.splice(Option.index, 1);
    setTest(test);
  }

  function updateSCQOption(Option: { index: number; text: string }) {
    setTest((prev) => {
      const updatedOptions = prev.question.bilingual_options?.english
        ? prev.question.bilingual_options.english
        : [];
      updatedOptions[Option.index] = { text: Option.text };
      return {
        ...prev,
        question: {
          ...prev.question,
          bilingual_options: {
            ...prev.question.bilingual_options,
            english: updatedOptions,
          },
        },
      };
    });
  }

  return (
    <div>
      <NuggetsContext.Provider
        value={{
          ...state,
          test,
          setTest,
          updateNuggetKind,
          bullet,
          list,
          ques,
          setQues,
          setList,
          setBullet,
          updateCategoryObject,
          updateNuggetInfo,
          updateXPTimer,
          updateAnswer,
          updateSolHint,
          updateQuestion,
          updateCaption,
          updateVideoNugget,
          updateFileObj,
          updateOption,
          updateCorrectOption,
          addSCQOption,
          deleteSCQOption,
          updateSCQOption,
          updateContentKind,
          addContentItem,
          updateContentItem,
          addListItem,
          updateListItem,
          handleDeleteNoteContent,
          addFIBItem,
          updateFIBItem,
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

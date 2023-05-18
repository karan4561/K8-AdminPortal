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
  Nugget,
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
  const [test, setTest] = useState<Nugget>(initialStateTest);
  const [nuggetKind, setNuggetKind] = useState<string>("");
  const [bullet, setBullet] = useState<BulletObject>();
  const [list, setList] = useState<Array<string>>([""]);
  const [ques, setQues] = useState<QuestionObject>();

  console.log("this is list file", list);
  console.log("this is testing file", test);
  console.log("this is question object", ques);

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

<!--     setState(prevState => ({
      ...prevState,
      nugget: {
        ...prevState.nugget,
        headerTitle: NuggetInfo.headerTitle !== undefined ? NuggetInfo.headerTitle : prevState.nugget.headerTitle,
        sideNote: NuggetInfo.sideNote !== undefined ? NuggetInfo.sideNote : prevState.nugget.sideNote,
        IsKnowledgeCap: NuggetInfo.isKnowledgeCap !== undefined ? NuggetInfo.isKnowledgeCap : prevState.nugget.IsKnowledgeCap,
      },
    })); -->

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
  function updateTFSolHint(SolHint: { text?: string, hint?: string }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        question: {
          ...state.nugget.question,
          solutions: [
            {
              english: {
                hint: SolHint.hint,
                text: SolHint.text,
                otherSolutions: undefined,
                videoSolutions: undefined,
              },
              hindi: {
                hint: '',
                text: '',
                otherSolutions: '',
                videoSolutions: '',
              },
              default: {
                hint: undefined,
                text: undefined,
                otherSolutions: undefined,
                videoSolutions: undefined,
              },
            }
          ]
        }
      }
    })
  }
  function updateTFQuestion(question: { english: string }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        question: {
          ...state.nugget.question,
          content: {
            ...state.nugget.question?.content,
            english: question.english
          }
        }
      }
    })
  }
  function updateTFAnswer(Answer: { answer: string }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        question: {
          ...state.nugget.question,
          answer: {
            ...state.nugget.question?.answer,
            english: Answer.answer
          }
        }
      }
    })
  }
  function updateCaption(caption: { caption?: string }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        caption: caption.caption
      }
    })
  }
  function updateVideoNugget(videoNugget: { videoCaption?: string, videoURI?: string }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        caption: videoNugget.videoCaption,
        videoURI: videoNugget.videoURI
      }
    })
  }
  function updateFileObj(FileObj: { id?: string; name?: string; baseUrl: string; key: string; type?: | "CONTENT" | "TEST" | "SUBJECTIVE_TEST_SOLUTIONS" | "VIMEO" | "JWPLAYER"; organization?: string; size?: number; details?: string; }) {
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
          details: FileObj.details
        }
      }
    })
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
            english: Option.option
          }
        }
      }
    })
  }
  function updateCorrectOption(Option: { isCorrect: boolean; index: number }) {
    setState({
      ...state,
      nugget: {
        ...state.nugget,
        question: {
          ...state.nugget.question,
          bilingual_options: {
            ...state.nugget.question.bilingual_options,
            english: state.nugget.question.bilingual_options.english.map((option, i) => {
              if (state.nugget.kind === "SCQ") {
                console.log("scq");
                if (i === Option.index) {
                  return {
                    ...option,
                    isCorrect: Option.isCorrect
                  };
                }
                else {
                  return {
                    ...option,
                    isCorrect: false
                  };
                }
                // return option;
              }
              else {
                if (i === Option.index) {
                  return {
                    ...option,
                    isCorrect: Option.isCorrect
                  };
                }
                return option;
              }
            })
          }
        }
      }
    })
  }
  function addSCQOption() {
    const newOption = {
      text: "",
    };
    setState(prevState => ({
      ...prevState,
      nugget: {
        ...prevState.nugget,
        question: {
          ...prevState.nugget.question,
          bilingual_options: {
            ...prevState.nugget.question.bilingual_options,
            english: [
              ...(prevState.nugget.question.bilingual_options?.english || []), // Add a conditional check
              newOption
            ]
          }
        }
      }
    }))
  }
  function deleteSCQOption(Option: { index: number }) {
    setState(prevState => {
      // const updatedOptions = [...prevState.nugget.question.bilingual_options.english];
      // updatedOptions.splice(Option.index, 1);
      return {
        ...prevState,
        nugget: {
          ...prevState.nugget,
          question: {
            ...prevState.nugget.question,
            bilingual_options: {
              ...prevState.nugget.question.bilingual_options,
              english: prevState.nugget.question.bilingual_options.english.filter(
                (_, i) => i !== Option.index
              )
            }
          }
        }
      };
    });
  }

  function updateSCQOption(Option: { index: number; text: string }) {
    setState(prevState => {
      const updatedOptions = prevState.nugget.question.bilingual_options?.english
        ? prevState.nugget.question.bilingual_options.english
        : [];
      updatedOptions[Option.index] = { text: Option.text };
      return {
        ...prevState,
        nugget: {
          ...prevState.nugget,
          question: {
            ...prevState.nugget.question,
            bilingual_options: {
              ...prevState.nugget.question.bilingual_options,
              english: updatedOptions
            }
          }
        }
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

          nuggetKind,
          bullet,
          list,
          ques,
          setQues,
          setList,
          setBullet,
          setNuggetKind,
          updateCategoryObject,
          updateNuggetInfo,
          updateXPTimer,

          updateTFAnswer,
          updateTFSolHint,
          updateTFQuestion,
          updateCaption,
          updateVideoNugget,
          updateFileObj,
          updateOption,
          updateCorrectOption,
          addSCQOption,
          deleteSCQOption,
          updateSCQOption

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

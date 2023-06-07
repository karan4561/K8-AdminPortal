import React, { createContext, useContext, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";
import { useEffect } from "react";

import { CategoryObject, Nugget } from "@/interfaces/INugget";
import * as _ from "lodash";

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
    | "TRUEFALSE"
    | "Audio";
  value: string;
}

import {
  BulletObject,
  ContentObject,
  ListItemObject,
  QuestionObject,
} from "@/interfaces/INugget";
import useFilters from "./filters";
import { fetchNugget } from "@/api/utils";

const initialState = {} as INuggetContext;

const initialStateTest = {
  categories: [],
  kind: "SCQ",
  question: {
    bilingual_options: {
      english: [
        {
          text: "",
          isCorrect: true,
        },
      ],
    },
    solutions: [
      {
        english: {
          text: null,
          hint: null,
        },
      },
    ],
  },
} as any;

interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

const NuggetProvider = (props: any) => {
  const [nugget, setNugget] = useState<Nugget>(_.cloneDeep(initialStateTest));
  const [bullet, setBullet] = useState<BulletObject>();
  const [list, setList] = useState<Array<string>>([""]); //fib
  const [ques, setQues] = useState<QuestionObject>(); //fib
  const [submit, setSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});

  const { filters, ...filterFunctions } = useFilters();

  // useEffect(() => {
  //   updateFilters(filters);
  // }, [filters]);

  console.log("***This is Nugget***", nugget);

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
      | "TRUEFALSE"
      | "Audio"
  ) {
    setNugget({
      ...initialStateTest,
      kind: nuggetkind,
      categories: nugget.categories,
    } as Nugget);
  }
  console.log("Initial State Testing: ", nugget);
  function updateFilters(filter: CategoryObject[]) {
    console.log("*****This is being called******** step - 2", filter);
    setNugget((prev) => ({
      ...prev,
      categories: filter,
    }));
  }

  function updateNuggetInfo(NuggetInfo: {
    headerTitle?: string;
    sideNote?: string;
    isKnowledgeCap?: boolean;
  }) {
    setNugget((prev) => ({
      ...prev,
      headerTitle: NuggetInfo.headerTitle,
      sideNote: NuggetInfo.sideNote,
      IsKnowledgeCap: NuggetInfo.isKnowledgeCap,
    }));
  }

  function updateXPTimer(XPTimer: { reward: number; timeToReward: number }) {
    setNugget((prev) => ({
      ...prev,
      reward: XPTimer.reward,
      timeToReward: XPTimer.timeToReward,
    }));
  }

  function updateContentKind(kind: {
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  }) {
    setNugget((prev) => ({ ...prev, kind: kind.kind }));
  }

  function addContentItem(note: ContentObject) {
    //console.log("here: ");
    if (!nugget.content) setNugget((prev) => ({ ...prev, content: [note] }));
    else {
      setNugget((prev) => ({ ...prev, content: [...prev.content, note] }));
      nugget.content.filter((content) => content.list !== undefined);
    }
  }

  function addListItem(item: string) {
    //list.push(item);
    setList((prev) => [...prev, item]);
    //console.log("Here is list", list);
  }

  // function addFIBItem(note: FIB) {
  //   if (!ques?.fib)
  //     setQues((prev) => ({ ...prev, fib: { ...prev?.fib, english: [note] } }));
  //   else {
  //     setQues((prev) => ({
  //       ...prev,
  //       fib: { ...prev?.fib, english: [...prev?.fib?.english, note] },
  //     }));
  //   }
  //   //console.log("wuhoo");
  // }

  function updateContentItem(idx: number, note: ContentObject) {
    //console.log("..........idx..........", idx);
    //console.log("..........note..........", note);
    if (nugget.content) nugget.content[idx] = note;
    setNugget({ ...nugget });
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
    if (kind == "OL") {
      updateContentItem(idi, { kind: kind, list: list, bullet: bullet });
    } else if (kind == "UL") {
      updateContentItem(idi, { kind: kind, list: list });
    }
  }

  // function updateFIBItem(idx: number, note: FIB) {
  //   if (ques?.fib?.english) {
  //     ques.fib.english[idx] = note;
  //   }
  //   setQues({ ...ques });
  // }

  function handleDeleteNoteContent(id: number) {
    if (nugget.content) {
      nugget.content.splice(id, 1);
    }
    setNugget(nugget);
  }

  function updateSolHint(SolHint: { text?: string; hint?: string }) {
    setNugget((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        solutions: [
          {
            english: {
              hint:
                SolHint.hint !== undefined
                  ? SolHint.hint
                  : prev.question.solutions[0].english.hint,
              text:
                SolHint.text !== undefined
                  ? SolHint.text
                  : prev.question.solutions[0].english.text,
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
    setNugget((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        content: { ...prev.question.content, english: question.english },
      },
    }));
  }
  function updateAnswer(Answer: { answer: boolean }) {
    setNugget((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        bilingual_options: {
          english:[
            {
              text: "True",
              isCorrect: Answer.answer
            },
            {
              text: "True",
              isCorrect: !Answer.answer
            }
          ]
        },
      },
    }));
  }
  function updateCaption(caption: { caption?: string }) {
    setNugget((prev)=>({
      ...prev,
      caption: caption.caption
    }));
  }

  function updateFileObj(FileObj: {
    id?: string;
    name?: string;
    baseUrl: string;
    key: string
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
    setNugget({
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

  function updateCorrectOption(Option: { isCorrect: boolean; index: number }) {
    setNugget((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        bilingual_options: {
          ...prev.question.bilingual_options,
          english: nugget.question.bilingual_options!.english.map(
            (option, i) => {
              if (nugget.kind === "SCQ") {
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
            }
          ),
        },
      },
    }));
  }

  function addSCQOption() {
    const newOption = {
      text: "",
      isCorrect: false,
    };
    //debugger;
    console.log("This is being called");
    if (!nugget.question?.bilingual_options?.english)
      setNugget((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          bilingual_options: {
            ...prev.question?.bilingual_options,
            english: [newOption],
          },
        },
      }));
    else
      setNugget((prev) => ({
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
    setNugget((prev) => {
      return {
        ...prev,
        question: {
          ...prev.question,
          bilingual_options: {
            ...prev.question.bilingual_options,
            english: prev.question.bilingual_options?.english.filter(
              (_, i) => i !== Option.index
            ),
          },
        },
      };
    });
    //test.question.bilingual_options?.english.splice(Option.index, 1);
    // setTest({test});
  }

  function updateSCQOption(Option: { index: number; text: string }) {
    setNugget((prev) => {
      const updatedOptions = prev.question.bilingual_options?.english
        ? prev.question.bilingual_options.english
        : [];
      updatedOptions[Option.index] = {
        text: Option.text,
        isCorrect:
          prev.question.bilingual_options?.english[Option.index].isCorrect,
      };
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

  function validateErrors(values: Nugget) {
    const errors: any = {};
    let flag = false;
    let check = false;
    // if (
    //   !values.categories?.categoryId ||
    //   !values.categories?.chapterId ||
    //   !values.categories?.subjectId
    // ) {
    //   errors.categories = "Category Option is Empty";
    // }

    if (!values.kind) {
      errors.kind = "Nugget Kind is Empty!";
    }
    if (nugget.kind == "SCQ" || nugget.kind == "MCQ") {
      //console.log("This is question.content", values.question.content);
      if (!values.question.content || values.question.content.english == "") {
        errors.question = "Type Question is Empty";
      }

      values.question.bilingual_options?.english.map((opt) => {
        //console.log("this is opt text", opt.text);
        if (opt.text == "") {
          //console.log("I have found an empty string");
          check = true;
        }
      });

      if (check) {
        //console.log("......ENTRY ACCESS GIVEN!......");
        errors.options = "Type Option is Empty";
      }

      //scq and mcq different

      values.question.bilingual_options?.english.map((opt) => {
        if (opt.isCorrect == true) {
          flag = true;
        }
      });

      console.log("value of flag for correction option:", flag);

      if (!flag) {
        console.log("Triggeredddddddd");
        errors.isCorrect = "Correct Option not defined";
      }
    }
    console.log("Here are the errors", errors);
    return errors;
  }

  function fetchNuggetContent(nuggetId: string) {
    //console.log("***Nugget Info Dynamic - 1 ******", nugget);
    if (!nuggetId) return;
    else {
      fetchNugget([nuggetId]).then((data) => {
        console.log("***Nugget in FetchContent - step 1", data[0]);
        setNugget((prev: Nugget) => ({ ...prev, ...data[0] }));
        filterFunctions.setFilters(data[0].categories);
        //console.log("****!!!!!****", data[0].categories);
        //console.log("***Nugget Info Dynamic fetchContent ******", nugget);
      });
    }
  }

  return (
    <div>
      <NuggetsContext.Provider
        value={{
          nugget: { ...nugget, categories: filters },
          ...filterFunctions,
          setNugget: setNugget,
          updateNuggetKind,
          bullet,
          list,
          ques,
          setQues,
          setList,
          setBullet,
          updateNuggetInfo,
          updateXPTimer,
          updateAnswer,
          updateSolHint,
          updateQuestion,
          updateCaption,
          updateFileObj,
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
          submit,
          setSubmit,
          formErrors,
          setFormErrors,
          validateErrors,
          fetchNuggetContent,
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

//two way binding
//preview
//validations in UI
// Error in UI

//check on header title

// two way binding
//edit nugget functionality
//not change in nugget kind

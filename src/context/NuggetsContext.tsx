import React, { useEffect, useState } from "react";
import { INuggetContext } from "./interface/INuggetsContext";

import {
  Nugget,
  FileObject,
  ListItemObject,
  Coordinates,
} from "@/interfaces/INugget";
import * as _ from "lodash";

interface OptionType {
  label:
    | "VIDEO"
    | "SCQ"
    | "MCQ"
    | "NOTE"
    | "FIB"
    | "IMAGE"
    | "AUDIOCLIP"
    | "LTI"
    | "TRUEFALSE"
    | "Audio";
  value: string;
}

import {
  BulletObject,
  ContentObject,
  QuestionObject,
} from "@/interfaces/INugget";
import useFilters from "./filters";
import { fetchNugget } from "@/api/utils";
import {
  initialStateFIB,
  initialStateSCC,
} from "@/utils/InitialStateNuggets/InitialStateNuggets";
import {
  validateAudio,
  validateFIB,
  validateSCC,
} from "@/utils/Validations/Validations";

const initialState = {} as INuggetContext;
const initialBullet = {} as BulletObject;

interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

const NuggetProvider = (props: any) => {
  const [nugget, setNugget] = useState<Nugget>(_.cloneDeep(initialStateSCC));
  const [bullet, setBullet] = useState<BulletObject[]>([initialBullet]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [icon, setIcon] = useState<FileObject[]>();
  const [nuggetId, setNuggetId] = useState<string>();
  const { filters, ...filterFunctions } = useFilters();

  console.log("***This is Nugget***", nugget);

  function updateFileObj(
    FileObj: {
      _id?: string;
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
    }[]
  ) {
    const updatedIcons = FileObj.map((obj) => ({
      _id: obj._id,
      name: obj.name,
      baseUrl: obj.baseUrl,
      key: obj.key,
      type: obj.type,
      organization: obj.organization,
      size: obj.size,
      details: obj.details,
    }));
    setIcon(updatedIcons);
  }

  function updateHeaderIcon(iconObj: {
    _id?: string;
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
    setNugget((prev) => ({
      ...prev,
      headerIcon: {
        _id: iconObj._id,
        name: iconObj.name,
        baseUrl: iconObj.baseUrl,
        key: iconObj.key,
        type: iconObj.type,
        organization: iconObj.organization,
        size: iconObj.size,
        details: iconObj.details,
      },
    }));
  }

  function imageURI(imageURI: { URI: FileObject }) {
    setNugget((prev) => ({
      ...prev,
      imageUri: imageURI.URI,
    }));
  }

  function audioURI(audioURI: { URI: FileObject }) {
    setNugget((prev) => ({
      ...prev,
      audioUri: audioURI.URI,
    }));
  }

  function updateNuggetKind(
    nuggetkind:
      | "Video"
      | "SCQ"
      | "MCQ"
      | "Note"
      | "FIB"
      | "IMAGE"
      | "AUDIOCLIP"
      | "LTI"
      | "TRUEFALSE"
      | "Audio"
  ) {
    if (nuggetkind == "FIB") {
      setNugget({
        ...initialStateFIB,
        kind: nuggetkind,
        categories: nugget.categories,
        headerIcon: nugget.headerIcon,
        sideNote: nugget.sideNote,
        IsKnowledgeCap: nugget.IsKnowledgeCap,
        headerTitle: nugget.headerTitle,
      } as Nugget);
    } else {
      setNugget({
        ...initialStateSCC,
        kind: nuggetkind,
        categories: nugget.categories,
        headerIcon: nugget.headerIcon,
        sideNote: nugget.sideNote,
        IsKnowledgeCap: nugget.IsKnowledgeCap,
        headerTitle: nugget.headerTitle,
      } as Nugget);
    }
  }

  function updateNuggetInfoHeader(headerTitle: string) {
    setNugget((prev) => ({
      ...prev,
      headerTitle: headerTitle,
    }));
  }

  function updateNuggetInfoSideNote(sideNote: string) {
    setNugget((prev) => ({
      ...prev,
      sideNote: sideNote,
    }));
  }

  function updateNuggetInfoKnowledgeCap(isKnowledgeCap: boolean) {
    setNugget((prev) => ({
      ...prev,
      IsKnowledgeCap: isKnowledgeCap,
    }));
  }

  function updateVideoNugget(video: {
    videoURI?: string;
    videoCaption?: string;
  }) {
    setNugget((prev) => ({
      ...prev,
      videoURI: video.videoURI !== undefined ? video.videoURI : prev.videoURI,
      caption:
        video.videoCaption !== undefined ? video.videoCaption : prev.caption,
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

  function contentIcon(imageURI: { URI: FileObject; index: number }) {
    setNugget((prev) => {
      const updatedContent = [...prev.content]; // Create a copy of the content array

      // Check if the specified index is within bounds
      if (imageURI.index >= 0 && imageURI.index < updatedContent.length) {
        // Update the icon property of the content item at the specified index
        updatedContent[imageURI.index] = {
          ...updatedContent[imageURI.index],
          icon: imageURI.URI,
        };
      }

      return {
        ...prev,
        content: updatedContent, // Update the content array in the nugget object
      };
    });
  }

  function addListItem(idx: number, list: ListItemObject) {
    if (!nugget.content[idx].list) {
      setNugget((prev) => {
        return {
          ...prev,
          content: prev.content.map((option, i) => {
            if (i == idx) {
              return {
                ...option,
                list: [list],
              };
            } else {
              return option;
            }
          }),
        };
      });
    } else {
      setNugget((prev) => {
        return {
          ...prev,
          content: prev.content.map((option, i) => {
            if (i == idx) {
              return {
                ...option,
                list: [...option.list, list],
              };
            } else {
              return option;
            }
          }),
        };
      });
    }
  }

  function addFIBContent() {
    const newOption = {
      value: "",
      type: "text",
    };
    if (!nugget.question?.fib?.english)
      setNugget((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          fib: {
            ...prev.question?.fib,
            english: [newOption],
          },
        },
      }));
    else
      setNugget((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          fib: {
            ...prev.question.fib,
            english: [...prev.question.fib?.english, newOption],
          },
        },
      }));
  }

  function updateFIBContentType(Content: { index: number; type: string }) {
    setNugget((prev) => {
      return {
        ...prev,
        question: {
          ...prev.question,
          fib: {
            ...prev.question.fib,
            english: nugget.question.fib.english.map((option, i) => {
              if (i === Content.index) {
                return {
                  ...option,
                  type: Content.type,
                };
              } else {
                return option;
              }
            }),
          },
        },
      };
    });
  }

  function updateFIBContentText(Content: { index: number; text: string }) {
    setNugget((prev) => {
      return {
        ...prev,
        question: {
          ...prev.question,
          fib: {
            ...prev.question.fib,
            english: prev.question.fib.english.map((option, i) => {
              if (i === Content.index) {
                return {
                  ...option,
                  value: Content.text,
                };
              } else {
                return option;
              }
            }),
          },
        },
      };
    });
  }

  function deleteFIBContent(Content: { index: number }) {
    setNugget((prev) => {
      return {
        ...prev,
        question: {
          ...prev.question,
          fib: {
            ...prev.question.fib,
            english: prev.question.fib?.english.filter(
              (_, i) => i !== Content.index
            ),
          },
        },
      };
    });
  }

  function updateContentItem(
    idx: number,
    item: string,
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG",
    idj?: number,
    bullet?: BulletObject
  ) {
    if (nugget.content && idj != undefined) {
      setNugget((prev) => {
        return {
          ...prev,
          content: prev.content.map((option, i) => {
            if (i == idx) {
              return {
                ...option,
                kind: kind,
                bullet: bullet,
                list: option.list.map((opt, j) => {
                  if (j == idj) {
                    return {
                      ...opt,
                      rtx: item,
                    };
                  } else {
                    return opt;
                  }
                }),
              };
            } else {
              return option;
            }
          }),
        };
      });
    } else if (nugget.content) {
      const obj = { ...nugget };
      obj.content[idx] = { kind: kind, list: [{ rtx: item }] };
      setNugget(obj);
    }
  }

  function updateListItem(
    idi: number,
    item: string,
    kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG",
    idj: number
  ) {
    if (kind == "OL") {
      updateContentItem(idi, item, kind, idj, bullet[idi]);
    } else if (kind == "UL") {
      updateContentItem(idi, item, kind, idj);
    }
  }

  function handleDeleteNoteContent(id: number) {
    setNugget((prev) => {
      return {
        ...prev,
        content: prev.content?.filter((_, i) => i !== id),
      };
    });
  }

  function handleDeleteNoteContentList(idx: number, id: number) {
    setNugget((prev) => {
      return {
        ...prev,
        content: prev.content.map((option, i) => {
          if (i == idx) {
            return {
              ...option,
              list: option.list.filter((_, i) => i !== id),
            };
          } else {
            return option;
          }
        }),
      };
    });
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

  function updateAnswer(Answer: { answer: boolean; text: string }) {
    setNugget((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        bilingual_options: {
          english: [
            {
              text: Answer.text,
              isCorrect: Answer.answer,
            },
            Answer.answer === true
              ? {
                  text: "false",
                  isCorrect: !Answer.answer,
                }
              : {
                  text: "true",
                  isCorrect: !Answer.answer,
                },
          ],
        },
      },
    }));
  }
  function updateCaption(caption: { caption?: string }) {
    setNugget((prev) => ({
      ...prev,
      caption: caption.caption,
    }));
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

  function addFIBOption() {
    const newOption = {
      text: "",
    };
    //debugger;
    if (!nugget.question?.extraOptions?.english)
      setNugget((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          extraOptions: {
            ...prev.question?.extraOptions,
            english: [newOption],
          },
        },
      }));
    else
      setNugget((prev) => ({
        ...prev,
        question: {
          ...prev.question,
          extraOptions: {
            ...prev.question.extraOptions,
            english: [...prev.question.extraOptions?.english, newOption],
          },
        },
      }));
  }

  function deleteFIBOption(Option: { index: number }) {
    setNugget((prev) => {
      return {
        ...prev,
        question: {
          ...prev.question,
          extraOptions: {
            ...prev.question.extraOptions,
            english: prev.question.extraOptions?.english.filter(
              (_, i) => i !== Option.index
            ),
          },
        },
      };
    });
  }

  function updateFIBOption(Option: { index: number; text: string }) {
    setNugget((prev) => {
      const updatedOptions = prev.question.extraOptions?.english
        ? prev.question.extraOptions.english
        : [];
      updatedOptions[Option.index] = {
        text: Option.text,
      };
      return {
        ...prev,
        question: {
          ...prev.question,
          extraOptions: {
            ...prev.question.extraOptions,
            english: updatedOptions,
          },
        },
      };
    });
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
    let errors: any = {};
    if (!values.kind) {
      errors.kind = "Nugget Kind is Empty!";
    }

    if (
      nugget.kind == "SCQ" ||
      nugget.kind == "MCQ" ||
      nugget.kind == "TRUEFALSE"
    )
      errors = validateSCC(values);
    else if (nugget.kind == "FIB") errors = validateFIB(values);
    else if (nugget.kind == "AUDIOCLIP") errors = validateAudio(values);
  }

  function fetchNuggetContent(nuggetId: string) {
    if (!nuggetId) return;
    else {
      fetchNugget([nuggetId]).then((data) => {
        console.log("***Nugget in FetchContent - step 1", data[0]);
        setNugget((prev: Nugget) => ({ ...prev, ...data[0] }));
        filterFunctions.setFilters(data[0].categories);
      });
    }
  }

  function updateLTI(index: number, content: string, coordinates: Coordinates) {
    setNugget((prev) => {
      const updatedLTI = prev.question.lti?.english
        ? prev.question.lti?.english
        : [];
      updatedLTI[index] = {
        value: content,
        coordinates: coordinates,
      };
      return {
        ...prev,
        question: {
          ...prev.question,
          lti: {
            ...prev.question.lti,
            english: updatedLTI,
          },
        },
      };
    });
  }

  function imageLTI(imageURI: { URI: FileObject }) {
    setNugget((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        ltiImage: imageURI.URI,
      },
    }));
  }

  function deleteLTI(index: number) {
    setNugget((prev) => {
      return {
        ...prev,
        question: {
          ...prev.question,
          lti: {
            ...prev.question.lti,
            english: prev.question.lti?.english.filter((_, i) => i !== index),
          },
        },
      };
    });
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
          icon,
          nuggetId,
          contentIcon,
          setNuggetId,
          setBullet,
          updateNuggetInfoHeader,
          updateNuggetInfoKnowledgeCap,
          updateNuggetInfoSideNote,
          updateXPTimer,
          updateAnswer,
          updateSolHint,
          updateQuestion,
          updateCaption,
          updateFileObj,
          updateHeaderIcon,
          updateCorrectOption,
          addSCQOption,
          deleteSCQOption,
          updateSCQOption,
          updateContentKind,
          addContentItem,
          updateContentItem,
          updateListItem,
          handleDeleteNoteContent,
          handleDeleteNoteContentList,
          addFIBContent,
          addFIBOption,
          updateFIBOption,
          deleteFIBOption,
          updateFIBContentType,
          updateFIBContentText,
          deleteFIBContent,
          updateVideoNugget,
          imageURI,
          audioURI,
          submit,
          setSubmit,
          validateErrors,
          fetchNuggetContent,
          addListItem,
          updateLTI,
          imageLTI,
          deleteLTI,
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

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

const initialState = {} as INuggetContext;

export const NuggetsContext = React.createContext<INuggetContext>(initialState);

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
        // ...state.nugget,
        kind: nuggetkind,
      } as Nugget,
    });
  }

  function updateNuggetInfo(NuggetInfo: {
    headerTitle?: string;
    sideNote?: string;
    isKnowledgeCap?: boolean;
  }) {
    setState(prevState => ({
      ...prevState,
      nugget: {
        ...prevState.nugget,
        headerTitle: NuggetInfo.headerTitle !== undefined ? NuggetInfo.headerTitle : prevState.nugget.headerTitle,
        sideNote: NuggetInfo.sideNote !== undefined ? NuggetInfo.sideNote : prevState.nugget.sideNote,
        IsKnowledgeCap: NuggetInfo.isKnowledgeCap !== undefined ? NuggetInfo.isKnowledgeCap : prevState.nugget.IsKnowledgeCap,
      },
    }));
  
    // setState(prevState => ({
    //   ...prevState,
    //   nugget:{
    //     ...prevState.nugget,
    //     headerTitle: NuggetInfo.headerTitle,
    //     sideNote: NuggetInfo.sideNote,
    //     IsKnowledgeCap: NuggetInfo.isKnowledgeCap,
    //   }
    // }))
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
          nuggetKind,
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
        }}
      >
        {props.children}
      </NuggetsContext.Provider>
    </div>
  );
};

export default NuggetProvider;

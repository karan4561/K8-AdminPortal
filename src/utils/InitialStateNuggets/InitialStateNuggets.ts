export const initialStateSCC = {
  categories: [],
  kind: "SCQ",
  question: {
    bilingual_options: {
      english: [
        {
          text: "",
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

export const initialStateNOTE = {
  categories: [],
  kind: "NOTE",
  content: [{
    kind: "H1",
    list: [{rtx: ""}]
  }],
} as any

export const initialStateFIB = {
  categories: [],
  kind: "SCQ",
  question: {
    bilingual_options: {
      english: [
        {
          text: "",
        },
      ],
    },
    fib: {
        english: [{
            value: ""
        }]
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
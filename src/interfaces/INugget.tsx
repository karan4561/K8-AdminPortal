export type Nugget = {
  _id: string;
  kind: string;
  reward: number;
  IsKnowledgeCap?: boolean;
  sideNote?: string;
  headerTitle?: string;
  headerIcon?: FileObject;
  timeToReward: number;
  thumbnail?: FileObject;
  imageURI?: FileObject;
  audioURI?: FileObject;
  videoURI?: string;
  caption?: string;
  status: "active" | "inactive";
  question: QuestionObject;
  content?: ContentObject[];
  categories: CategoryObject;
  updatedAt: Date;
  createdAt: Date;
};

export interface CategoryObject {
  categoryId: string;
  subjectId: string;
  chapterId: string;
  topicId?: string;
}

export interface ListItemObject {
  rtx: string;
}

export type BulletObject = {
  value: string;
  prefix: string;
  suffix: string;
  color: string;
};

export interface ContentObject {
  kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG";
  icon?: FileObject;
  imgUri?: FileObject;
  imgCaption?: string;
  bullet?: BulletObject;
  list?: ListItemObject[];
}

export interface FileObject {
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
}

export interface QuestionObject {
  content: {
    english: string;
    hindi?: string;
    default?: string;
  };
  bilingual_options: {
    english: {
      text: string;
      id: string; //backend
      isCorrect: boolean;
    }[];
    hindi: {
      text: string;
      id: string;
      isCorrect: boolean;
    }[];
    default: {
      text: string;
      id: string;
      isCorrect: boolean;
    }[];
  };
  lti: {
    english: {
      value: string;
      id: string;
      coordinates: {
        x: number;
        y: number;
      };
    }[];
    hindi: {
      value: string;
      id: string;
      coordinates: {
        x: number;
        y: number;
      };
    }[];
    default: {
      value: string;
      id: string;
      coordinates: {
        x: number;
        y: number;
      };
    }[];
  };
  ltiImage: FileObject;
  fib: {
    english: {
      value: string;
      id: string;
      type: string;
      valueArr: string[];
    }[];
    hindi: {
      value: string;
      id: string;
      type: string;
      valueArr: string[];
    }[];
    default: {
      value: string;
      id: string;
      type: string;
      valueArr: string[];
    }[];
  };
  extraOptions: {
    english: {
      text: string;
      id: string;
    }[];
    hindi: {
      text: string;
      id: string;
    }[];
    default: {
      text: string;
      id: string;
    }[];
  };
  solutions: {
    english: {
      hint?: string;
      text?: string;
      otherSolutions?: string;
      videoSolutions?: string;
    };
    hindi: {
      hint: string;
      text: string;
      otherSolutions: string;
      videoSolutions: string;
    };
    default: {
      hint?: string;
      text?: string;
      otherSolutions?: string;
      videoSolutions?: string;
    };
  }[];
  answer: {
    english: string;
    hindi: string;
    default: string;
  };
}

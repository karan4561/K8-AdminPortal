import { Nugget, ContentObject, CategoryObject, BulletObject, ListItemObject, QuestionObject, FileObject } from "src/interfaces/INugget";
interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}

//update any info

export interface INuggetContext extends FilterFunctions {
    nugget:Nugget,
    setNugget: any,
    bullet?: BulletObject,
    setBullet?: React.Dispatch<React.SetStateAction<BulletObject|undefined>>,
    list:Array<string>,
    setList?: any,
    ques?: QuestionObject 
    updateNuggetKind?: any,
    setQues?: React.Dispatch<React.SetStateAction<QuestionObject|undefined>>
    updateNuggetInfoHeader: (headerTitle:string) => void,
    updateNuggetInfoSideNote: (sideNote: string) => void,
    updateNuggetInfoKnowledgeCap: (isKnowledgeCap: boolean) => void,
    updateCategoryObject?: (Category: {Category: string,Chapter: string,Subject:string,Topic?:string})=>void,
    updateXPTimer: (XPTimer: {reward: number, timeToReward: number}) => void,
    updateContentKind?: (kind: {kind: 'H1' | 'H2' | 'Text' | 'UL' | 'OL' | 'IMG'}) => void,
    updateCaption: (caption: {caption?:string})=>void
    updateSolHint: (SolHint: {text?:string,hint?:string})=>void,
    updateFileObj: (FileObj: {id?: string;name?: string;baseUrl: string;key: string;type?:| "CONTENT"| "TEST"| "SUBJECTIVE_TEST_SOLUTIONS"| "VIMEO"| "JWPLAYER";organization?: string;size?: number;details?: string;})=>void
    updateCorrectOption : (Option: {isCorrect: boolean; index: number})=>void,
    addSCQOption: ()=>void,
    deleteSCQOption: (Option: {index:number})=>void,
    updateSCQOption: (Option: {index:number; text:string})=>void,
    updateImageCaption?: (caption: {imgCaption:string})=>void
    updateQuestion?: (question: { english: string })=>void,
    updateAnswer: (Answer:{ answer:boolean}) =>void,
    handleDeleteNoteContent?:any,
    updateContentItem?: any,
    addContentItem?: any,
    addListItem?: any,
    updateListItem?: any,
    submit:boolean,
    setSubmit:React.Dispatch<React.SetStateAction<boolean>>,
    formErrors:any,
    setFormErrors:any
    validateErrors?: (values: Nugget)=>any,
    fetchNuggetContent: any
}

interface FilterFunctions {
  selectCategory: (idx: number, categoryId: string) => void;
  selectSubject: (idx: number, subjectId: string) => void;
  selectChapter: (idx: number, chapterId: string) => void;
  selectTopic: (idx: number, topicId: string) => void;
  deleteFilter: (idx: number) => void;
  addFilter: () => void;
}
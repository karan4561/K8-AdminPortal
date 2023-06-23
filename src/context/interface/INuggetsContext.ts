import { Nugget, ContentObject, CategoryObject, BulletObject, ListItemObject, QuestionObject, FileObject, Coordinates } from "src/interfaces/INugget";
interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}

//update any info

export interface INuggetContext extends FilterFunctions {
    icon: FileObject[] | undefined,
    nugget:Nugget,
    setNugget: any,
    bullet?: BulletObject[],
    setBullet?: React.Dispatch<React.SetStateAction<BulletObject[]>>,
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
    updateFileObj: (FileObj: {_id?: string; name?: string; baseUrl: string; key: string; type?: | "CONTENT" | "TEST"| "SUBJECTIVE_TEST_SOLUTIONS"| "VIMEO"| "JWPLAYER"; organization?: string; size?: number; details?: string;}[])=>void
    updateCorrectOption : (Option: {isCorrect: boolean; index: number})=>void,
    addSCQOption: ()=>void,
    deleteSCQOption: (Option: {index:number})=>void,
    updateSCQOption: (Option: {index:number; text:string})=>void,
    updateImageCaption?: (caption: {imgCaption:string})=>void
    updateHeaderIcon?: (iconObj: { _id?: string; name?: string; baseUrl: string; key: string; type?: | "CONTENT" | "TEST" | "SUBJECTIVE_TEST_SOLUTIONS" | "VIMEO" | "JWPLAYER"; organization?: string; size?: number; details?: string; }) => void,
    updateFIBContentType?: (Content: { index: number; type: string }) => void,
    updateFIBContentText?: (Content: { index: number; text: string }) => void,
    addFIBContent?: () => void
    deleteFIBContent?: (Content: { index: number }) => void,
    updateFIBOption: (Option: { index: number; text: string }) =>void,
    deleteFIBOption: (Option: { index: number }) =>void,
    addFIBOption: () =>void,
    updateQuestion?: (question: { english: string })=>void,
    updateAnswer: (Answer:{ answer:boolean, text:string}) =>void,
    handleDeleteNoteContent?:(id: number)=>void,
    handleDeleteNoteContentList?:(idx: number, id: number)=>void,
    updateContentItem?: (idx: number, item: string, kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG", idj?: number, bullet?: BulletObject)=>void,
    addContentItem?: (note: ContentObject)=>void,
    contentIcon:(imageURI: { URI: FileObject, index: number }) =>void,
    addListItem?: (idx: number, list: ListItemObject)=>void,
    updateVideoNugget:(video: {videoURI?: string,videoCaption?:string})=>void
    imageURI:(imageURI:{URI:FileObject})=>void
    audioURI:(audioURI:{URI:FileObject}) =>void
    updateListItem?: (idi: number, item: string, kind: "H1" | "H2" | "Text" | "UL" | "OL" | "IMG", idj: number)=>void,
    submit:boolean,
    setSubmit:React.Dispatch<React.SetStateAction<boolean>>,
    nuggetId?:string,
    setNuggetId?:React.Dispatch<React.SetStateAction<string | undefined>>,
    // formErrors:any,
    // setFormErrors:any
    validateErrors?: (values: Nugget)=>any,
    updateLTI:(index: number, content: string, coordinates: Coordinates)=>void,
    imageLTI: (imageURI: { URI: FileObject })=>void,
    deleteLTI: (index: number)=> void,
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
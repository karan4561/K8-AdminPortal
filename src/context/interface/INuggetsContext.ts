import { Nugget,ContentObject,CategoryObject,BulletObject,ListItemObject,QuestionObject } from "src/interfaces/INugget";
interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}
export interface INuggetContext {
    test:Nugget,
    setTest: any,
    nuggetKind?: string; 
    setNuggetKind: React.Dispatch<React.SetStateAction<string>>
    note?: ContentObject;
    setNote?: any
    content?: ContentObject[];
    nugget?: Nugget,
    CategoryObj?: CategoryObject,
    bullet?: BulletObject,
    setBullet?: React.Dispatch<React.SetStateAction<BulletObject|undefined>>,
    questionObj?:QuestionObject,
    kind?:string,
    list?:Array<string>,
    setList?: any,
    ques?: QuestionObject 
    setQues?: React.Dispatch<React.SetStateAction<QuestionObject|undefined>>
    // solutionObj: QuestionObject
    // content: ContentObject,
    updateOlBullet?: (bullet: {value:string,prefix: string, suffix: string}) => void,
    updateNuggetInfo: (NuggetInfo: {headerTitle?:string,sideNote?: string, isKnowledgeCap?: boolean}) => void,
    updateBulletColor?: (bulletcolor: {color:string}) => void,
    updateCategoryObject: (Category: {Category: string,Chapter: string,Subject:string,Topic?:string})=>void,
    updateKind?: (nuggetkind: string)=>void,
    updateXPTimer: (XPTimer: {reward: number, timeToReward: number}) => void,
    updateContentKind?: (kind: {kind: 'H1' | 'H2' | 'Text' | 'UL' | 'OL' | 'IMG'}) => void,
    addItemToList?: (list: ListItemObject[], item: {rtx: string})=> void
    updateImageCaption?: (caption: {imgCaption:string})=>void
    updateVideoNugget?: (videoNugget: {videoCaption:string, videoURI: string})=>void,
    updateTFQuestion?: (question: {question:string,hindi?: string;default?: string;}) =>void,
    updateTFSolution?: (Solution: {text?:string,otherSolutions?: string,videoSolutions?: string;}) =>void,
    updateTFHint?: (Hint:{ hint?:string}) =>void,
    updateTFAnswer?: (Answer:{ answer:string}) =>void,
    handleDeleteNoteContent?:any,
    updateContentItem?: any,
    addContentItem?: any,
    addListItem?: any,
    updateListItem?: any,
    addFIBItem: any,
    updateFIBItem: any,
}

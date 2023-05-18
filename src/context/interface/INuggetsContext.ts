import { Nugget,ContentObject,CategoryObject,BulletObject,ListItemObject,QuestionObject } from "src/interfaces/INugget";
interface FIB {
  value?: string;
  type: "TEXT" | "BLANK";
}
export interface INuggetContext {

    // nuggetKind: string;
    // setNuggetKind: React.Dispatch<React.SetStateAction<string>>
    // content?: ContentObject;
    // nugget: Nugget,
    // CategoryObj?: CategoryObject,
    // bullet?: BulletObject,
    // questionObj?:QuestionObject,
    // kind?:string

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
    updateNuggetKind?: any,
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

    //addListItem?: (item: {rtx: string})=> void
    updateCaption: (caption: {caption?:string})=>void
    //updateVideoNugget: (videoNugget: {videoCaption?:string, videoURI?: string})=>void,
    //updateTFQuestion: (question: {english:string}) =>void,
    updateSolHint: (SolHint: {text?:string,hint?:string})=>void,
    //updateTFAnswer: (Answer:{ answer:string}) =>void,
    updateFileObj: (FileObj: {id?: string;name?: string;baseUrl: string;key: string;type?:| "CONTENT"| "TEST"| "SUBJECTIVE_TEST_SOLUTIONS"| "VIMEO"| "JWPLAYER";organization?: string;size?: number;details?: string;})=>void
    updateOption: (Option :{ option: { text: string; }[]})=>void
    updateCorrectOption : (Option: {isCorrect: boolean; index: number})=>void,
    addSCQOption: ()=>void,
    deleteSCQOption: (Option: {index:number})=>void,
    updateSCQOption: (Option: {index:number; text:string})=>void,

    updateImageCaption?: (caption: {imgCaption:string})=>void
    updateVideoNugget?: (videoNugget: {videoCaption:string, videoURI: string})=>void,
    updateQuestion?: (question: { english: string })=>void,
    updateSolution?: (Solution: {text?:string,otherSolutions?: string,videoSolutions?: string;}) =>void,
    updateHint?: (Hint:{ hint?:string}) =>void,
    updateAnswer?: (Answer:{ answer:string}) =>void,
    handleDeleteNoteContent?:any,
    updateContentItem?: any,
    addContentItem?: any,
    addListItem?: any,
    updateListItem?: any,
    addFIBItem: any,
    updateFIBItem: any,

}

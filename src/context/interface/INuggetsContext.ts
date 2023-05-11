import { Nugget,ContentObject,CategoryObject,BulletObject,ListItemObject,QuestionObject } from "src/interfaces/INugget";

export interface INuggetContext {
    nuggetKind: string;
    setNuggetKind: React.Dispatch<React.SetStateAction<string>>
    content?: ContentObject;
    nugget: Nugget,
    CategoryObj?: CategoryObject,
    bullet?: BulletObject,
    questionObj?:QuestionObject,
    kind?:string
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
    addListItem?: (item: {rtx: string})=> void
    updateImageCaption?: (caption: {imgCaption:string})=>void
    updateVideoNugget?: (videoNugget: {videoCaption:string, videoURI: string})=>void,
    updateTFQuestion?: (question: {question:string,hindi?: string;default?: string;}) =>void,
    updateTFSolution?: (Solution: {text?:string,otherSolutions?: string,videoSolutions?: string;}) =>void,
    updateTFHint?: (Hint:{ hint?:string}) =>void,
    updateTFAnswer?: (Answer:{ answer:string}) =>void,
}

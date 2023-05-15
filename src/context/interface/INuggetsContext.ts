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
    updateCaption: (caption: {caption?:string})=>void
    updateVideoNugget: (videoNugget: {videoCaption?:string, videoURI?: string})=>void,
    updateTFQuestion: (question: {english:string}) =>void,
    updateTFSolHint: (SolHint: {text?:string,hint?:string})=>void,
    updateTFAnswer: (Answer:{ answer:string}) =>void,
    updateFileObj: (FileObj: {id?: string;name?: string;baseUrl: string;key: string;type?:| "CONTENT"| "TEST"| "SUBJECTIVE_TEST_SOLUTIONS"| "VIMEO"| "JWPLAYER";organization?: string;size?: number;details?: string;})=>void
    updateOption: (Option :{ option: { text: string; }[]})=>void
    updateCorrectOption : (Option: {isCorrect: boolean; index: number})=>void
}
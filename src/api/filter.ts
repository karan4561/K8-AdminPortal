import { get } from "./api";

async function getCategory() {
    const response = await get(process.env.NEXT_PUBLIC_QBG_BASE_URL+"/category-configuration");
    return response.data;
}

async function getSubject(category_id: string) {
    const response = await get(process.env.NEXT_PUBLIC_QBG_BASE_URL+"/subjects/v2",{params:{category_id}});
    return response.data;
}

async function getChapters(category_id: string, subject_id: string) {
    const response= await get(process.env.NEXT_PUBLIC_QBG_BASE_URL+"/chapters/v2",{params:{category_id,subject_id}});
    return response.data;
}

async function getTopics(category_id: string, subject_id: string, chapter_id: string){
    const response= await get(process.env.NEXT_PUBLIC_QBG_BASE_URL+"/topics",{params:{category_id,subject_id,chapter_id}});
    return response.data;
}

export {getCategory, getSubject,getTopics,getChapters}
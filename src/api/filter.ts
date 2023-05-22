import { get } from "./api";

async function getCategory() {
    const response = await get("/category-configuration");
    return response.data;
}

async function getSubject(category_id: string) {
    const response = await get("/subjects/v2",{params:{category_id}});
    return response.data;
}

async function getChapters(category_id: string, subject_id: string) {
    const response= await get("/chapters/v2",{params:{category_id,subject_id}});
    return response.data;
}

async function getTopics(category_id: string, subject_id: string, chapter_id: string){
    const response= await get("/topics",{params:{category_id,subject_id,chapter_id}});
    return response.data;
}

export {getCategory, getSubject,getTopics,getChapters}
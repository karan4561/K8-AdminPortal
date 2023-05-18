import { get } from "./api";

async function getCategory() {
    const response = await get("/category-configuration");
    return response.data;
}

async function getSubject(category_id: string) {
    const response = await get("/subjects/v2",{params:{category_id}});
    return response.data;
}

function getChapters(category_id: string, subject_id: string) {

}

function getTopics(category_id: string, subject_id: string, chapter_id: string){

}

export {getCategory, getSubject}
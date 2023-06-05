import { Nugget } from "@/interfaces/INugget";
import { get, post } from "./api";
export async function getHeaderIcons(){
    const response= await get("/v3/admin/pitara/icons");
    return response.data;
}

export async function submitNugget(nugget: Nugget){
    const response = await post("/v3/admin/pitara/nuggets",nugget);
    console.log("*******API Testing:************",nugget);
    return response.data;
}

export async function getNuggetList(pagination: number, experienceSearch: boolean, categoryId: string, subjectId: string, chapterId: string, topicId?: string, status?:boolean){
    const response = await get("/v3/admin/pitara/nuggets/search?",{
        params:{pagination, experienceSearch, categoryId, subjectId, chapterId, topicId, status},
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9876d5be7957d6d516fb571e9ac850757116af9cb7a8f98354b1b45835c8f6d'}
    });
    return response.data;
}

export async function fetchNugget(list: string[]){
    const response = await get("/v3/admin/pitara/nuggets/metadata?",{
        params:{list},
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9876d5be7957d6d516fb571e9ac850757116af9cb7a8f98354b1b45835c8f6d'}
    })
    return response.data;
}

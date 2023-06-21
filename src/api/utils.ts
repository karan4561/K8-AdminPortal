import { Nugget,FileObject } from "@/interfaces/INugget";
import { deleteApi, get, post, put, post1} from "./api";
export async function getHeaderIcons(){
    const response= await get("/v3/admin/pitara/icons");
    return response.data;
}

export async function uploadImage(image:any){
    const response = await post1("/v1/admin/files",image);
    return response.data;
}

export async function postImage(FileObject: FileObject){
    const response = await post("/v3/admin/pitara/icons",FileObject);
    return response.data;
}

export async function submitNugget(nugget: Nugget){
    const response = await post("/v3/admin/pitara/nuggets",nugget);
    //console.log("*******API Testing:************",nugget);
    return response.data;
}

export async function updateNugget(nugget: Nugget,nuggetId: string){
    const response = await put("/v3/admin/pitara/nuggets/"+nuggetId+"/update",nugget);
    //console.log("*******API Testing:************",nugget);
    return response.data;
}

export async function getNuggetList(pagination: number, experienceSearch: boolean, categoryId: string, subjectId: string, chapterId: string, topicId?: string, status?:boolean){
    const response = await get("/v3/admin/pitara/nuggets/search?",{
        params:{pagination, experienceSearch, categoryId, subjectId, chapterId, topicId, status},
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'}
    });
    return response.data;
}

export async function fetchNugget(list: string[]){
    const response = await get("/v3/admin/pitara/nuggets/metadata?",{
        params:{list},
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'}
    })
    return response.data;
}

export async function deleteNugget(nuggetId: string){
    const response = await deleteApi("/v3/admin/pitara/nuggets/"+nuggetId,{
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'}
    });
    //console.log("*******API Testing:************",nugget);
    return response.data;
}

import { Nugget } from "@/interfaces/INugget";
import { get } from "./api";
export async function getHeaderIcons(){
    const response= await get("/v3/admin/pitara/icons");
    return response.data;
}

export async function submitNugget(nugget: Nugget){
    console.log("API Testing:",nugget);
}
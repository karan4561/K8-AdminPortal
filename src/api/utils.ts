import { Nugget } from "@/interfaces/INugget";
import { get, post } from "./api";
export async function getHeaderIcons(){
    const response= await get("/v3/admin/pitara/icons");
    return response.data;
}

export async function submitNugget(nugget: Nugget){
    const response =await post("/v3/admin/pitara/nuggets",nugget);
    console.log("nuggetapi",nugget);
    return response.data;
}
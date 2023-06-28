import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

async function get(url: string, data?: any) {
  const response = await axiosClient.get(url, {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9d58891870dd712dd1641508592f632148e4f0681ae5bbd00ed01f7147d83a3'},
    ...data,
  })
  return response.data
}

async function deleteApi(url: string, data?: any) {
  const response = await axiosClient.delete(url, data)
  return response.data
}

async function post(url: string, data: any) {
  const response = await axiosClient.post(url, data , {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9d58891870dd712dd1641508592f632148e4f0681ae5bbd00ed01f7147d83a3'}
  })
  return response.data
}

async function post1(url: string, data: any) {
  const response = await axiosClient.post(url, data , {
    headers: { 'Content-Type': 'multipart/form-data',"Accept": "*/*" , 'Authorization': 'Bearer a9d58891870dd712dd1641508592f632148e4f0681ae5bbd00ed01f7147d83a3'}
  })
  return response.data
}

async function put(url: string, data: any) {
  const response = await axiosClient.put(url, data , {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9d58891870dd712dd1641508592f632148e4f0681ae5bbd00ed01f7147d83a3'}
  })
  return response.data
}

export { get, post, put, deleteApi, post1 }
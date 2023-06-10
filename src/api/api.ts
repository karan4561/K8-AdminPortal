import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

async function get(url: string, data?: any) {
  const response = await axiosClient.get(url, {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer f8eae9e3980c011c312b12c1eb611861b3cd1380a01a19299714fd106d5ae258'},
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
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer f8eae9e3980c011c312b12c1eb611861b3cd1380a01a19299714fd106d5ae258'}
  })
  return response.data
}

async function post1(url: string, data: any) {
  const response = await axiosClient.post(url, data , {
    headers: { 'Content-Type': 'multipart/form-data',"Accept": "*/*" , 'Authorization': 'Bearer f8eae9e3980c011c312b12c1eb611861b3cd1380a01a19299714fd106d5ae258'}
  })
  return response.data
}

async function put(url: string, data: any) {
  const response = await axiosClient.put(url, data , {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer f8eae9e3980c011c312b12c1eb611861b3cd1380a01a19299714fd106d5ae258'}
  })
  return response.data
}

export { get, post, put, deleteApi, post1 }
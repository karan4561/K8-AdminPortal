import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

async function get(url: string, data?: any) {
  const response = await axiosClient.get(url, {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'},
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
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'}
  })
  return response.data
}

async function post1(url: string, data: any) {
  const response = await axiosClient.post(url, data , {
    headers: { 'Content-Type': 'multipart/form-data',"Accept": "*/*" , 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'}
  })
  return response.data
}

async function put(url: string, data: any) {
  const response = await axiosClient.put(url, data , {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bed8a7991d551ec0068227bcceb2319286c8f8a41a17e90121d3e239de12bf42'}
  })
  return response.data
}

export { get, post, put, deleteApi, post1 }
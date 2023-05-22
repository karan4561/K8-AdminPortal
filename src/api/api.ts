import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
console.log(".......url......", process.env.NEXT_PUBLIC_BASE_URL)

async function get(url: string, data?: any) {
  const response = await axiosClient.get(url, data)
  // console.log(".....response.......", response.data);
  return response.data
}

async function post(url: string, data: any) {
  const response = await axiosClient.post(url, {
    data: data,
    headers: { 'Content-Type': 'application/json' }
  })
  // console.log(".....response.......", response.data);
  return response.data
}

export { get, post };
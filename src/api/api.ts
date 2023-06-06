import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

async function get(url: string, data?: any) {
  const response = await axiosClient.get(url, data)
  return response.data
}

async function post(url: string, data: any) {
  const response = await axiosClient.post(url, data , {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9876d5be7957d6d516fb571e9ac850757116af9cb7a8f98354b1b45835c8f6d'}
  })
  return response.data
}

async function put(url: string, data: any) {
  const response = await axiosClient.put(url, data , {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer a9876d5be7957d6d516fb571e9ac850757116af9cb7a8f98354b1b45835c8f6d'}
  })
  return response.data
}
export { get, post, put }
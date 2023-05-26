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
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ce659f944b730a89fa1010840459842cb6ea1e930792b2f3fca2c02909890935'}
  })
  return response.data
}
export { get, post };
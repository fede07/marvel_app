import axios from "axios"
import { Md5 } from "ts-md5"

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_PUBLIC_KEY
const API_SECRET = import.meta.env.VITE_PRIVATE_KEY

const ts = Date.now()
const hash = Md5.hashStr(ts + API_SECRET + API_KEY)

export const fetchData = async (endpoint: string, params = {}) => {

  console.log("API CALLED!!")

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        ...params,
        apikey: API_KEY,
        ts: ts,
        hash: hash,
      }
    })
    console.log("Response: ", response)
    return response.data.data
  } catch (error) {
    console.log("Error fetching data: ", error)
    throw error
  }
}

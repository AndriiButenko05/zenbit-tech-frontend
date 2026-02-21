import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_RENDER_API_URL,
});

import type { ApplicationData, Property } from "../types/property";
import { api } from "./api";
export const fetchProperties = async (): Promise<Property[]> => {
  const response = await api.get<Property[]>("/properties");
  return response.data;
};
export const sendApplication = async (data: ApplicationData) => {
  const response = await api.post("/applications", data);
  return response.data;
};

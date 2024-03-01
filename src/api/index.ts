import { BASE_URL } from "@/constants";
import axios from "axios";

export const configuredAxios = axios.create({
  baseURL: BASE_URL,
});

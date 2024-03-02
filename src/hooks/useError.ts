import { AxiosError } from "axios";
import { ErrorMessageType } from "types";

export const useError = (error: AxiosError<ErrorMessageType>) => {
  const status = error?.response?.status || null;
  const message = error?.response?.data?.message || "Неизвестная ошибка";
  return { status, message };
};
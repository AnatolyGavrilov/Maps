
import { AxiosError } from "axios";
import { useError } from "hooks/useError";
import { ErrorMessageType } from "types";

export const HandleError = (error: unknown) => {
  const { status, message } = useError(error as AxiosError<ErrorMessageType>);

  return {
    status,
    message,
  };
};

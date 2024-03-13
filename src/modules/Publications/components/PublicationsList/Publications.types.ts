import { IPublication } from "modules/Publications/types";

export interface IPublicationsProps {
  publications: IPublication[];
  userId: string | undefined;
}

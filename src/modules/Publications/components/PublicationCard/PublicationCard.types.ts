import { IPublication } from "modules/Publications/types";

export interface IPublicationCardProps {
  publication: IPublication;
  userId: string | undefined;
}

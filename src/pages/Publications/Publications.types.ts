import { IPublication } from "modules/Publications/types";

interface IPost {
  data: IPublication[];
}

interface IUser {
  posts: IPost;
}

export interface IPublicationsCache {
  user: IUser;
}

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

interface ICreatePost {
  id: string;
  body: string;
  string: string;
}
interface ICreatePostResponse {
  createPost: ICreatePost;
}
export interface IDataForCacheUpdate {
  data: ICreatePostResponse;
}

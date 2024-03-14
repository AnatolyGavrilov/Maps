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
  title: string;
}
export interface ICreatePostResponse {
  createPost: ICreatePost;
}

export interface IInput {
  title: string;
  body: string;
}

export interface IVariables {
  input: IInput;
}

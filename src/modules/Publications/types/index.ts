export interface IPublication {
  id: string;
  title: string;
  body: string;
}

export interface IPublicationInitialState {
  publications: IPublication[];
}

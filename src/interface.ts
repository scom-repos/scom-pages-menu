export interface IPageData {
  uuid: string;
  name: string;
  cid?: string;
  url?: string;
  pages?: IPageData[];
}

export interface IPagesMenu {
  pages: IPageData[]
}
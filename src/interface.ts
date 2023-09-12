export interface IPageData {
  name: string;
  cid?: string;
  url?: string;
  pages?: IPageData[];
}

export interface IPagesMenu {
  pages: IPageData[]
}
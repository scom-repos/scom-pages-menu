export interface IPageData {
  uuid: string;
  name: string;
  pages?: IPageData[];
}

export interface IPagesMenu {
  pages: IPageData[]
}
export interface IPagesMenuItem {
  uuid: string;
  name: string;
  url: string;
  pages?: IPagesMenuItem[];
}

export interface IPagesMenu {
  pages: IPagesMenuItem[]
}
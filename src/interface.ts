export interface IPagesMenuItem {
  uuid: string;
  name: string;
  url: string;
  show: boolean;
  pages?: IPagesMenuItem[];
}

export interface IPagesMenu {
  pages: IPagesMenuItem[]
}
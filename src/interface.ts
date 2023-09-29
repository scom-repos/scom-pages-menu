export interface IPagesMenuItem {
  uuid: string;
  name: string;
  pages?: IPagesMenuItem[];
}

export interface IPagesMenu {
  pages: IPagesMenuItem[]
}
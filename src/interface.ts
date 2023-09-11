export interface Page {
  name: string;
  cid?: string;
  url?: string;
  pages?: Page[];
}

export interface Tutorial {
  pages: Page[]
}
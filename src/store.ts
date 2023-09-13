import { IPageData, IPagesMenu } from './interface'

export class PagesObject {
    private _data: IPagesMenu = {
        pages: []
    };

    get data() {
        return this._data;
    }

    set data(value: IPagesMenu) {
        this._data = value;
    }

    getPage(id: string, currentPage?: IPageData): IPageData | undefined {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (const page of this._data.pages) {
                const result = this.getPage(id, page);
                if (result) {
                    return result;
                }
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.uuid === id) {
                return currentPage;
            }

            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (const subPage of currentPage.pages) {
                    const result = this.getPage(id, subPage);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        return undefined; // Page not found
    }

    setPage(
        id: string,
        newName?: string,
        newCid?: string,
        newPages?: IPageData[],
        currentPage?: IPageData
    ): boolean {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (const page of this._data.pages) {
                if (this.setPage(id, newName, newCid, newPages, page)) {
                    return true; // Page found and updated
                }
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.uuid === id) {
                if (newName !== undefined) {
                    currentPage.name = newName;
                }
                if (newCid !== undefined) {
                    currentPage.cid = newCid;
                }
                if (newPages !== undefined) {
                    currentPage.pages = newPages;
                }
                return true; // Page found and updated
            }

            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (const subPage of currentPage.pages) {
                    if (this.setPage(id, newName, newCid, newPages, subPage)) {
                        return true; // Page found and updated
                    }
                }
            }
        }

        return false; // Page not found
    }

    addPage(parentId: string, newPage: IPageData): boolean {
        const parent = this.getPage(parentId);

        if (parent) {
            if (!parent.pages) {
                parent.pages = [];
            }
            parent.pages.push(newPage);
            return true; // Page added to parent
        }

        return false; // Parent page not found
    }

    deletePage(id: string, currentPage?: IPageData, parent?: IPageData): boolean {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (let i = 0; i < this._data.pages.length; i++) {
                if (this.deletePage(id, this._data.pages[i])) {
                    return true; // Page found and deleted
                }
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.uuid === id) {
                if (parent && parent.pages) {
                    const index = parent.pages.findIndex((page) => page.uuid === id);
                    if (index !== -1) {
                        parent.pages.splice(index, 1); // Remove the page from its parent
                        return true; // Page found and deleted
                    }
                }
            }

            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (let i = 0; i < currentPage.pages.length; i++) {
                    if (this.deletePage(id, currentPage.pages[i], currentPage)) {
                        return true; // Page found and deleted
                    }
                }
            }
        }
        return false; // Page not found
    }
}

export const pagesObject = new PagesObject();

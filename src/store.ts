import { IPagesMenuItem, IPagesMenu } from './interface'

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

    getPage(uuid: string, currentPage?: IPagesMenuItem): IPagesMenuItem | undefined {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (const page of this._data.pages) {
                const result = this.getPage(uuid, page);
                if (result) {
                    return result;
                }
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.uuid === uuid) {
                return currentPage;
            }

            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (const subPage of currentPage.pages) {
                    const result = this.getPage(uuid, subPage);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        return undefined; // Page not found
    }

    setPage(
        uuid: string,
        newName?: string,
        newCid?: string,
        newShow?: boolean,
        newPages?: IPagesMenuItem[],
        currentPage?: IPagesMenuItem
    ): boolean {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (const page of this._data.pages) {
                if (this.setPage(uuid, newName, newCid, newShow, newPages, page)) {
                    return true; // Page found and updated
                }
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.uuid === uuid) {
                if (newName !== undefined) {
                    currentPage.name = newName;
                }
                if (newShow !== undefined) {
                    currentPage.show = newShow;
                }
                if (newPages !== undefined) {
                    currentPage.pages = newPages;
                }
                return true; // Page found and updated
            }

            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (const subPage of currentPage.pages) {
                    if (this.setPage(uuid, newName, newCid, newShow, newPages, subPage)) {
                        return true; // Page found and updated
                    }
                }
            }
        }

        return false; // Page not found
    }

    addPage(newPage: IPagesMenuItem, parentId?: string, index?: number): boolean {

        if (parentId) {
            const parent = this.getPage(parentId);

            if (parent) {
                if (!parent.pages) {
                    parent.pages = [];
                }
                if (index !== undefined && index >= 0 && index <= this._data.pages.length) parent.pages.splice(index, 0, newPage);
                else parent.pages.push(newPage);
                return true; // Page added to parent
            } else {
                return false; // Page not found
            }

        } else {
            if (index !== undefined && index >= 0 && index <= this._data.pages.length) this._data.pages.splice(index, 0, newPage);
            else this._data.pages.push(newPage);
            return true; // Page added to parent
        }
    }

    deletePage(uuid: string, currentPage?: IPagesMenuItem, parent?: IPagesMenuItem): boolean {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (let i = 0; i < this._data.pages.length; i++) {
                if (this.deletePage(uuid, this._data.pages[i])) {
                    return true; // Page found and deleted
                }
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.uuid === uuid) {
                if (parent && parent.pages) {
                    const index = parent.pages.findIndex((page) => page.uuid === uuid);
                    if (index !== -1) {
                        parent.pages.splice(index, 1); // Remove the page from its parent
                        return true; // Page found and deleted
                    }
                } else if (!parent) {
                    // If there is no parent, it means we are deleting a top-level page
                    const index = this._data.pages.findIndex((page) => page.uuid === uuid);
                    if (index !== -1) {
                        this._data.pages.splice(index, 1); // Remove the top-level page
                        return true; // Page found and deleted
                    }
                }
            }

            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (let i = 0; i < currentPage.pages.length; i++) {
                    if (this.deletePage(uuid, currentPage.pages[i], currentPage)) {
                        return true; // Page found and deleted
                    }
                }
            }
        }
        return false; // Page not found
    }

    getPageByURL(url: string, excludedUUID: string[], currentPage?: IPagesMenuItem): IPagesMenuItem | undefined {
        if (!currentPage) {
            // Start the search from the top-level menu
            for (const page of this._data.pages) {
                const result = this.getPageByURL(url, excludedUUID, page);
                if (result) return result;
            }
        } else {
            // Check if the current page matches the ID
            if (currentPage.url && currentPage.url === url && !excludedUUID.includes(currentPage.uuid)) {
                return currentPage;
            }
            // If the current page has sub-pages, search within them
            if (currentPage.pages) {
                for (const subPage of currentPage.pages) {
                    const result = this.getPageByURL(url, excludedUUID, subPage);
                    if (result) return result;
                }
            }
        }

        return undefined; // Page not found
    }

    getParent(uuid: string): IPagesMenuItem {
        for (const page of this._data.pages) {
            if (page.uuid === uuid) {
                return undefined; // The given id represents a page in the first hierarchy
            }
            if (page.pages) {
                const subParent = this.findParent(page, uuid);
                if (subParent) {
                    return subParent;
                }
            }
        }
        return undefined;
    }

    private findParent(page: IPagesMenuItem, uuid: string): IPagesMenuItem {
        for (const _page of page.pages) {
            if (_page.uuid === uuid) {
                return page;
            }
            if (_page.pages) {
                const subParent = this.findParent(_page, uuid);
                if (subParent) {
                    return subParent;
                }
            }
        }
        return undefined; // No parent found
    }
}

export const pagesObject = new PagesObject();

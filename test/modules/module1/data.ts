export const data = {
    pages: [
        {
            uuid: 'uuid-1',
            name: "page 1",
            cid: "cid 1",
            url: "url-1"
        },
        {
            uuid: 'uuid-2',
            name: "page 2",
            url: "url-2",
            pages: [
                {
                    uuid: 'uuid-2.1',
                    name: "page 2.1",
                    cid: "cid 2.1",
                    url: "url-2-1"
                },
                {
                    uuid: 'uuid-2.2',
                    name: "page 2.2",
                    url: "url-2-2",
                    pages: [
                        {
                            uuid: 'uuid-2.2.1',
                            name: "page 2.2.1",
                            cid: "cid 2.2.1",
                            url: "url-2-2-1"
                        },
                        {
                            uuid: 'uuid-2.2.2',
                            name: "page 2.2.2",
                            cid: "cid 2.2.2",
                            url: "url-2-2-2"
                        },
                    ]
                },
            ]
        },
        {
            uuid: 'uuid-3',
            name: "page 3",
            url: "url-3",
            pages: [
                {
                    uuid: 'uuid-3.1',
                    name: "page 3.1",
                    cid: "cid 3.1",
                    url: "url-3-1"
                },
                {
                    uuid: 'uuid-3.2',
                    name: "page 3.2",
                    cid: "cid 3.2",
                    url: "url-3-2"
                },
            ]
        }
    ]
}
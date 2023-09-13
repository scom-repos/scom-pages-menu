export const data = {
    pages: [
        {
            uuid: '12345',
            name: "page 1",
            cid: "cid 1"
        },
        {
            uuid: '22345',
            name: "page 2",
            pages: [
                {
                    uuid: '32345',
                    name: "page 2.1",
                    cid: "cid 2.1"
                },
                {
                    uuid: '42345',
                    name: "page 2.2",
                    pages: [
                        {
                            uuid: '52345',
                            name: "page 2.2.1",
                            cid: "cid 2.2.1"
                        },
                        {
                            uuid: '62345',
                            name: "page 2.2.2",
                            cid: "cid 2.2.2"
                        },
                    ]
                },
            ]
        },
        {
            uuid: '72345',
            name: "page 3",
            pages: [
                {
                    uuid: '82345',
                    name: "page 3.1",
                    cid: "cid 3.1"
                },
                {
                    uuid: '92345',
                    name: "page 3.2",
                    cid: "cid 3.2"
                },
            ]
        }
    ]
}
item_ids = [8263432143,8414337015,8414337175,8414337219,8414337380,8414337337,8414337054,8414337846,8414337232,8414337482,8414337740,8414337357,8414337478,8414337686,8414337207,8414337680,8414337170,8414337473,8414337539,8414337848,8414337885,8414337980,8414336972,8414336996,8414337073,8414337137,8414337161,8414337543,8414337602,8414337390,8414337713,8414337526,8414337739,8414337596,8414337642,8414337251,8414337476,8414337082,8414337226,8414337716,8414337368,8414337389,8414337004,8414337157,8414337577,8414337653,8414337775,8414337442,8414337523,8414337434,8414337875,8414337931,8414337962,8414337573,8414337737,8414337766,8414337181,8414337428,8414337496,8414337735,8414337030,8414337056,8414337092,8414337201,8481240319,8481240329,8481240347,8481239018,8481239032,8481239054,8414337700,8481239178,8481238981,8481238994,8481239074,8481238967,8481239057,8481239077,8481239097,8481239113,8481238986,8481239086,8481239108,8481239259,8481239041,8481239219,8481238947,8481239122,8481239040,8481239093,8481239308,8481239337,8481239019,8481239034,8470715683,8470715696,8470715025,8470715250,8470715366,8470715230,8470715423,8470715438,8470715222,8470715104,8470715186,8470715239,8470715374,8470715196,8470715232,8470715289,8470715242,8470715263,8470715013,8470715103,8470715204];
// slice into 100 items per array
item_ids_sliced = [];
while (item_ids.length) {
    item_ids_sliced.push(item_ids.splice(0, 100));
}

fetch("https://api.monday.com/v2", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "api-version": "2024-01",
        "authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3MjU1MTMxNiwiYWFpIjoxMSwidWlkIjozMDI3MzE5NCwiaWFkIjoiMjAyMi0wNy0yN1QyMzowMzowNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg0NzExMCwicmduIjoidXNlMSJ9.2PvRpJ9AV5EXAG-hvNuohNeAxsodfODm4exO3lNwSbg",
        "content-type": "application/graphql-response+json",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Priority": "u=4"
    },
    "referrer": "https://www.weuit.com/",
    "body": JSON.stringify({
        "query": `query {
            boards(ids:[1250230293]){
                ${item_ids_sliced.map((ids, index) => `
                    items_page_${index}: items_page(limit:500,query_params:{ids:[${ids.join(',')}]}){
                        items{
                            name,
                            id,
                            column_values(ids:["status"]){
                                text
                            }
                        }
                    }
                `).join('')}
            }
        }`
    }),
    "method": "POST",
    "mode": "cors"
});

`query {
            boards(ids:[1250230293]){
                items_page(limit:500,query_params:{ids:[]}){
                    items{
                        name,
                        id,
                        column_values(ids:["status"]){
                            text
                        }
                    }
                }
            }
        }`
import FIXED_DATA from "./fixedData.js";
import statusProcessings from "./statusProcessings.js";
import promptTemplates from "./promptTemplates.js";
const aiProcessings = {
    mondayFetch: async (query, files = null, version = '2024-01') => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/graphql-response+json');
        headers.append('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU5OTUxNjY2OCwiYWFpIjoxMSwidWlkIjo5NzUzMzQxNiwiaWFkIjoiMjAyNS0xMi0xOVQwMjozODoxNy42ODFaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg0NzExMCwicmduIjoidXNlMSJ9.ZZeKerbwkltSI0t6NPDxUhgEBvqINvj7hz1xwY8ScbA');
        headers.append('API-Version', version);

        const formData = new FormData();
        formData.append('query', query);
        if (files) {
            formData.append('variables[file]', files);
        }
        const payload = {
            query,
        }
        if (files) {
            payload.variables = {
                file: files
            }
        }
        const request = {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        }
        const mondayResponse = await fetch(
            "https://api.monday.com/v2",
            request
        );
        return mondayResponse;
    },
    checkMondayItem: async (item_id) => {
        const query = `
            query{
                items(ids:[${item_id}],exclude_nonactive:true){
                    state,
                    column_values(ids:["status"]){

                        text
                    },
                    board{
                        id
                    }
                }
            }
        `;
        const res = await aiProcessings.mondayFetch(query);
        const resJson = await res.json();
        const items = resJson.data.items;
        if (items.length == 0) {
            return { isValid: false, message: 'Item not found on Monday.com' };
        } else {
            const item = items[0];
            if (item.state != 'active') {
                return { isValid: false, message: 'Either item is archived or not active' };
            } else {
                const boardId = item.board.id * 1;
                if (!FIXED_DATA.allowedBoardIds.includes(boardId)) {
                    return { isValid: false, message: 'Item is not from BorEffort Board' };
                } else {
                    const statusText = item.column_values[0].text;
                    if (!FIXED_DATA.allowedStatuses[boardId].includes(statusText)) {
                        return { isValid: false, message: `Item status is not in allowed statuses` };
                    }
                    return { isValid: true, message: 'Item is valid', status: statusText };
                }
            }
        }
    },
    getMondayItemDetails: async (item_id) => {
        const query = `
            query{
                items(ids:[${item_id}]){
                    name,
                    column_values{
                        id,
                        text,
                        column{
                            title
                        }
                    }
                }
            }
        `;
        const res = await aiProcessings.mondayFetch(query);
        const resJson = await res.json();
        const item = resJson.data.items[0];
        const columnValues = item.column_values;
        const itemDetails = {};
        FIXED_DATA.itemColumns.forEach(colDef => {
            const colValue = columnValues.find(cv => cv.id == colDef.id);
            if (colValue) {
                itemDetails[colDef.title] = colValue.text;
            } else {
                itemDetails[colDef.title] = null;
            }
        });
        return itemDetails;
    },
    getMondayItemStausUpadteAt: async (item_id) => {
        const query = `
            query{
                boards(ids:[${FIXED_DATA.boardIds.BOR_EFFORT}]){
                    activity_logs(item_ids:[${item_id}],column_ids: ["status"],limit:1){
                        created_at                    
                    }
                }            
            }
        `;
        const res = await aiProcessings.mondayFetch(query);
        const resJson = await res.json();
        const activityLogs = resJson.data.boards[0].activity_logs;
        if (activityLogs.length > 0) {
            console.log(parseInt(activityLogs[0].created_at * 1 / 10000))
            return parseInt(activityLogs[0].created_at * 1 / 10000);
        }
        return (new Date()).getTime();
    },
    updateItemColumn: async ({ board_id, item_id, columnId, columnTitle, value }) => {
        if (columnTitle) {
            columnId = FIXED_DATA.itemColumns.find(colDef => colDef.title == columnTitle).id;
        }
        if (!columnId) {
            throw new Error('columnId is required');
        }
        const query = `
            mutation {
                change_simple_column_value (
                    item_id: ${item_id}, 
                    board_id: ${board_id}, 
                    column_id: "${columnId}", 
                    value: "${value}"
                ) {
                    id
                }
            }
        `;
        const res = await aiProcessings.mondayFetch(query);
        const resJson = await res.json();
        return resJson.data.change_simple_column_value.id;

    },
    addItemUpdates: async (item_id, text) => {
        const query = `
            mutation {
                create_update (item_id: ${item_id}, body: "${text}") {
                id
                }
            }
        `;
        const res = await aiProcessings.mondayFetch(query);
        const resJson = await res.json();
        return resJson.data.create_update.id;
    },
    getMondayItemUpdates: async (item_id) => {
        const statusUpdateAt = await aiProcessings.getMondayItemStausUpadteAt(item_id);
        const before10minutesOfStatusUpadate = statusUpdateAt - (600 * 1000);
        const query = `
            query{
                items(ids:[${item_id}]){
                    updates{
                        body,
                        text_body,
                        created_at,
                        creator{
                            id,
                            created_at,
                        }
                    }
                }
            }
        `;
        const res = await aiProcessings.mondayFetch(query);
        const resJson = await res.json();
        const item = resJson.data.items[0];
        const ignoreUsers = FIXED_DATA.ignoreUpdatesFromUsers.map(id => id * 1);
        const userFilteredUpdates = item.updates.filter(update => !ignoreUsers.includes(update.creator.id * 1));
        const relevantUpdates = userFilteredUpdates.filter(update => {
            console.log((new Date(update.created_at)).getTime(), before10minutesOfStatusUpadate);
            return (new Date(update.created_at)).getTime() >= before10minutesOfStatusUpadate
        });
        // text_body array

        const updateMessages = relevantUpdates.map(update => update.text_body);
        return updateMessages;
    },
    generateMetaWithChat: async (item_id) => {
        const res = await fetch('/ai/singleItemMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item_id })
        });
        const messages = await res.json();
        return {
            messages: messages,
            meta: {
                // No Unsent Message
                NUM: messages.every(msg => msg.status != 'unsent'),
                // Total Messages
                TM: messages.length,
                // Is Our Message Last
                IOML: messages.length > 0 ? (messages[messages.length - 1].sent_from == 'me' ? true : false) : false,
                // How Many Consecutive Messages Sent
                HMCMS: (() => {
                    let count = 0;
                    for (let i = messages.length - 1; i >= 0; i--) {
                        if (messages[i].sent_from == 'me') {
                            count++;
                        } else {
                            break;
                        }
                    }
                    return count;
                })(),
                // All Our Messages
                AOM: messages.length > 0 && messages.every(msg => msg.sent_from == 'me' ? true : false),
                // Own Message Waiting Time(in days i.e 2, 0.5)
                OMWT: (() => {
                    // if(IOML)
                    const isLastMessageOurs = messages.length > 0 ? (messages[messages.length - 1].sent_from == 'me' ? true : false) : false
                    if (isLastMessageOurs) {
                        const lastMessageTime = messages[messages.length - 1].timestamp * 1;
                        const currentTime = (new Date()).getTime();
                        const timeDiff = currentTime - lastMessageTime;
                        return parseFloat((timeDiff / (1000 * 60 * 60 * 24)).toFixed(2));
                    } else {
                        return 0;
                    }
                })(),
                // Last Message Received time (in days i.e 2, 0.5)
                LMRT: (() => {
                    const isLastMessageSellers = messages.length > 0 ? (messages[messages.length - 1].sent_from == 'seller' ? true : false) : false
                    if (isLastMessageSellers) {
                        const lastMessageTime = messages[messages.length - 1].timestamp * 1;
                        const currentTime = (new Date()).getTime();
                        const timeDiff = currentTime - lastMessageTime;
                        return parseFloat((timeDiff / (1000 * 60 * 60 * 24)).toFixed(2));
                    } else {
                        return 0;
                    }
                })()


            }
        }
    },
    vinCheckDigit: (vin) => {
        if (!vin) return false;
        vin = vin.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (vin.length !== 17) return false;

        const vinUpper = vin.toUpperCase();
        const charValues = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
            'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2,
            'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9
        };
        const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

        let sum = 0;
        for (let i = 0; i < 17; i++) {
            const char = vinUpper[i];
            // Rule: VINs never contain I, O, or Q
            if (char === 'I' || char === 'O' || char === 'Q') return false;

            let val = isNaN(char) ? charValues[char] : parseInt(char);
            sum += val * weights[i];
        }

        const remainder = sum % 11;
        const checkDigit = remainder === 10 ? 'X' : remainder.toString();

        return vinUpper[8] === checkDigit;
    },
    showAI: async (prompt, imageUrl, reason) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        // ai url from /ai/getUrlAI
        const aiUrl = await fetch('/ai/getUrlAI');
        const aiUrlText = (await aiUrl.json()).value;

        const base64String = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Remove the "data:image/png;base64," prefix for Ollama
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.readAsDataURL(blob);
        });

        const aiResponse = await fetch(`${aiUrlText}/api/AI`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: promptTemplates.imageDescription[reason].template(),
                image: base64String
            }),
        });

        const data = await aiResponse.json();
        return JSON.parse(data.output);
    },
    askAI: async (prompt) => {
        const aiUrl = await fetch('/ai/getUrlAI');
        const aiUrlText = (await aiUrl.json()).value;
        const aiResponse = await fetch(`${aiUrlText}/api/AI`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: prompt
            }),
        });
        const data = await aiResponse.json();
        return JSON.parse(data.output);
    },
    processChatHistory: async (messages, imageReason) => {
        let chatText = '--CHAT START--\n';
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const daysAgo = parseInt(((new Date()).getTime() - (message.timestamp * 1)) / (1000 * 60 * 60 * 24));
            const source = message.type == 'text' ? "TEXT" : "IMAGE";
            if (message.type == 'text') {
                chatText += `[${source}| ${message.sent_from.toUpperCase()}]: ${message.message}\n`;
            } else if (message.type == 'image') {
                const imageDescriptionTemplate = promptTemplates.imageDescription[imageReason]
                const prompt = imageDescriptionTemplate.template()
                const aiOutput = await aiProcessings.showAI(prompt, message.message, imageReason);
                const imageDescription = imageDescriptionTemplate.retriever(aiOutput)
                chatText += `[${source}| ${message.sent_from.toUpperCase()}]: ${imageDescription}\n`;
            }
        }
        chatText += '--CHAT END--\n';
        return chatText;

    },
    singleItemAIProcessing: async ({ item_id, showAiUpdates, actionConfirmation }) => {

        showAiUpdates({ type: 'info', data: `Started Processing-${item_id}` });
        const itemCheck = await aiProcessings.checkMondayItem(item_id);
        if (!itemCheck.isValid) {
            showAiUpdates({ type: 'info', data: itemCheck.message });
            return;
        }
        const status = itemCheck.status;

        showAiUpdates({ type: 'info', data: `Field reps supposed to work on this item as it is on BorEffort Board and status is ${itemCheck.status}` });

        await statusProcessings[status](item_id, showAiUpdates, actionConfirmation);
    },
    sendMessage: async ({ message, item_id }) => {
        const response = await fetch('/ai/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, item_id })
        });
        const data = await response.json();
        if (data.status == "success") {
            return data;
        } else {
            throw new Error(data.message);
        }
    },
    archiveItemOnServer: async (item_id) => {
        const archiveItem = await fetch(`/api/archiveItemOnServer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_id: `${item_id}`,
            })
        });
        await archiveItem.json();
    }
}
export default aiProcessings;
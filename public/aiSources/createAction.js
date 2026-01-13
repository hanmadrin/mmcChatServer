import aiProcessings from "./aiProcessings.js";

export default {
    updateStatus: (item_id, status) => {
        return {
            title: `Update status to: ${status}`,
            callback: async () => {
                await aiProcessings.updateItemColumn({
                    board_id: FIXED_DATA.boardIds.BOR_EFFORT,
                    item_id: item_id,
                    columnId: 'status',
                    value: status
                });
            }
        };
    },
    updateDate: (item_id, date) => {
        return {
            title: `Update Date to: ${date}`,
            callback: async () => {
                await aiProcessings.updateItemColumn({
                    board_id: FIXED_DATA.boardIds.BOR_EFFORT,
                    item_id: item_id,
                    columnTitle: 'Date',
                    value: date
                });
            }
        };
    },
    updateVin: (item_id, vin) => {
        return {
            title: `Update VIN column to ${vin}`,
            callback: async () => {
                await aiProcessings.updateItemColumn({
                    board_id: FIXED_DATA.boardIds.BOR_EFFORT,
                    item_id: item_id,
                    columnTitle: 'Vin#',
                    value: vin
                });
            }
        };
    },
    sendUpdates: (item_id, message) => {
        return {
            title: `Monday Updates: ${message}`,
            callback: async () => {
                await aiProcessings.addItemUpdates(item_id, message);
            }
        }
    },
    sendMessage: (item_id, message) => {
        return {
            title: `Sending message: ${secondFirstMessage}`,
            callback: async () => {
                await aiProcessings.sendMessage({
                    message: message,
                    item_id: item_id
                });
            }
        };
    },
    archiveItemOnServer: (item_id) => {
        return {
            title: `Archive item`,
            callback: async () => {
                await aiProcessings.archiveItemOnServer(item_id);
            }
        };
    }
}
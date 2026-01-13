import aiProcessings from "../aiProcessings.js";
import aiFunctions from "../aiFunctions.js";
import promptTemplates from "../promptTemplates.js";
import FIXED_DATA from "../fixedData.js";

import {
    validVinAlreadyExistsCheckWork,
    sendNewFirstMessage,
    archiveAnItem,
    extractVinFromChatWorkFlow,
    willSendLaterWorkFlow,
    hesitantToSendVinWorkFlow,
    sellerWantsPhoneTextWorkFlow,
    zeroTotalMessageWorkFlow

} from "./firstMessage.js";


export default async (item_id, showAiUpdates, actionConfirmation) => {
    // item verification with Monday item details
    if (await validVinAlreadyExistsCheckWork(item_id, showAiUpdates, actionConfirmation)) return;
    const { messages, meta } = await aiProcessings.generateMetaWithChat(item_id);
    const { NUM, TM, IOML, HMCMS, AOM, OMWT, LMRT } = meta;
    if (NUM && ((TM == 3 && AOM) || TM > 3)) {
        // second first message
        showAiUpdates({ type: 'info', data: `No unsent messages. Proceeding further.` });
        const chatHistory = await aiProcessings.processChatHistory(messages, 'vin');
        const hasSentVin = await aiFunctions.aiProcess(promptTemplates.hasSentVinFromChatHistory, { chatHistory });
        showAiUpdates({ type: 'info', data: `Has sent VIN: ${hasSentVin}` });
        if (IOML && !hasSentVin) {
            showAiUpdates({ type: 'info', data: `Seller didnot reply to our last message. Proceeding further.` });
            // more than 3 consecutive messages sent
            showAiUpdates({ type: 'info', data: `3 or consecutive messages sent. Proceeding further.` });
            if (OMWT > 2) {
                showAiUpdates({ type: 'info', data: `Seller didnot reply to our last message for 2 days. ` });
                await archiveAnItem(item_id, showAiUpdates, actionConfirmation);
            } else {
                showAiUpdates({ type: 'info', data: `Waiting for seller to respond as our last message was sent ${OMWT} days ago. No action taken.` });
            }

        } else {
            if (hasSentVin) {
                await extractVinFromChatWorkFlow(item_id, chatHistory, showAiUpdates, actionConfirmation);
            } else {
                showAiUpdates({ type: 'info', data: `Seller didnot sent VIN yet. Proceeding further.` });
                console.log("Classifying chat history")
                const classifiedStatus = await aiFunctions.aiProcess(promptTemplates.beforeVinClassify, { chatHistory });
                if (classifiedStatus == 'will_send_vin_later') {
                    showAiUpdates({ type: 'info', data: `Seller will send VIN later. Proceeding further.` });
                    await willSendLaterWorkFlow(item_id, showAiUpdates, actionConfirmation);
                } else if (classifiedStatus == 'hesitant_to_send_vin') {
                    showAiUpdates({ type: 'info', data: `Seller is hesitant to send VIN. Proceeding further.` });
                    await hesitantToSendVinWorkFlow(item_id, chatHistory, showAiUpdates, actionConfirmation);
                } else if (classifiedStatus == 'seller_wants_phone_text') {
                    showAiUpdates({ type: 'info', data: `Seller wants to be texted. Proceeding further.` });
                    await sellerWantsPhoneTextWorkFlow(item_id, chatHistory, showAiUpdates, actionConfirmation);
                } else {
                    showAiUpdates({ type: 'danger', data: `Could not classify the chat history into any predefined categories.` });
                }
            }
        }
    } else {
        if (TM == 2 && AOM) {
            sendNewFirstMessage(FIXED_DATA.allStatuses.thirdFirstMessage, chatHistory, showAiUpdates, actionConfirmation);
        } else if (TM == 1) {
            sendNewFirstMessage(FIXED_DATA.allStatuses.secondFirstMessage, chatHistory, showAiUpdates, actionConfirmation);
        } else if (TM == 0) {
            showAiUpdates({ type: 'info', data: `There are no messages in the chat. Proceeding further.` });
            // await unitDecisions.sendFirstMessageWhenNoMessage(item_id, showAiUpdates, actionConfirmation);
            await zeroTotalMessageWorkFlow(item_id, chatHistory, showAiUpdates, actionConfirmation);
        } else if (!NUM) {
            showAiUpdates({ type: 'info', data: `There are unsent messages in the chat. Cannot proceed further.` });
        } else{
            showAiUpdates({ type: 'danger', data: `Something weird.` });
        }
    }
}
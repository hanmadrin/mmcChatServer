import aiProcessings from "../aiProcessings.js";
import aiFunctions from "../aiFunctions.js";
import createAction from "../createAction.js";
import promptTemplates from "../promptTemplates.js";
import FIXED_DATA from "../fixedData.js";

export const validVinAlreadyExistsCheckWork = async (item_id, showAiUpdates, actionConfirmation) => {
    const itemDetails = await aiProcessings.getMondayItemDetails(item_id);
    const vin = itemDetails['Vin#'];
    if (vin != '') {
        if (aiProcessings.vinCheckDigit(vin)) {
            showAiUpdates({ type: 'info', data: `VIN already exists.` });
            await aiFunctions.takeActions([
                createAction.updateStatus(item_id, FIXED_DATA.allStatuses.autoVin),
            ], showAiUpdates, actionConfirmation);
            return true;
        }
    }
    return false;
}
export const sendNewFirstMessage = async (status, chatHistory, showAiUpdates, actionConfirmation) => {
    const today = (() => {
        const d = new Date(); const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    })();
    const newFirstMessage = await aiFunctions.aiProcess(promptTemplates.generateNewFirstMessage, { chatHistory });
    await aiFunctions.takeActions([
        createAction.sendMessage(item_id, newFirstMessage),
        createAction.updateDate(item_id, today),
        createAction.updateStatus(item_id, status),
    ], showAiUpdates, actionConfirmation);
}
export const beforeVinFollowUpMessage = async (chatHistory, showAiUpdates, actionConfirmation) => {
    const followupMessage = await aiFunctions.aiProcess(promptTemplates.unresponsiveOnVinFollowup, { chatHistory });
    await aiFunctions.takeActions([
        createAction.sendMessage(item_id, followupMessage),
    ], showAiUpdates, actionConfirmation);
}
export const archiveAnItem = async (item_id, showAiUpdates, actionConfirmation) => {
    await aiFunctions.takeActions([
        createAction.updateStatus(item_id, FIXED_DATA.allStatuses.archive),
        createAction.archiveItemOnServer(item_id),
    ], showAiUpdates, actionConfirmation);
}
export const extractVinFromChatWorkFlow = async (item_id, chatHistory, showAiUpdates, actionConfirmation) => {
    const { vin, source } = await aiFunctions.aiProcess(promptTemplates.extractVinWithSource, { chatHistory });
    showAiUpdates({ type: 'info', data: `Extracted VIN: ${vin} and vin source: ${source}` });
    if (aiProcessings.vinCheckDigit(vin)) {
        showAiUpdates({ type: 'info', data: `Extracted VIN "${vin}" is valid. Proceeding further.` });
        await aiFunctions.takeActions([
            createAction.updateVin(item_id, vin),
            createAction.updateStatus(item_id, FIXED_DATA.allStatuses.autoVin),
        ], showAiUpdates, actionConfirmation);
    } else {
        if (source == "text") {
            showAiUpdates({ type: 'info', data: `Extracted VIN "${vin}" is invalid and sure that seller made the mistake` });
            await aiFunctions.takeActions([
                createAction.updateStatus(item_id, FIXED_DATA.allStatuses.badVin),
            ], showAiUpdates, actionConfirmation);
        } else {
            showAiUpdates({ type: 'danger', data: `Extracted VIN "${vin}" is invalid. Extract the vin correctly and set the status to AUTO VIN` });
        }
    }
}
export const willSendLaterWorkFlow = async (item_id, showAiUpdates, actionConfirmation) => {
    await aiFunctions.takeActions([
        createAction.updateStatus(item_id, FIXED_DATA.allStatuses.willSendLater),
    ], showAiUpdates, actionConfirmation);
}
export const hesitantToSendVinWorkFlow = async (item_id, chatHistory, showAiUpdates, actionConfirmation) => {
    const adresssConcernsMessage = await aiFunctions.aiProcess(promptTemplates.addressVinConcerns, { chatHistory });
    await aiFunctions.takeActions([
        createAction.sendMessage(item_id, adresssConcernsMessage),
    ], showAiUpdates, actionConfirmation);
}
export const sellerWantsPhoneTextWorkFlow = async (item_id, chatHistory, showAiUpdates, actionConfirmation) => {
    const phoneNumber = await aiFunctions.aiProcess(promptTemplates.extractSellerPhoneNumber, { chatHistory });
    if (phoneNumber) {
        showAiUpdates({ type: 'info', data: `Moving item to text channel. Proceeding further.` });
        await aiFunctions.takeActions([
            createAction.sendUpdates(item_id, phoneNumber),
            createAction.updateStatus(item_id, FIXED_DATA.allStatuses.needsText),
        ], showAiUpdates, actionConfirmation);
    } else {
        showAiUpdates({ type: 'info', data: `Seller wants to be texted but didn't provide number. Let's just assume they are hesitant to send vin` });
        const adresssConcernsMessage = await aiFunctions.aiProcess(promptTemplates.addressVinConcerns, { chatHistory });
        await aiFunctions.takeActions([
            createAction.sendMessage(item_id, adresssConcernsMessage),
        ], showAiUpdates, actionConfirmation);
    }
}
export const firstMessageOnNoMessageWorkFlow = async (item_id, chatHistory, showAiUpdates, actionConfirmation) => {
    const firstMessage = await aiFunctions.aiProcess(promptTemplates.generateFirstMessage, { chatHistory });
    const today = (() => {
        const d = new Date(); const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    })();
    await aiFunctions.takeActions([
        createAction.sendMessage(item_id, firstMessage),
        createAction.updateDate(item_id, today),
    ], showAiUpdates, actionConfirmation);
}

export default async (item_id, showAiUpdates, actionConfirmation) => {
    // item verification with Monday item details
    if (await validVinAlreadyExistsCheckWork(item_id, showAiUpdates, actionConfirmation)) return;
    const { messages, meta } = await aiProcessings.generateMetaWithChat(item_id);
    const { NUM, TM, IOML, HMCMS, AOM, OMWT, LMRT } = meta;
    if (NUM && TM != 0) {
        showAiUpdates({ type: 'info', data: `No unsent messages. Proceeding further.` });
        const chatHistory = await aiProcessings.processChatHistory(messages, 'vin');
        const hasSentVin = await aiFunctions.aiProcess(promptTemplates.hasSentVinFromChatHistory, { chatHistory });
        showAiUpdates({ type: 'info', data: `Has sent VIN: ${hasSentVin}` });
        if (IOML && !hasSentVin) {
            showAiUpdates({ type: 'info', data: `Seller didnot reply to our last message. Proceeding further.` });
            if (HMCMS < 3) {
                showAiUpdates({ type: 'info', data: `Less than 3 consecutive messages sent. Proceeding further.` });
                if (AOM && OMWT > 3) {
                    showAiUpdates({ type: 'info', data: `Seller didnot reply to our last message for 3 days. ` });
                    await sendNewFirstMessage(FIXED_DATA.allStatuses.secondFirstMessage, chatHistory, showAiUpdates, actionConfirmation);
                } else if (!AOM && OMWT > 1) {
                    showAiUpdates({ type: 'info', data: `Seller didnot reply to our last message for 1 day. ` });
                    await beforeVinFollowUpMessage(chatHistory, showAiUpdates, actionConfirmation);
                } else {
                    showAiUpdates({ type: 'info', data: `Waiting for seller to respond as our last message was sent ${OMWT} days ago. No action taken.` });
                }
            } else {
                // more than 3 consecutive messages sent
                showAiUpdates({ type: 'info', data: `3 or consecutive messages sent. Proceeding further.` });
                if (OMWT > 2) {
                    showAiUpdates({ type: 'info', data: `Seller didnot reply to our last message for 2 days. ` });
                    await archiveAnItem(item_id, showAiUpdates, actionConfirmation);
                } else {
                    showAiUpdates({ type: 'info', data: `Waiting for seller to respond as our last message was sent ${OMWT} days ago. No action taken.` });
                }
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
        if (TM == 0) {
            showAiUpdates({ type: 'info', data: `There are no messages in the chat. Proceeding further.` });
            // await unitDecisions.sendFirstMessageWhenNoMessage(item_id, showAiUpdates, actionConfirmation);
            await firstMessageOnNoMessageWorkFlow(item_id, chatHistory, showAiUpdates, actionConfirmation);
        } else if (!NUM) {
            showAiUpdates({ type: 'info', data: `There are unsent messages in the chat. Cannot proceed further.` });
        }
    }
}
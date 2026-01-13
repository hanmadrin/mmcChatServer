import aiProcessings from "./aiProcessings.js";
export default {
    takeActions: async (actions, showAiUpdates, actionConfirmation) => {
        if (actionConfirmation) {
            actionConfirmation(actions);
        } else {
            for (const action of actions) {
                await action.callback();
                showAiUpdates({ type: 'info', data: action.title });
            }
        }
    },
    aiProcess: async (template, data) => {
        const prompt = template.template(data);
        console.log(prompt);
        return template.retriever(await aiProcessings.askAI(prompt));
    }
}
import aiProcessings from "./aiSources/aiProcessings.js";
import secondFirstMessage from "./aiSources/statuses/secondFirstMessage.js";
export default async () => {
    const main = document.getElementById('main');
    main.classList = 'h-100vh w-100p d-flex flex-column justify-content-center align-items-center bg-dark';
    const wrapper = document.createElement('div');
    wrapper.classList = 'h-100vh w-500px d-flex flex-column p-20px box-shadow-inset';
    const input = document.createElement('input');
    input.classList = 'w-100p h-40px border-radius-5px bg-dark font-normal focus-outline-none line-white-border px-5px';
    input.placeholder = 'Enter Item ID';
    const loadButton = document.createElement('button');
    loadButton.classList = 'text-center font-normal cursor-pointer align-self-center bg-primary border-radius-5px p-15px my-20px';
    loadButton.innerText = 'Run AI Automation';
    const showAiUpdates = ({ type, data }) => {
        const aiUpdates = document.createElement('div');
        aiUpdates.classList = 'w-100p box-shadow-inset bg-grey p-10px mb-10px border-radius-5px font-sub';
        aiUpdates.innerText = data;
        if (type == 'success') {
            aiUpdates.classList.add('box-shadow-inset-green');
        } else if (type == 'danger') {
            aiUpdates.classList.add('box-shadow-inset-red');
        }
        resultDiv.prepend(aiUpdates);
    }
    const actionConfirmation = async (actions) => {
        const confirmDiv = document.createElement('div');
        confirmDiv.classList = 'w-100p box-shadow-inset-green bg-grey p-10px mb-10px border-radius-5px font-sub';
        confirmDiv.innerText = 'Are you sure you want to perform the following actions?';
        for (const action of actions) {
            const actionDiv = document.createElement('div');
            actionDiv.classList = 'w-100p box-shadow-inset bg-grey p-10px mb-10px mt-20px border-radius-5px font-sub';
            actionDiv.innerText = action.title;
            confirmDiv.append(actionDiv);
        }
        resultDiv.prepend(confirmDiv);
        const confirmButton = document.createElement('button');
        confirmButton.classList = 'text-center font-normal cursor-pointer align-self-center bg-primary border-radius-5px p-15px my-20px w-100p';
        confirmButton.innerText = 'Confirm';
        confirmDiv.append(confirmButton);
        confirmButton.addEventListener('click', async () => {
            for (const action of actions) {
                await action.callback();
                showAiUpdates({ type: 'info', data: action.title });
            }
        });
    };
    loadButton.addEventListener('click', async () => {
        aiProcessings.singleItemAIProcessing({
            item_id: input.value.trim(),
            showAiUpdates,
            actionConfirmation
        });
    });

    const resultDiv = document.createElement('div');
    resultDiv.classList = 'h-100p w-100p bg-dark overflow-y-auto border-radius-5px box-shadow-inset p-10px overflow-auto font-sub';
    wrapper.append(input, loadButton, resultDiv);
    main.replaceChildren(wrapper);

}
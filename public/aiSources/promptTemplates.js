export default {
    imageDescription: {
        vin: {
            template: () => `Extract the VIN from this image and return it in this JSON format: {"vin": "VALUE"}. If no VIN is found, return {"vin": null}.Do not include any other text or markdown blocks.`,
            retriever: (data) => {
                console.log(data)
                const vin = data.vin;
                if (vin) {
                    return `Extracted VIN: ${vin}`;
                } else {
                    return `Do not show VIN`;
                }
            }
        }
    },
    hasSentVinFromChatHistory: {
        template: ({ chatHistory }) => `Analyze the chat history and determine whether the SELLER has sent a valid vehicle VIN.
            A VIN must meet all of the following rules:
            Exactly 17 characters long
            Contains only letters (A-Z) and digits (0-9)
            Must NOT contain the letters I, O, or Q
            Must appear as a complete VIN, not partial, split, shortened, or formatted as phone numbers, prices, IDs, or random codes
            Ignore any numeric strings shorter than 17 characters
            Ignore messages where the seller refuses, redirects, or sends unrelated numbers
            Respond only in JSON format:
            {"hasSentVin": true} if a valid VIN is clearly sent by SELLER
            {"hasSentVin": false} otherwise
            Do not infer or guess. If uncertain, return false.\n${chatHistory}`,
        retriever: (data) => {
            console.log(data);
            return data.hasSentVin;
        }
    },
    beforeVinClassify: {
        template: ({ chatHistory }) =>
            `Analyze the chat history between me and a vehicle seller. Determine the status from below options
            will_send_vin_later: The seller indicates they will send the VIN later.
            hesitant_to_send_vin: The seller is hesitant or reluctant or refuses to send the VIN or is avoiding the request.
            seller_wants_phone_text: The seller insists to communicate via phone or text rather than through the current chat platform.
            error: above options do not fit the chat history.
            Respond in JSON format: {"status": "will_send_vin_later"|"hesitant_to_send_vin"|"seller_sent_vin"|"seller_wants_phone_text"|"error"} without any additional text or markdown.\n${chatHistory}`,
        retriever: (data) => {
            return data.status;
        }
    },
    extractVinWithSource: {
        template: ({ chatHistory }) =>
            `Analyze the chat history and extract a valid 17-character VIN (letters A-Z and digits 0-9, excluding I, O, Q) only if it is explicitly present as a VIN.
            Rules:
            VIN must be exactly 17 characters
            Ignore phone numbers, short numbers, IDs, or any numeric text that is not clearly labeled or formatted as a VIN
            If no valid VIN is found, return null
            Respond in JSON only:
            {"vin": string | null, "source": "image" | "text" | null}
            Do not infer, guess, or transform numbers without any additional text or markdown.\n${chatHistory}`,
                    retriever: (data) => {
            const { vin, source } = data;
            return { vin, source };
        }
    },
    generateFirstMessage: {
        template: () => `
            We want to ask seller to provide VIN for their vehicle. Generate a new random message to send to seller:\n 
            Examples:
            - Hello! If the vehicle is available, I am interested. Could I have the vin so I could check the vehicle history?
            - Hi! Could I have the vin so I could look at the vehicle history. Also, are there any issues/damages?
            - Hi! I am interested in the vehicle. Could I have the VIN so I could look at the vehicle history?
            - Hi! I am interested in your vehicle! Can you send me the VIN so I can do a check on the history before sending you an offer?
            - Hi! I'm considering your vehicle. Could you send me the VIN so I can run a Carfax history check?
            - Greetings! I'm interested in your vehicle. Would you mind providing the VIN for a history check?
            - Hello! I'm keenly interested in your vehicle. Could you please share the VIN for a history check?
            Respond in JSON format: {"message": "generated_message", }
            Do not include any other text or markdown blocks. 
        `,
        retriever: (data) => {
            const message = data.message;
            return message;
        }
    },
    generateNewFirstMessage: {
        template: ({ chatHistory }) => `
            We want to ask seller to provide VIN for their vehicle. Generate a random message to send to seller and make sure not to repeat the same message twice:\n 
            Examples:
            - Hi! I'm interested in your vehicle. Could you send me the VIN so I can run a Carfax history check?
            - Greetings! I'm interested in your vehicle. Would you mind providing the VIN for a history check?
            - Hello! I'm keenly interested in your vehicle. Could you please share the VIN for a history check?
            Respond in JSON format: {"message": "generated_message", }
            Do not include any other text or markdown blocks.\n
            ${chatHistory}
        `,
        retriever: (data) => {
            const message = data.message;
            return message;
        }
    },
    unresponsiveOnVinFollowup: {
        template: ({ chatHistory }) => `
            We want to ask seller to provide VIN for their vehicle. Seller seems to be not replying to our meessage. Generate a followup message on last message from me:\n 
            
            Respond in JSON format: {"message": "generated_message", }
            Do not include any other text or markdown blocks.\n
            ${chatHistory}
        `,
        retriever: (data) => {
            const message = data.message;
            return message;
        }
    },

    addressVinConcerns: {
        template: ({ chatHistory }) => `
            Seller is hesitant to sent the vin. We need to convey that we are a real business and want to buy their vehicle. 
            Seller posted it on Facebook marketplace and we want to but it. Try to follow the example as much possible.
            DO NOT REPEAT the same message twice.
            We are a small family owned dealership - Matthew's Motor Company, located in Covington, PA.
            Generate a message to send to seller:\n 
            Example:
            - I totally understand not wanting to send the VIN. However, I do work for a small family owned dealership - Matthew's Motor Company, located in Covington, PA. We're interested in purchasing your vehicle!!
            Respond in JSON format: {"message": "generated_message", }
            Do not include any other text or markdown blocks.\n
            ${chatHistory}/
        `,
        retriever: (data) => {
            const message = data.message;
            return message;
        }
    },
    extractSellerPhoneNumber: {
        template: ({ chatHistory }) => `
            Extract seller phone number from the chat history and respond in JSON format: {"phone": "extracted_phone_number"}. 
            if seller didnot provide phone number, respond with {"phone": null} 
            without any additional text or markdown.\n${chatHistory}`,
        retriever: (data) => {
            const { phone } = data;
            return  phone ;
        }
    },
}
const allStatuses =  {
    allowedBoardIds: [1250230293],
    boardIds: {
        BOR_EFFORT: 1250230293,
    },
    allStatuses: {
        firstMessage: "1st MSG",
        secondFirstMessage: "2nd 1st Msg",
        thirdFirstMessage: "3rd MSG",
        autoVin: "Auto Vin",
        needsText: "NEEDS TEXT",
        badVin: "Vin# Bad",
        archive: "Archived",
        willSendLater: "Will Send Vin"
    },
    allowedStatuses: {
        1250230293: [
            "1st MSG",
            "2nd 1st Msg",
            "3rd MSG",
        ]
    },
    ignoreUpdatesFromUsers: [30273194],
    itemColumns: [
        {
            title: "Vin#",
            id: "text6",
            description: "Vehicle Identification Number"
        },
        {
            title: "MMC Offer$",
            id: "numbers9",
            description: "Calculated offer we are willing to pay for the vehicle"
        },
        {
            title: "Seller Counter$",
            id: "numbers7",
            description: "Seller's last counter offer"
        },
        {
            title: "Price$",
            id: "numbers4",
            description: "Seller's initial asking price for the vehicle"
        },
        {
            title: "Year",
            id: "text",
            description: "Year of the vehicle"
        },
        {
            title: "Mileage",
            id: "text_2",
            description: "Count of miles on the vehicle"
        },
        {
            title: "Vehicle",
            id: "text_1",
            description: "Vehicle make and model and/or trim"
        },
        {
            title: "State",
            id: "text_3",
            description: "State where the seller posts the vehicle for sale"
        },
        {
            title: "Date",
            id: "date4",
            description: "General reason trackind Date"
        }
    ]
}

export default allStatuses
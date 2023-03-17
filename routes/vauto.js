const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
// const Message = require('../models/Message');
const Sequelize = require('sequelize');
const sequelize = require('../configs/database');
const AppraisalItem = require('../models/AppraisalItem');
const Item = require('../models/Item');
const Script = require('../models/Script');
const Message = require('../models/Message');
const Action = require('../models/Action');
const AutovinAction = require('../models/AutovinAction');
const ExpressError = require("../utilities/expressError");
const Data= require('../models/Data');
const getCurrentTime = ()=>{
    return new Date().getTime();
};
const waitingTime = 300*1000;
let i = 0;
router.post('/getNewItemId', async (req, res) => {
    const device_id = req.query.device_id || req.fields.device_id;
    if(!device_id){
        res.json({
            action: 'setDeviceId'
        });
        return false;
    }else{
        await AppraisalItem.destroy({
            where: {
                status: device_id
            }
        });
    }
    const currentTime = getCurrentTime();
    if(currentTime - i > waitingTime){
        // time to get new item and work on red timing
        i = currentTime;
        res.json({
            action: 'collectNewItem'
        });
    }else{
        const item = await AppraisalItem.findOne({
            where: {
                status: 'new'
            }
        });
        if(item){
            const currentUSHour = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"})).getHours();
            // const nextUSHour = currentUSHour + 1;
            const hourStartingTimestamp = new Date().setMinutes(0,0,0);
            // console.log(hourStartingTimestamp)
            const availableData = await Data.findAll({
                where: {
                    device_id: device_id,
                }
            });
            const hourFilteredData = [];
            if(availableData){
                const dataValues = availableData.map(data => data.dataValues);
                for(let i=0;i<dataValues.length;i++){
                    const data = dataValues[i];
                    const timeData = JSON.parse(data.time_data);
                    const autovinActionCount = await AutovinAction.count({
                        where: {
                            timestamp: {
                                [Sequelize.Op.gte]: hourStartingTimestamp,
                            },
                            account_id: data.id,
                        }
                    });
                    console.log(`count: ${autovinActionCount} and id: ${data.id} and hourMax ${timeData[`h${currentUSHour}`]}`);
                    console.log(timeData[`h${currentUSHour}`] > autovinActionCount);
                    if(timeData[`h${currentUSHour}`] > autovinActionCount){
                        hourFilteredData.push(data);
                    }
                }

                if(hourFilteredData.length > 0){
                    const data = hourFilteredData[0];
                    item.status = device_id;
                    await item.save();
                    // response to delete status to every 8th item and delete other
                    const lastEightItems = await AutovinAction.findAll({
                        where: {
                            account_id: data.id,
                        },
                        order: [
                            ['id', 'DESC']
                        ],
                        limit: 7
                    });
                    let deleteStatus = false;
                    console.log(lastEightItems)
                    if(!lastEightItems || lastEightItems.length == 0){
                        deleteStatus = false;
                    }else{
                        for(let i=0;i<lastEightItems.length;i++){
                            const lastItem = lastEightItems[i];
                            if(lastItem.action == 'deleted'){
                                deleteStatus = true;
                                break;
                            }
                        }
                    }
                    res.json({
                        item_id: item.item_id,
                        action: 'workOnItem',
                        data: data,
                        delete: deleteStatus
                    });
                }else{
                    res.json({
                        action: 'tryLaterAgain'
                    });
                }
            }else{
                res.json({
                    action: 'tryLaterAgain'
                });
            }
        }else{
            res.json({
                action: 'tryLaterAgain'
            });
        }
    }
    // const item = await AppraisalItem.findOne({
    //     where: {
    //         status: 'new'
    //     }
    // });
    // if(item){
    //     const currentUSHour = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"})).getHours();

    //     item.status = deviceId;
    //     item.save();
    //     res.json({
    //         item_id: item.item_id,
    //         action: 'workOnItem'
    //     });
    // }else{
    //     const currentTime = getCurrentTime();
    //     if(currentTime - i > waitingTime){
    //         i = currentTime;
    //         res.json({
    //             action: 'collectNewItem'
    //         });
    //     }else{
    //         res.json({
    //             action: 'tryLaterAgain'
    //         });
    //     }
    // }
});
router.post('/itemAppraised', async (req, res) => {
    const deviceId = req.query.deviceId || req.fields.deviceId;
    if(!deviceId){
        res.json({
            action: 'setDeviceId'
        });
        return false;
    }
    await AppraisalItem.destroy({
        where: {
            status: deviceId
        }
    });
    res.json({
        action: 'collectNewItem'
    });
});
router.post('/uploadNewItems', async (req, res) => {
    const device_id = req.query.device_id || req.fields.device_id;
    if(!device_id){
        res.json({
            action: 'setDeviceId'
        });
        return false;
    }
    const item_ids = req.query.item_ids || req.fields.item_ids;
    // const unreadMessageOnChat = req.query.unreadMessageOnChat || req.fields.unreadMessageOnChat;
    //if item_ids array
    console.log(item_ids);
    if(item_ids){
        if(item_ids.length>0){
            let appraisalItemsArray = [];
            for(let i = 0; i < item_ids.length; i++){
                appraisalItemsArray.push({item_id: item_ids[i]}); 
            }
            console.log(appraisalItemsArray)
            await AppraisalItem.bulkCreate(appraisalItemsArray,{
                ignoreDuplicates: true,
                returning: true,
                fields: ['item_id']
            }); 
            // const newAppraisalItemCount = await AppraisalItem.count({
            //     where: {
            //         status: 'new'
            //     }
            // });
            // console.log(newAppraisalItemCount);
            // if(newAppraisalItemCount > 0){
            //     res.json({
            //         action: 'collectNewItem'
            //     });
            //     return true; 
            // }else{
            //     res.json({
            //         action: 'tryLaterAgain'
            //     });
            //     return false;
            // }
        }
    }

    res.json({
        action: 'tryLaterAgain'
    });
});
router.post('/autovinAction', async (req, res) => {
    const {item_id, account_id , action} = req.fields.data||{};
    const timestamp = getCurrentTime();
    if(item_id && account_id && action){
        const autovinAction = await AutovinAction.create({
            item_id: item_id,
            account_id: account_id,
            action: action,
            timestamp: timestamp
        });
        if(autovinAction){
            res.json({
                status: true,
                message: 'Action saved'
            });
        }else{
            res.json({
                status: false,
                message: 'Action not saved'
            });
        }
    }else{
        res.json({
            status: false,
            message: 'Item id, account id and action are required'
        });
    }

});

router.post('/isItemActiveOnChat', async (req, res) => {
    const item_id = req.query.item_id || req.fields.item_id;
    if(item_id){
        const item = await Item.findOne({
            where: {
                item_id: item_id
            }
        });
        if(item){
            res.json({
                status: true,
                item: item,
            });
        }else{
            res.json({
                status: false,
                message: 'Item not found'
            });
        }
    }else{
        res.json({
            status: false,
            message: 'Item id is required'
        });
    }
});
router.post('/setAutomatedOfferMessage', async (req, res) => {
    const item_id = req.query.item_id || req.fields.item_id;
    const messageCode = req.query.messageCode || req.fields.messageCode;
    const variables = req.query.variables || req.fields.variables;
    // console.log(item_id, messageCode, variables);
    const script = await Script.findOne({
        where:{
            code: messageCode
        }
    });
    if(script){
        const rawMessage = script.content;
        let message = rawMessage;
        if(variables){
            const keys = Object.keys(variables);
            for(let i = 0; i < keys.length; i++){
                const key = keys[i];
                message = message.replace(`${key}`, variables[key]);
            }
        }
        // [[key]] ANY MATCH?
        if(message.match(/\[\[.*?\]\]/g)){
            res.json({
                status: false,
                message: 'not enough variables provided'
            });
        }else{
            const item = await Item.findOne({
                where:{
                    item_id: item_id
                }
            });
            if(item){
                const messageQue = await Message.findOne({
                    where: {
                        item_id: item_id,
                        mmc_user: 'vauto_program'
                    }
                });
                if(messageQue){
                    res.json({
                        status: false,
                        message: 'Automated Message already sent'
                    });
                }else{
                    // console.log(`fb id: ${item.fb_id}`);
                    await Message.create({
                        item_id: item_id,
                        sent_from: 'me',
                        message: message,
                        fb_id: item.fb_id,
                        mmc_user: 'vauto_program',
                        type: 'text',
                        status: 'unsent',
                        timestamp: `${new Date().getTime()}`,
                    });
                    res.json({
                        status: true,
                        message: 'Automated Message sent'
                    });
                }
            }else{
                res.json({
                    status: false,
                    message: 'Item not found'
                });
            }
        }
    }else{
        res.json({
            status: false,
            message: 'item found but Script not found'
        });
    }
    
});
// getDashBoardData
router.post('/getDashBoardData', async (req, res) => {
    // geet distinct fb_id from item
    const items = await Item.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('fb_id')), 'fb_id'],
            'fb_user_name'
        ]
    });
    const data = [];
    // const startingTimeOfToday = new Date();
    // startingTimeOfToday.setHours(0,0,0,0);
    // startingTimeOfToday
    for(let i = 0; i < items.length; i++){
        let temp= {};
        temp.fb_id = items[i].fb_id;
        temp.name = items[i].fb_user_name;
        temp.health = '';
        temp.sellerReplies = (await Item.findAll({
            where: {
                fb_id: items[i].fb_id,
                has_unread_message: 1
            },
            attributes: ['item_id']
        })).map(item => item.item_id);
        // temp.firstMessageInHour = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'done',
        //         sent_from: 'me',
        //         mmc_user: null,
        //         timestamp: {
        //             [Sequelize.Op.gt]: new Date().getTime() - 3600000
        //         }
        //     }
        // });
        
        temp.firstMessageInDay = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NULL AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000*24)}'`);
        temp.firstMessageInDay = temp.firstMessageInDay[0][0].id;
        // AND timestamp > '${new Date().getTime() - (3600*1000*24)}'`
        // temp.health = await sequelize.query(`SELECT id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NULL AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000*24)}'`);
        // temp.health = JSON.stringify(temp.health[0].map((item) => item.id));

        temp.firstMessageInHour = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NULL AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000)}'`);
        temp.firstMessageInHour = temp.firstMessageInHour[0][0].id;

        temp.repliesInday = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NOT NULL AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000*24)}'`);
        temp.repliesInday = temp.repliesInday[0][0].id;

        temp.repliesInHour = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NOT NULL AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000)}'`);
        temp.repliesInHour = temp.repliesInHour[0][0].id;

        temp.totalSentInDay = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000*24)}'`);
        temp.totalSentInDay = temp.totalSentInDay[0][0].id;

        temp.totalSentInHour = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND status = 'done' AND timestamp > '${new Date().getTime() - (3600*1000)}'`);
        temp.totalSentInHour = temp.totalSentInHour[0][0].id;

        temp.quedFirstMessage = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NULL AND status = 'unsent'`);
        temp.quedFirstMessage = temp.quedFirstMessage[0][0].id;

        temp.quedReplies = await sequelize.query(`SELECT COUNT(id) as id FROM messages WHERE sent_from = 'me' AND fb_id = '${items[i].fb_id}' AND mmc_user IS NOT NULL AND status = 'unsent'`);
        temp.quedReplies = temp.quedReplies[0][0].id;

        // temp.repliesInHour = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'done',
        //         sent_from: 'me',
        //         mmc_user: {
        //             [Sequelize.Op.not]: null
        //         },
        //         timestamp: {
        //             [Sequelize.Op.gt]: new Date().getTime() - 3600000
        //         }
        //     }
        // });
        // temp.repliesInday = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'done',
        //         sent_from: 'me',
        //         mmc_user: {
        //             [Sequelize.Op.not]: null
        //         },
        //         timestamp: {
        //             [Sequelize.Op.gt]: new Date().getTime() - (3600000*24)
        //         }
        //     }
        // });

        // temp.totalSentInHour = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'done',
        //         sent_from: 'me',
        //         timestamp: {
        //             [Sequelize.Op.gt]: new Date().getTime() - (3600000)
        //         } 
        //     }
        // });
        // temp.totalSentInDay = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'done',
        //         sent_from: 'me',
        //         timestamp: {
        //             [Sequelize.Op.gt]: new Date().getTime() - (3600000*24)
        //         } 
        //     }
        // });
        // temp.quedFirstMessage = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'unsent',
        //         sent_from: 'me',
        //         mmc_user: null
        //     }
        // });
        // temp.quedReplies = await Message.count({
        //     where: {
        //         fb_id: items[i].fb_id,
        //         status: 'unsent',
        //         sent_from: 'me',
        //         mmc_user: {
        //             [Sequelize.Op.not]: null
        //         }
        //     }
        // });
        data.push(temp);
    }
    

    // console.log(items.length);
    res.json(data);
});
// collectedNewMessageFromChat
router.post('/collectedNewMessageFromChat', async (req, res) => {
    await Action.create({
        action: 'new_message',
        timestamp: `${getCurrentTime()}`
    });
    res.json({});
});


router.get('/get-all-users-with-data', async (req, res, next) => {
    try {
        const data = await Data.findAll({});
        res.json(data);
    } catch (err) {
        next(err);
    }
});
router.post('/update-data/:id', async (req, res, next) => {
    try {
        const { id } = (req.params);
        const { username, password, time_data, current, max, display_name,device_id } = req.fields;
        const data = await Data.findOne({
            where: {
                id,
            },
        });
        // show data values only
        // console.log(data.dataValues);
        if (!data)
            throw new ExpressError(404, "Data not found");
        const updatedData = await data.update({
            username,
            password,
            time_data: JSON.stringify(time_data),
            current,
            max,
            display_name,
            device_id
        });

        res.json({
            message: "Data updated",
        });
    } catch (err) {
        // console.log(err);
        next(err);
    }
});
router.post('/autovinAction', async (req, res, next) => {
    try {
        const { action, item_id, account_id } = req.fields;
        const data = await AutovinAction.create({
            action,
            item_id,
            account_id,
            timestamp: `${getCurrentTime()}`
        });
        res.json({
            message: "Action added",
        });
    } catch (err) {
        // console.log(err);
        next(err);
    }
});
router.post('/getLaserAutovinActivities', async (req, res) => {
    const fieldRepActivities = await AutovinAction.findAll({
        attributes:[
            'account_id',
            'timestamp',
        ],
        sort: [
            ['timestamp', 'ASC']
        ],
        where: {
            timestamp:{
                [Sequelize.Op.gt]: new Date().getTime() - 1000 * 60 * 60 * 8
            }
        }
    });
    const dataValues = fieldRepActivities.map(item => item.dataValues);
    const accountIdsplayNames = await Data.findAll({
        attributes: [
            'id',
            'display_name'
        ]
    });
    const accountIdsplayNamesValues = accountIdsplayNames.map(item => item.dataValues);
    for(let i = 0; i < dataValues.length; i++){
        const user = accountIdsplayNamesValues.filter(item => item.id == dataValues[i].account_id);
        console.log(user)
        dataValues[i].mmc_user = (user[0]||{display_name:'deleted_user'}).display_name;
    }
    const messageActivities = [];
    res.json({fieldRepActivities, messageActivities});

})
module.exports = router;
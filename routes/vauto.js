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
const getCurrentTime = ()=>{
    return new Date().getTime();
};
const waitingTime = 300*1000;
let i = 0;

router.post('/getNewItemId', async (req, res) => {
    const deviceId = req.query.deviceId || req.fields.deviceId;
    if(!deviceId){
        res.json({
            action: 'setDeviceId'
        });
        return false;
    }else{
        await AppraisalItem.destroy({
            where: {
                status: deviceId
            }
        });
    }
    const item = await AppraisalItem.findOne({
        where: {
            status: 'new'
        }
    });
    if(item){
        item.status = deviceId;
        item.save();
        res.json({
            item_id: item.item_id,
            action: 'workOnItem'
        });
    }else{
        const currentTime = getCurrentTime();
        if(currentTime - i > waitingTime){
            i = currentTime;
            res.json({
                action: 'collectNewItem'
            });
        }else{
            res.json({
                action: 'tryLaterAgain'
            });
        }
    }
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
    const deviceId = req.query.deviceId || req.fields.deviceId;
    if(!deviceId){
        res.json({
            action: 'setDeviceId'
        });
        return false;
    }
    const item_ids = req.query.item_ids || req.fields.item_ids;
    const unreadMessageOnChat = req.query.unreadMessageOnChat || req.fields.unreadMessageOnChat;
    //if item_ids array
    if(item_ids){
        if(item_ids.length>0){
            let appraisalItemsArray = [];
            for(let i = 0; i < item_ids.length; i++){
                appraisalItemsArray.push({item_id: item_ids[i]}); 
            }
            await AppraisalItem.bulkCreate(appraisalItemsArray,{
                ignoreDuplicates: true,
                returning: true,
                fields: ['item_id']
            }); 
            const newAppraisalItemCount = await AppraisalItem.count({
                where: {
                    status: 'new'
                }
            });
            // console.log(newAppraisalItemCount);
            if(newAppraisalItemCount > 0){
                res.json({
                    action: 'collectNewItem'
                });
                return true; 
            }else{
                res.json({
                    action: 'tryLaterAgain'
                });
                return false;
            }
        }
    }

    res.json({
        action: 'tryLaterAgain'
    });
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
module.exports = router;
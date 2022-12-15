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
            console.log(newAppraisalItemCount);
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
    console.log(item_id, messageCode, variables);
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
module.exports = router;
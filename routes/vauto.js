const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
// const Message = require('../models/Message');
const Sequelize = require('sequelize');
const sequelize = require('../configs/database');
const AppraisalItem = require('../models/AppraisalItem');

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
module.exports = router;
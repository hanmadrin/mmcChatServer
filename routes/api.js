const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
const Message = require('../models/Message');
const Item = require('../models/Item');
const RawItem = require('../models/RawItem');
const Script = require('../models/Script');
const env = require('dotenv').config();
const Sequelize = require('sequelize');

router.post('/collectRawItems', async (req, res) => {

    res.sendStatus(200);
});
router.post('/uploadRawItems', async (req, res) => {
    const rawItems = req.fields.items;
    let rawItemsArray = [];
    for(let i = 0; i < rawItems.length; i++){
        rawItemsArray.push({item_id: rawItems[i]}); 
    }
    await RawItem.bulkCreate(rawItemsArray,{
        ignoreDuplicates: true,
        returning: true,
        fields: ['item_id']
    });
    res.sendStatus(200);
});

router.post('/facebookAccounts', async (req, res) => {
    const items = await Item.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('fb_id')) ,'fb_id'],
            'fb_user_name',
        ],
    });
    res.json(items);
});
router.post('/facebookAccountsWithDetails', async (req, res) => {
    const items = await Item.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('fb_id')) ,'fb_id'],
            'fb_user_name',
        ],
    });
    for(let i = 0; i < items.length; i++){
        items[i].dataValues.total = await Item.count({
            where: {
                fb_id: items[i].fb_id
            }
        });
        items[i].dataValues.unseen = await Item.count({
            where: {
                fb_id: items[i].fb_id,
                has_unread_message: true
            }
        });
    }
    res.json(items);
});
router.post('/facebookAccountItemCount', async (req, res) => {
    const fb_id = req.fields.fb_id;
    const itemsCount = await Item.count({
        where: {
            fb_id: fb_id         
        }
    });
    console.log(itemsCount);
    res.json({count: itemsCount});
});
// accountMessages
router.post('/accountMessages', async (req, res) => {
    const fb_id = req.fields.fb_id;
    const userName = req.fields.userName;
    const fb_user_nameData = await Item.findOne({
        where: {
            fb_id: fb_id
        },
        attributes: [
            'fb_user_name'
        ]
    });
    if(fb_user_nameData){
        const fb_user_name = fb_user_nameData.fb_user_name;
        const items = await Item.findAll({
            where: {
                fb_id: fb_id
            },
            attributes: [
                'item_id',
                'has_unread_message',
            ]
        });
        res.json({items, fb_user_name});
    }else{
        res.json({items:[], fb_user_name:null});
    }
    
});
// singleItemMessage
router.post('/singleItemMessage', async (req, res) => {
    const force = req.fields.force;
    const userName = req.fields.userName;
    const item_id = req.fields.item_id;
    const mainTask = async (currentUser) => {
        const now = new Date().getTime();
        await Item.update({
            has_unread_message: false,
            last_owner_name: userName,
            last_owner_timestamp: now
        },{
            where: {
                item_id: item_id
            }
        });
        const messages = await Message.findAll({
            where: {
                item_id: item_id
            },
            attributes: [
                'message',
                'sent_from',
                'mmc_user',
                'timestamp',
                'status',
                'type'
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.json({messages, has_last_owner: false, current_user: currentUser,item_id});
    };
    if(force){
        await mainTask();
    }else{
        const item = await Item.findOne({
            where: {
                item_id: item_id
            },
            attributes: [
                'last_owner_name',
                'last_owner_timestamp'
            ]
        });
        if(item.last_owner_name == userName){
            await mainTask();
        }else{
            const fiveMin = 5 * 60 * 1000;
            const now = new Date().getTime();
            if(now - item.last_owner_timestamp < fiveMin){
                res.json({has_last_owner: true,current_user_name: item.last_owner_name});
            }else{
                await mainTask();
            }
        }
    }
});
// messageScript
router.post('/messageScript', async (req, res) => {
    const scripts = await Script.findAll({
        attributes: [
            'content',
            'code'
        ]
    });
    res.json(scripts);
});
router.get('/socket', (req, res) => {
    webSocket.sockets.emit('chat', {handle: 'yuiyi', message: 'Welcome to the chat app'});
    res.sendStatus(200);
});



module.exports = router;
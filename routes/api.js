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
        const length = items.length;
        for(let i = 0; i < length; i++){
            const message = await Message.findOne({
                where: {
                    item_id: items[i].item_id
                },
                order: [
                    ['id', 'DESC']
                ],
                attributes: [
                    'sent_from',
                ]
            });
            // console.log(message?message.sent_from:message);
            if(message){
                const sent_from = message.sent_from;
                items[i].dataValues.last_message = sent_from;
            }else{
                items[i].dataValues.last_message = 'undefined';
            }
        }
        res.json({items, fb_user_name});
    }else{
        res.json({items:[], fb_user_name:null});
    }
    
});
// singleItemMessage-SOCKET
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
        const item = await Item.findOne({
            where: {
                item_id: item_id
            },
            attributes: [
                'fb_id',
            ]
        });
        if(item){
            const lastMessage = await Message.findOne({
                where: {
                    item_id: item_id
                },
                order: [
                    ['id', 'DESC'],
                ],
                attributes: [
                    'sent_from',
                ]
            });
            let last_message = 'undefined';
            if(lastMessage){
                last_message = lastMessage.sent_from;
            }
            webSocket.to(`fb_id_${item.fb_id}`).emit('response', {
                action: 'messageIsSeen',
                data:{
                    item_id: item_id,
                    last_message: last_message
                }
            });
        }
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
// messageScript-SOCKET
router.post('/messageScript', async (req, res) => {
    const scripts = await Script.findAll({
        attributes: [
            'content',
            'code'
        ]
    });
    res.json(scripts);
});
// sendMessage--SOCKET
router.post('/sendMessage', async (req, res) => {
    const item_id = req.fields.item_id;
    const fb_id = req.fields.fb_id;
    const message = req.fields.message;
    const sent_from = "me";
    const mmc_user = req.fields.userName;
    const timestamp = new Date().getTime();
    const status = "unsent";
    const type = "text";
    const messageData = {
        fb_id,
        item_id,
        message,
        sent_from,
        mmc_user,
        timestamp,
        status,
        type
    };
    await Message.create(messageData);
    webSocket.to(`fb_id_${fb_id}`).emit('response', {
        action: 'notifyLastMessageFromMe',
        data:{
            item_id,
            fb_id
        }
    });
    webSocket.to(`item_id_${item_id}`).emit('response', {
        action: 'newMessageFromMe',
        data:{
            fb_id,
            item_id,
            message,
            sent_from,
            mmc_user,
            type
        }
    });
    res.json({});
});
// itemsView
router.post('/viewItemsServerIds', async (req, res) => {
    let page = req.fields.page;
    const items = await Item.findAll({
        limit: 50,
        pagination: true,
        offset: (page-1) * 50,
        attributes: [
            'item_id',
        ]
    });

    res.json(items);
});
// deleteItemFromServer
router.post('/deleteItemFromServer', async (req, res) => {
    const item_id = req.fields.item_id;
    await Item.destroy({
        where: {
            item_id: item_id
        }
    });
    await Message.destroy({
        where: {
            item_id: item_id
        }
    });
    res.json({});
});
router.get('/socket', (req, res) => {
    webSocket.sockets.emit('chat', {handle: 'yuiyi', message: 'Welcome to the chat app'});
    res.sendStatus(200);
});


module.exports = router;
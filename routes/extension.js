const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
// const Message = require('../models/Message');
const Sequelize = require('sequelize');
const Item = require('../models/Item');
const RawItem = require('../models/RawItem');
const Script = require('../models/Script');
const Message = require('../models/Message');

router.post('/unseenMessageIDs', async (req, res) => {
    const unseenMessageIDs = req.fields.ids;
    let unknownIds = [];
    for(let i = 0; i < unseenMessageIDs.length; i++){
        const item = await Item.findOne({
            where: {
                fb_message_id: unseenMessageIDs[i],
                fb_id : req.fields.fb_id
            },
            attributes: ['fb_post_id']
        });
        if(item){
            postIds.push(item.fb_post_id);
        }
    }
    res.status(200).json(postIds);
});
router.post('/newPostId', async (req, res) => {
    if(req.fields.fb_id && req.fields.fb_user_name){
        const rawItem = await RawItem.findOne({
            where: {
                taken: false
            },
            attributes: ['item_id'],
        });
        // update as taken
        if(rawItem){
            await RawItem.update({
                taken: true
            },{
                where: {
                    item_id: rawItem.item_id
                }
            });
            const newItem = await Item.create({
                item_id: rawItem.item_id,
                fb_id: req.fields.fb_id,
                fb_user_name: req.fields.fb_user_name,
            });
            // console.log(newItem);
            res.json(newItem);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.status(201).json({message: 'Extension is not providing fb Id or User name'});
    }
    
    

    // console.log(rawItem.item_id);
    
});
router.post('/firstMessageText', async (req, res) => {
    const message = await Script.findOne({
        where: {
            code: 'initialMessage'
        },
        attributes: ['content']
    });
    res.json(message.content);
});
router.post('/saveFirstMessageAction', async (req, res) => {
    const message  = await Message.findOne({
        where: {
            item_id: req.fields.item_id
        }
    });
    const timeStamp = parseInt(new Date().getTime());
    const initialMessageScript = await Script.findOne({
        where: {
            code: 'initialMessage'
        }
    });
    if(!message){
        await Message.create({
            item_id: req.fields.item_id,
            message: initialMessageScript.content,
            timestamp: `${timeStamp}`,
            type: 'text',
            sent_from: 'me',
            fb_id: req.fields.fb_id,
            status: 'done'
        });
    }
    await Item.update({
        last_auto_step: 'initialMessage',
        last_auto_timestamp: `${timeStamp}`,
        fb_post_id : req.fields.fb_post_id,
    },{
        where: {
            item_id: req.fields.item_id
        }
    });
    res.sendStatus(200);
});
router.post('/getItemIdByMessageId',async (req, res) => {
    const item = await Item.findOne({
        where: {
            fb_message_id: req.fields.fb_message_id
        },
        attributes: ['item_id']
    });
    if(item){
        res.json({item_id:item.item_id});
    }else{
        res.json({item_id:null});
    }
});
router.post('/isValidMessageId', async (req, res) => {
    const fb_post_id = req.fields.fb_post_id;
    const fb_message_id = req.fields.fb_message_id;
    const fb_id = req.fields.fb_id;
    const item = await Item.findOne({
        where: {
            fb_post_id: fb_post_id,
            fb_id:  fb_id
        }
    });
    if(item){
        await item.update({
            fb_message_id: fb_message_id
        },{
            where: {
                fb_post_id: fb_post_id
            }
        });
        res.json({valid: true});
    }else{
        res.json({valid: false});
    }

});
router.post('/lastMessageOnServerByPostId', async (req, res) => {
    const fb_post_id = req.fields.fb_post_id;
    const item = await Item.findOne({
        where: {
            fb_post_id: fb_post_id
        },
        attributes: ['item_id']
    });
    if(item){
        const message = await Message.findOne({
            where: {
                item_id: item.item_id,
                status: 'done'
            },
            attributes: ['message'],
            order: [
                ['id', 'DESC']
            ]
        });
        if(message){
            res.json(message);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
});
router.post('/itemIdByPostId', async (req, res) => {
    const fb_post_id = req.fields.fb_post_id;
    const item = await Item.findOne({
        where: {
            fb_post_id: fb_post_id
        },
        attributes: ['item_id']
    });
    if(item){
        res.json(item);
    }else{
        res.sendStatus(404);
    }
});
router.post('/sendMessagesToServer',async (req, res) => {
    const messages = req.fields.messageData;
    for(let i = 0; i < messages.length; i++){
        await Message.create(messages[i]);
    }
    if(messages.length > 0){
        const item_id = messages[0].item_id;
        await Item.update({
            has_unread_messages: true
        },{
            where: {
                item_id: item_id
            }
        });
    }
    res.json({});
});
router.post('/getUnsentMessagePostIds', async (req, res) => {
    const fb_id = req.fields.fb_id;
    // const fb_id = '100006781114329';
    const items = await Message.findAll({
        where: {
            fb_id: fb_id,
            status: 'unsent'
        },
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('item_id')) ,'item_id']
        ],
    });
    const item_ids = items.map(item => item.item_id);
    // get post ids from items
    const post_ids = await Item.findAll({
        where: {
            item_id: {
                [Sequelize.Op.in]: item_ids
            }
        },
        attributes: ['fb_post_id']
    });
    const post_ids_array = post_ids.map(post => post.fb_post_id);
    res.json({post_ids:post_ids_array})
});
router.post('/getUnsentMessagesByPostId', async (req, res) => {
    const fb_post_id = req.fields.fb_post_id;
    const item = await Item.findOne({
        where: {
            fb_post_id: fb_post_id
        },
        attributes: ['item_id']
    });
    if(item){
        const messages = await Message.findAll({
            where: {
                item_id: item.item_id,
                status: 'unsent'
            },
            attributes: ['id','message'],
            order: [
                ['id', 'ASC']
            ]
        });
        res.json({messages:messages});
    }else{
        res.json({messages:[]});
    }
});
router.post('/markMessageAsSent', async (req, res) => {
    const message_id = req.fields.message_id;
    await Message.update({
        status: 'done'
    },{
        where: {
            id: message_id
        }
    });
    res.json({});
});
router.post('/serverLinkGoneUpdate', async (req, res) => {
    const item_id = req.fields.item_id;
    await Item.update({
        last_auto_step: 'linkGone',
    },{
        where: {
            item_id: item_id
        }
    });
});
module.exports = router;
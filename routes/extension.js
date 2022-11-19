const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
// const Message = require('../models/Message');
const Sequelize = require('sequelize');
const sequelize = require('../configs/database');
const Item = require('../models/Item');
const RawItem = require('../models/RawItem');
const Script = require('../models/Script');
const Message = require('../models/Message');
const ArchiveItem = require('../models/ArchiveItem');
const ArchiveMessage = require('../models/ArchiveMessage');
const Account = require('../models/Account');
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
// hasNewRawItem
router.post('/hasNewRawItem', async (req, res) => {
    const raw = await RawItem.findOne({
        where: {
            taken: false
        },
        attributes: ['item_id'],
    });
    if(raw){
        res.json({
            status: true,
            item_id: raw.item_id
        })
    }else{
        res.json({status:false})
    }
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
            // const message = await Script.findOne({
            //     where: {
            //         code: 'initialMessage'
            //     },
            //     attributes: ['content'],
            //     order: sequelize.random()
            // });
            // const timeStamp = parseInt(new Date().getTime());

            // await Message.create({
            //     item_id: rawItem.item_id,
            //     message: req.fields.messageText?req.fields.messageText:initialMessageScript.content,
            //     timestamp: `${timeStamp}`,
            //     type: 'text',
            //     sent_from: 'me',
            //     fb_id: req.fields.fb_id,
            //     status: 'done'
            // });

            // await Item.update({
            //     last_auto_step: 'initialMessage',
            //     last_auto_timestamp: `${timeStamp}`,
            //     fb_post_id : req.fields.fb_post_id,
            // },{
            //     where: {
            //         item_id: req.fields.item_id
            //     }
            // });
            // console.log(newItem);
            res.json(newItem);
        }else{
            res.json({});
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
        attributes: ['content'],
        order: sequelize.random()
    });
    res.json(message.content);
});
router.post('/initiateItemMessaging', async (req, res) => {
    const item_id = req.fields.item_id;
    const fb_id = req.fields.fb_id;
    const fb_user_name = req.fields.fb_user_name;
    const fb_post_id = req.fields.fb_post_id;
    const timeStamp = parseInt(new Date().getTime());
    const transaction = await sequelize.transaction();
    if(item_id && fb_id && fb_user_name && fb_post_id){
        const newItem = await Item.create({
            item_id: item_id,
            fb_id: fb_id,
            fb_user_name: fb_user_name,
            last_auto_step: 'initialMessage',
            last_auto_timestamp: `${timeStamp}`,
            fb_post_id : fb_post_id,
        },transaction);
        const firstMessage = await Script.findOne({
            where: {
                code: 'initialMessage'
            },
            attributes: ['content'],
            order: sequelize.random(),
            transaction: transaction
        });
        const message = await Message.create({
            item_id: item_id,
            message: firstMessage.content,
            timestamp: `${timeStamp}`,
            type: 'text',
            sent_from: 'me',
            fb_id: fb_id,
            status: 'unsent'
        },transaction);
        res.json({
            status: true,
            item_id: item_id,
            message: firstMessage.content,
            id: message.id,
            fb_post_id: fb_post_id
        });
        await transaction.commit();
    }else{
        await transaction.commit();
        res.json({status: false,message:'noItem'});
    }
    
});
router.post('/saveFirstMessageAction', async (req, res) => {
    const message  = await Message.findOne({
        where: {
            item_id: req.fields.item_id
        }
    });
    const timeStamp = parseInt(new Date().getTime());
    // select one random

    const initialMessageScript = await Script.findOne({
        where: {
            code: 'initialMessage'
        },
        order: sequelize.random()
    });
    if(!message){
        await Message.create({
            item_id: req.fields.item_id,
            message: req.fields.messageText?req.fields.messageText:initialMessageScript.content,
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
    const archiveItem = await ArchiveItem.findOne({
        where: {
            fb_post_id: fb_post_id,
            fb_id: fb_id
        }
    });
    const item = await Item.findOne({
        where: {
            fb_post_id: fb_post_id,
            fb_id:  fb_id
        }
    });
    if(archiveItem){
        await item.update({
            fb_message_id: fb_message_id
        },{
            where: {
                fb_post_id: fb_post_id
            }
        });
    }
    if(item){
        await item.update({
            fb_message_id: fb_message_id
        },{
            where: {
                fb_post_id: fb_post_id
            }
        });
    }
    if(archiveItem || item){
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
// hasRepliesToSend
router.post('/hasRepliesToSend', async (req, res) => {
    const fb_id = req.fields.fb_id;
    console.log(fb_id)
    const transaction = await sequelize.transaction();
    const unsentMessage = await Message.findOne({
        where: {
            fb_id: fb_id,
            status: 'unsent',
            // mmc_user is not null
            mmc_user: {
                [Sequelize.Op.not]: null
            },
        },
        transaction: transaction
    });
    if(unsentMessage){
        const item_id = unsentMessage.item_id;
        const message = await Message.findOne({
            where: {
                item_id: item_id,
                status: 'unsent',
            },transaction
        });
        const item = await Item.findOne({
            where: {
                item_id: item_id
            },transaction
        });
        res.json({
            status: true,
            item_id: item_id,
            message: message.message,
            id: message.id,
            fb_post_id: item.fb_post_id
        });
        await transaction.commit();
    }else{
        await transaction.commit();
        res.json({status: false,message:'noItem'});
    }
});
router.post('/hasUnsentFirstMessage', async (req, res) => {
    const fb_id = req.fields.fb_id;
    // where first message unsent
    const transaction = await sequelize.transaction();
    const messageDB = await sequelize.query(`SELECT * FROM ( SELECT * FROM messages GROUP BY item_id HAVING COUNT(*) = 1 ) AS unique_item_id_group WHERE unique_item_id_group.fb_id='${fb_id}' AND unique_item_id_group.status='unsent' AND unique_item_id_group.mmc_user IS NULL LIMIT 1`,{transaction});
    if(messageDB.length > 0){
        const item_id = messageDB[0][0].item_id;
        const message = messageDB[0][0].message;
        const id = messageDB[0][0].id;
        const item = await Item.findOne({
            where: {
                item_id: item_id,
            },
            attributes: ['fb_post_id'],
            transaction,
        });
        const fb_post_id = item.fb_post_id;
        
        res.json({
            status: true,
            item_id: item_id,
            message: message,
            id: id,
            fb_post_id: fb_post_id
        });
        await transaction.commit();
    }else{
        await transaction.commit();
        res.json({status: false,message:'noItem'});
    }
});
// hasSecondMessageToSend
router.post('/hasSecondMessageToSend', async (req, res) => {
    const fb_id = req.fields.fb_id;
    // where only first message done
    const time = parseInt(new Date().getTime());
    const threedays = 1000 * 60 * 60 * 24 * 3;
    const threeDaysAgo = time - threedays;
    const item = await sequelize.query(`SELECT item_id FROM ( SELECT * FROM messages GROUP BY item_id HAVING COUNT(*) = 1 ) AS unique_item_id_group WHERE unique_item_id_group.fb_id='${fb_id}' AND unique_item_id_group.timestamp < '${threeDaysAgo}' AND unique_item_id_group.item_id IN (SELECT item_id from items WHERE items.last_auto_step='initialMessage') `);
    if(item.length > 0){
        res.json({status: true,item_id: item[0].item_id});
    }else{
        res.json({status: false});
    }
});

router.get('/test', async (req, res) => {
    // const fb_id = req.params.fb_id;
    // const time = parseInt(new Date().getTime());
    // const threedays = 1000 * 60 * 60 * 24 * 3;
    // const threeDaysAgo = time - threedays;
    // const item = await sequelize.query(`SELECT item_id FROM ( SELECT * FROM messages GROUP BY item_id HAVING COUNT(*) = 1 ) AS unique_item_id_group WHERE unique_item_id_group.fb_id='${fb_id}' AND unique_item_id_group.timestamp < '${threeDaysAgo}' AND unique_item_id_group.item_id IN (SELECT item_id from items WHERE items.last_auto_step='initialMessage') `, { type: sequelize.QueryTypes.SELECT });
    // if(item.length > 0){
    //     res.json({status: true,item_id: item[0].item_id});
    // }else{
    //     res.json({status: false});
    // }
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
// postIdByItemId
router.post('/postIdByItemId', async (req, res) => {
    const item_id = req.fields.item_id;
    const item = await Item.findOne({
        where: {
            item_id: item_id
        },
        attributes: ['fb_post_id']
    });
    if(item){
        res.json(item);
    }else{
        res.sendStatus(404);
    }
});
// setSecondMessage
router.post('/setSecondMessage', async (req, res) => {
    const item_id = req.fields.item_id;
    const fb_id = req.fields.fb_id;
    const timeStamp = parseInt(new Date().getTime());
    const secondMessageScript = await Script.findOne({
        where: {
            code: 'secondMessage'
        }
    });
    await Message.create({
        item_id: item_id,
        message: secondMessageScript.content,
        timestamp: `${timeStamp}`,
        type: 'text',
        sent_from: 'me',
        fb_id: fb_id,
        status: 'unsent'
    });
    await Item.update({
        last_auto_step: 'secondMessage',
        last_auto_timestamp: `${timeStamp}`,
    },{
        where: {
            item_id: item_id
        }
    });
    res.json({status: true});
});
// need socket

router.post('/sendMessagesToServer',async (req, res) => {
    const newMessages = req.fields.messageData;
    if(newMessages.length > 0){
        const item_id = newMessages[0].item_id;
        const archiveItem = await ArchiveItem.findOne({where: {item_id: item_id}});
        const item = await Item.findOne({where: {item_id: item_id}});
        let restored = false;
        if(archiveItem){
            const archiveMessages = await ArchiveMessage.findAll({where: {item_id: item_id}});
            const sent_from_seller = newMessages.filter(message => message.sent_from === 'seller').length > 0;
            if(sent_from_seller){
                delete archiveItem.dataValues.id;
                const item = archiveItem.dataValues;
                console.log(item);
                let messages = [];
                for(let i = 0; i < archiveMessages.length; i++){
                    delete archiveMessages[i].dataValues.id;
                    messages.push(archiveMessages[i].dataValues);
                }
                for(let i = 0; i < newMessages.length; i++){
                    messages.push(newMessages[i]);
                }
                const transaction = await sequelize.transaction();
                try {
                    console.log(messages);
                    restored = true;
                    await Item.create(item, {transaction: transaction});
                    await ArchiveItem.destroy({
                        where: {
                            item_id: item_id
                        },
                        transaction: transaction
                    });
                    await Message.bulkCreate(messages, {transaction: transaction});

                    await ArchiveMessage.destroy({
                        where: {
                            item_id: item_id
                        },
                        transaction: transaction
                    });
                    await transaction.commit();
                } catch (error) {
                    console.log('error occured');
                    console.log(error);
                }

            }else{
                res.json({restored:restored});
                return;
            }
        }else if(item){
            for(let i = 0; i < newMessages.length; i++){
                if(newMessages[i].sent_from == 'seller'){
                    await Message.create(newMessages[i]);
                    webSocket.to(`item_id_${newMessages[i].item_id}`).emit('response',{
                        action: 'sellerSentNewMessage',
                        data: newMessages[i]
                    });
                    webSocket.to(`fb_id_${newMessages[i].fb_id}`).emit('response',{
                        action: 'notifySellerNewMessage',
                        data:{
                            item_id: newMessages[i].item_id,
                        }
                    });
                }
            }
            await Item.update({
                has_unread_message: true
            },{
                where: {
                    item_id: item_id
                }
            });
        }
    }
    res.json({});
});
router.post('/getUnsentMessagePostIds', async (req, res) => {
    const fb_id = req.fields.fb_id;
    const items = await Message.findAll({
        where: {
            fb_id: fb_id,
            status: 'unsent'
        },
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('item_id')) ,'item_id']
        ],
    });
    let item_ids = items.map(item => item.item_id);
    const post_ids = await Item.findAll({
        limit:1,
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
// markItemMessagesdone
router.post('/markItemMessagesDone', async (req, res) => {
    const item_id = req.fields.item_id;
    await Message.destroy({
        where: {
            item_id: item_id,
            status: 'unsent'
        }
    });
    await ArchiveMessage.destroy({
        where: {
            item_id: item_id,
            status: 'unsent'
        }
    });
    res.json({});
});
router.post('/getAccountControlByDeviceId', async (req, res) => {
    const account = await Account.findOne({
        where: {
            deviceId: req.fields.deviceId
        }
    });
    res.json(account);
});
router.post('/serverLinkGoneUpdate', async (req, res) => {
    const item_id = req.fields.item_id;
    // await Item.update({
    //     last_auto_step: 'linkGone',
    // },{
    //     where: {
    //         item_id: item_id
    //     }
    // });
    await Item.destroy({
        where: {
            item_id: item_id
        }
    });
    await ArchiveItem.destroy({
        where: {
            item_id: item_id
        }
    });
    await Message.destroy({
        where: {
            item_id: item_id
        }
    });
    await ArchiveMessage.destroy({
        where: {
            item_id: item_id
        }
    });
    webSocket.to(`fb_id_${item_id}`).emit('response', {
        action: 'itemRemoved',
        data:{
            item_id,
            fb_id
        }
    });
    res.json({});
});
module.exports = router;
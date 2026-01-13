const express = require('express');
const router = express.Router();
const Meta = require('../models/Meta');
const Message = require('../models/Message');
const Item = require('../models/Item');
const Action = require('../models/Action');
const ArchiveMessage = require('../models/ArchiveMessage');
const ArchiveItem = require('../models/ArchiveItem');
router.post('/setUrlAI', async (req, res) => {
    const key = 'urlAI';
    const value = req.fields.data;

    let meta = await Meta.findOne({ where: { key } });

    if (meta) {
        await meta.update({ value });
    } else {
        meta = await Meta.create({ key, value });
    }

    res.json({ status: 'success', message: 'URL AI saved!', id: meta.id });
});
router.get('/getUrlAI', async (req, res) => {
    const key = 'urlAI';
    const meta = await Meta.findOne({ where: { key } });
    if (meta) {
        res.json(meta);
    } else {
        res.json(null);
    }
});

router.post('/singleItemMessage', async (req, res) => {
    const item_id = req.fields.item_id;
    const messages = await Message.findAll({
        where: {
            item_id: item_id
        },
        attributes: [
            'message',
            'sent_from',
            'timestamp',
            'status',
            'type',
        ],
        order: [
            ['id', 'ASC']
        ]
    });
    res.json(messages);
});

router.post('/sendMessage', async (req, res) => {
    const item_id = req.fields.item_id;
    const message = req.fields.message;
    const sent_from = "me";
    const mmc_user = "AI";
    const timestamp = new Date().getTime();
    const status = "unsent";
    const type = "text";



    const unsentMessageCount = await Message.count({
        where: {
            item_id: item_id,
            status: 'unsent'
        }
    });
    if (unsentMessageCount > 0) {
        res.json({ status: 'error', message: 'This item already has unsent message!' });
        return;
    }
    const item = await Item.findOne({ where: { item_id: item_id } });
    if (item) {
        await Action.create({
            item_id,
            'action': 'send_message',
            'timestamp': `${new Date().getTime()}`,
            'mmc_user': mmc_user,
        });
        const fb_id = item.fb_id;
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
        res.json({ status: 'success' });
    }else{
        res.json({ status: 'error', message: 'Item not found!' });
    }

});
router.post('/archiveItem', async (req, res) => {
    const item_id = req.fields.item_id;
    const item = await Item.findOne({where: {item_id: item_id}});
    const messages = await Message.findAll({where: {item_id: item_id, status:'done'}});
    if(item){
        delete item.dataValues.id;
        const archiveItem = item.dataValues;
        let archiveMessages = [];
        for(let i = 0; i < messages.length; i++){
            delete messages[i].dataValues.id;
            archiveMessages.push(messages[i].dataValues);
        }
        const transaction = await sequelize.transaction();
        try {
            // console.log(item);
            await ArchiveItem.create(archiveItem, {transaction: transaction});
            await Item.destroy({
                where: {
                    item_id: item_id
                },
                transaction: transaction
            });
            await ArchiveMessage.bulkCreate(archiveMessages, {transaction: transaction});
            await Message.destroy({
                where: {
                    item_id: item_id
                },
                transaction: transaction
            });
            await transaction.commit();
        } catch (error) {
            // console.log(error);
            // console.log('error occured')
        }
    }
    res.json({});
});

module.exports = router;
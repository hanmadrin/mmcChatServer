const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
const Message = require('../models/Message');
const Item = require('../models/Item');
const RawItem = require('../models/RawItem');
const Script = require('../models/Script');
const env = require('dotenv').config();

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
router.get('/socket', (req, res) => {
    webSocket.sockets.emit('chat', {handle: 'yuiyi', message: 'Welcome to the chat app'});
    res.sendStatus(200);
});


module.exports = router;
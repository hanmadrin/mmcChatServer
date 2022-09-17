const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
router.get('/', function(req, res){
    // webSocket.sockets.emit('chat', {handle: '87878', message: 'Welcome to the chat app'});
    webSocket.to('interface').emit('chat',{handle: 'rooservr', message: 'Welcome to the chat app'})
    res.json(webSocket.sockets.adapter.rooms.get('interface')==null?'no socket open':webSocket.sockets.adapter.rooms.get('interface').size);
});


module.exports = router;
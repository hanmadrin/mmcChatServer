const express = require('express');
const router = express.Router();
const {webSocket} = require('../setup');
router.get('/socket', (req, res) => {
    webSocket.sockets.emit('chat', {handle: 'yuiyi', message: 'Welcome to the chat app'});
    res.sendStatus(200);
});


module.exports = router;
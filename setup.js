const express = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(8282);
const webSocket = socket(server);
module.exports = {webSocket, app, express};
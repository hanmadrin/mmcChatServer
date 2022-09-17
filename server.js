const {express, app, webSocket} = require('./setup');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const formidable = require('express-formidable');
app.use(cors());
app.use(cookieParser());
app.use(formidable());
app.use('/api', require('./routes/api'));
app.use('/extension', require('./routes/extension'));
app.use('/socket', require('./routes/socket'));
app.use('/public',express.static('./public'));
app.use('/', (req, res) => {res.sendFile('./public/index.html', {root: __dirname});});

webSocket.on('connection', (socket) => {
    const validRooms = ['interface', 'chat'];
    if(validRooms.includes(socket.handshake.query.room)){
        socket.join(socket.handshake.query.room);
        console.log('socket connected to room: '+socket.handshake.query.room);
    }
    socket.on('chat', async function(data){
        webSocket.sockets.emit('chat', data);
    });
});


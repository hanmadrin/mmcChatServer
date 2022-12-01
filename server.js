const {express, app, webSocket} = require('./setup');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const formidable = require('express-formidable');
app.use(cors());
// app.use(function(req, res,next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//     next();
// });
app.use(cookieParser());
app.use(formidable());
app.use('/api', require('./routes/api'));
app.use('/extension', require('./routes/extension'));
app.use('/vauto', require('./routes/vauto'));
app.use('/socket', require('./routes/socket'));
app.use('/public',express.static('./public'));
app.use('/', (req, res) => {res.sendFile('./public/index.html', {root: __dirname});});

webSocket.on('connection', (socket) => {
    // const validRooms = ['interface', 'chat'];
    // if(validRooms.includes(socket.handshake.query.room)){
    //     socket.join(socket.handshake.query.room);
    //     console.log('socket connected to room: '+socket.handshake.query.room);
    // }
    console.log(socket.id)
    socket.on('update', async function(data){
        const rooms = Array.from(socket.rooms);
        if(data.fb_id){
            let connected = false;
            for(let i = 0; i < rooms.length; i++){
                const room = rooms[i];
                if(room.includes('fb_id_')){
                    if(room != `fb_id_${data.fb_id}`){
                        socket.leave(room);
                    }else{
                        connected = true;
                    }
                }
            }
            if(!connected){
                socket.join(`fb_id_${data.fb_id}`);
            }
        }
        if(data.item_id){
            let connected = false;
            for(let i = 0; i < rooms.length; i++){
                const room = rooms[i];
                if(room.includes('item_id_')){
                    if(room != `item_id_${data.item_id}`){
                        socket.leave(room);
                    }else{
                        connected = true;
                    }
                }
            }
            if(!connected){
                socket.join(`item_id_${data.item_id}`);
            }
        }
        console.log(data);
        console.log(Array.from(socket.rooms));
    });
});


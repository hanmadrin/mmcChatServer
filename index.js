const {express, app, webSocket} = require('./setup');

// Static files
app.use(express.static('public'));
app.use('/api', require('./routes/api'));
// Socket setup & pass server
app.get('/socket', function(req, res){
    webSocket.sockets.emit('chat', {handle: '87878', message: 'Welcome to the chat app'});
    webSocket.sockets.emit('chat/uiosdyft', {handle: '87878', message: 'Welcome to the chat app'});
    res.sendStatus(200);
});
webSocket.on('connection', (socket) => {
    // console.log(socket)
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', async function(data){
        // console.log(data);
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        await sleep(5000);
        webSocket.sockets.emit('chat', {handle: '87878', message: 'lcome to the chat app'});
        webSocket.sockets.emit('chat', data);

    });

});
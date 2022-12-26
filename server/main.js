// Socket server
const {Server} = require('socket.io');
const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    serveClient: false
});

// Messages channels
const Channels = require('./channels.js');
const Logs = require('./logs.js');

// Config
const config = require('./config.json');


// On new client
io.on("connection", (socket) => {
    // Log connection
    console.log(`New Client : ${socket.handshake.address}`);


    // ---- CHAT EVENTS ----
    socket.on('createChannel', (id) => {
        Channels.createChannel(id);
        socket.emit('setMessages', []);
        
        if(config.saveLogs) {
            Logs.saveChannelCreation(id);
        }
    });
    
    socket.on('newMessage', (id, pseudo, message) => {
        io.sockets.emit('globalSetMessage', id, Channels.addMessage(id, pseudo, message));

        if(config.saveLogs) {
            Logs.saveMessage(id, pseudo, message);
        }
    });
    

    // On disconnection
    socket.on("disconnect", () => {
        // Disconnect msg
        console.log(`Client Disconnected : ${socket.handshake.address}`);
    });
});

io.listen(8200);
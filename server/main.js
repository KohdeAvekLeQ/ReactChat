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


// On new client
io.on("connection", (socket) => {
    // Log connection
    console.log(`New Client : ${socket.handshake.address}`);


    // ---- CHAT EVENTS ----
    socket.on('createChannel', (id) => {
        Channels.createChannel(id);
        socket.emit('setMessages', []);
        console.log(`Created channel : ${id}`);
    });

    socket.on('getMessages', (id) => {
        socket.emit('setMessages', Channels.getMessages(id));
        console.log(`Request for messages : ${id}`);
    });

    socket.on('newMessage', (id, pseudo, message) => {
        console.log(`Message on channel : ${id} by ${pseudo} : '${message}'`);
        io.sockets.emit('globalSetMessage', id, Channels.addMessage(id, pseudo, message));
    });
    

    // On disconnection
    socket.on("disconnect", () => {
        // Disconnect msg
        console.log(`Client Disconnected : ${socket.handshake.address}`);
    });
});

io.listen(8200);
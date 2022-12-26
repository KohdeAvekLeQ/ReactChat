// Socket server
import { Server } from 'socket.io';
const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    serveClient: false
});


// On new client
io.on("connection", (socket) => {
    // Log connection
    console.log(`New Client : ${socket.handshake.address}`);


    // ---- CHAT EVENTS ----
    
    

    // On disconnection
    socket.on("disconnect", () => {
        // Disconnect msg
        console.log(`Client Disconnected : ${socket.handshake.address}`);
    });
});

io.listen(8080);
let channels = [];
let ids = [];


// ---- UTILITARY ----
function getChanIndex(id) {
    return channels.findIndex(ch => ch.id === id);
}


// ---- CHANNELS FUNCTIONS ----
// Create channel
function createChannel(id) {
    if(!ids.includes(id)) {
        channels.push({id: id,  messages: []});
        ids.push(id);
    }
} exports.createChannel = createChannel;


// Get msgs
function getMessages(id) {
    return channels[getChanIndex(id)].messages;
} exports.getMessages = getMessages;


// Add message
function addMessage(id, pseudo, message) { 
    let index = getChanIndex(id);
    channels[index].messages.push({sender: pseudo, content: message});
    
    return channels[index].messages;
} exports.addMessage = addMessage;
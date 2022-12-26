// Modules
const fs = require('fs');

// Config for logs
const config = require('./config.json');
let path = config.pathToLogFolder;
let chanFolder = config.channelsFolderInLogs;


// Utilitary
function formatDate(dt = new Date()) {
    return `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
}


// Save functions
function saveChannelCreation(id) {
    let dt = new Date();

    try {
        fs.appendFileSync(`${path}/channels.txt`, `${formatDate(dt)} | Channel created : ${id}\n`);
    } catch (e) {
        console.error(`Error when writing file ${path}/channels.txt !`);
    }
} exports.saveChannelCreation = saveChannelCreation;

function saveMessage(id, pseudo, message) {
    let dt = new Date();

    try {
        fs.appendFileSync(`${path}/${chanFolder}/${id}.txt`, `${formatDate(dt)} | ${pseudo} : '${message}'\n`);
    } catch (e) {
        console.error(`Error when writing file ${path}/${chanFolder}/${id}.txt !`);
    }
} exports.saveMessage = saveMessage;
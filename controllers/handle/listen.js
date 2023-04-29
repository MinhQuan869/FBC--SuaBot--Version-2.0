const { handleMessage, handleCommand, handleCommunication } = require("./event");

async function handleListen(event) {
    switch(event.type) {
        case "message" :
        case "message_reply" :
            handleCommand(event) || handleCommunication(event);
            handleMessage(event);
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = { handleListen };
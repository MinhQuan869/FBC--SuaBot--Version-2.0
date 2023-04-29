/* -------------------------------------------------------
    < EVENTS MODULE > --- < XỬ LÍ SỰ KIỆN NHẬN ĐƯỢC >
-------------------------------------------------------- */

// ----- < [ HÀM ] - XỬ LÍ TIN NHẮN > ----- //
function handleMessage(event) {
    const { threadID, messageID, senderID, body } = event;
    const { api } = global;

    api.markAsReadAll();
    global.usersData.lastSenderID = senderID;
    global.usersData.users.set(senderID, {
        "threadID": threadID,
        "messageID": messageID,
        "messageContent": body,
        "onConversation": false,
        "onCommand": false
    });
}

// ----- < [ HÀM ] - THÊM CÁC GIÁ TRỊ ( SEND - REPLY - REACT ) CHO BIẾN EVENT > ----- //
function getExtraEventProperties(event) {
    const { threadID, messageID, senderID, body } = event;
    const { removeVietnamese, checkMessage } = global.function;
    const { api } = global;
    const extraEventProperties = {
        send: function (message, targetThreadID = null, targetMessageID = null) {
            return new Promise((resolve, reject) => {
                api.sendMessage(message, targetThreadID || threadID, (err) => {
                    if (err) reject(err)
                    else resolve(messageFunctionCallback())
                }, targetMessageID || null);
            });
        },
        reply: function (message) {
            return new Promise((resolve, reject) => {
                api.sendMessage(message, threadID, (err) => {
                    if (err) reject(err);
                    else resolve(messageFunctionCallback());
                }, messageID);
            });
        },
        react: function (emoji) {
            return new Promise((resolve, reject) => {
                api.setMessageReaction(emoji, messageID, (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                }, true);
            });
        }
    };

    const messageFunctionCallback = () => {
        const userData = global.usersData.users.get(senderID);

        if (checkMessage(body.toLowerCase(), ["@" + removeVietnamese(global.botTag).toLowerCase(), "kiki", "/kiki", "bot", "chatbot"])) 
        userData.onCommand = true;
        userData.onConversation = true;

        global.usersData.users.set(senderID, userData);

        setTimeout(() => {
            if (global.usersData.users.get(senderID).messageID != userData.messageID) return;

            userData.onConversation = false;
            userData.onCommand = false;
            global.usersData.users.set(senderID, userData);
        }, 15000);
    };

    return extraEventProperties;
}

// ----- < [ HÀM ] - KIỂM TRA QUYỀN HẠN CỦA NGƯỜI DÙNG > ----- //
function checkPermission(userID) {
    const rankPermission = {
        "ADMINISTRATOR": 5,
        "MODERATOR": 1,
        "USER": 0
    }
    const permission = rankPermission[global.usersInfo[userID].rank];
    
    return permission;
}

// ----- < [ HÀM ] - TÌM KIẾM LỆNH PHÙ HỢP > ----- //
function findCommand(event) {
    const { senderID, body, args, isGroup } = event;
    const { removeVietnamese, checkMessage } = global.function;
    const { onCommand } = global.usersData.users.get(senderID) || false;
    const messageContent = body.toLowerCase();

    for (const item of global.modules.commandsConfig) {
        const commandName = item[0];
        const commandCondition = item[1].condition;
        const commandException = item[1].exception;
        switch (isGroup) {
            case true :
                if ((checkMessage(messageContent, ["@" + removeVietnamese(global.botTag).toLowerCase(), "kiki", "/kiki", "bot", "chatbot"]) || onCommand) &&
                    checkMessage(args.filter(element => !["kiki", "/kiki", "bot", "chatbot"].includes(element) && !("@" + global.botTag).split(" ").includes(element) ).join(" "), commandCondition, commandException))
                    return commandName;
                break;
            case false :
                if (checkMessage(messageContent, commandCondition, commandException)) return commandName;
                break;
        }
    }
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
function handleCommand(event) {
    const { threadID, messageID, senderID, args } = event;
    const { random, stringToArrayInArray } = global.function;
    const { api } = global;
    const commandName = findCommand(event);
    const commandConfig = global.modules.commandsConfig.get(commandName);
    const command = global.modules.commands.get(commandName) || null;

    if (command == null) return false;
    
    const permission = commandConfig.permission;
    const userPermission = checkPermission(senderID);
    if (permission > userPermission) {
        const sentences = [
            "M đ co quyền dùng lệnh 😏",
            "Tuổi cặc dùng lệnh này 😏",
            "M đéo p anh Quân, cúc 😏",
            "Kêu cmm a\nTuoi lon dug lệnh này",
            "Tuoi lon sai tao\nM đ có quyền dùng lenh này 😏"
        ];
        api.setMessageReaction("🚫", messageID, () => {}, true);
        api.sendMessage(sentences[random(0, sentences.length)], threadID, messageID);
        return;
    }

    const pornMode = global.pornMode;
    const commandType = commandConfig.type;
    if (!pornMode && commandType == "porn" && userPermission < 3) {
        const sentences = [
            "Porn con đĩ mẹ mày à?\nbớt dam duc lại đi",
            "Anh t khóa lệnh pỏn r, đừng dâm như con Thy nx",
            "Suýt ngày cứ sex, cúc 😏",
            "pỏn cc?",
            "Dâm dục, cúc hộ t cái 😏",
            "Sex ít thôi 😞",
            "Cút ngay họ t, anh t tắt pỏn r con"
        ];
        api.setMessageReaction("🔞", messageID, () => {}, true);
        api.sendMessage(sentences[random(0, sentences.length)], threadID, messageID);
        return;
    }

    const extraEventProperties = getExtraEventProperties(event);
    Object.assign(event, extraEventProperties);

    try {
        command({
            message: event,
            args: args.filter(element => 
                !stringToArrayInArray(commandConfig.condition).includes(element) &&
                !["kiki", "/kiki", "bot", "chatbot"].includes(element) &&
                !("@" + global.botTag).split(" ").includes(element) )
        });
        
        return true;
    } catch (err) {
        console.log(err);
    }
}

// ----- < [ HÀM ] - TÌM KIẾM PHÉP GIAO TIẾP PHÙ HỢP > ----- //
function findCommunication(event) {
    const { senderID, body, args, isGroup } = event;
    const { removeVietnamese, checkMessage } = global.function;
    const { onConversation } = global.usersData.users.get(senderID) || false;
    const messageContent = body.toLowerCase();

    for (const item of global.modules.communicationsConfig) {
        const communicationName = item[0];
        const communicationCondition = item[1].condition;
        const communicationException = item[1].exception;
        switch (isGroup) {
            case true :
                if ((checkMessage(messageContent, ["@" + removeVietnamese(global.botTag).toLowerCase(), "kiki", "/kiki", "bot", "chatbot"]) || onConversation) &&
                    checkMessage(args.filter(element => !["kiki", "/kiki", "bot", "chatbot"].includes(element) && !("@" + global.botTag).split(" ").includes(element) ).join(" "), communicationCondition, communicationException))
                    return communicationName;
                break;
            case false :
                if (checkMessage(messageContent, communicationCondition, communicationException)) return communicationName;
                break;
        }
    }
}

// ----- < [ HÀM ] - XỬ LÍ GIAO TIẾP > ----- //
function handleCommunication(event) {
    const { senderID, args } = event;
    const communicationName = findCommunication(event);
    const { stringToArrayInArray } = global.function;
    const communicationConfig = global.modules.communicationsConfig.get(communicationName);
    const communication = global.modules.communications.get(communicationName) || null;

    if (communication == null) return false;
    
    const permission = communicationConfig.permission;
    const userPermission = checkPermission(senderID);
    if (permission > userPermission) return false;

    const extraEventProperties = getExtraEventProperties(event);
    Object.assign(event, extraEventProperties);

    try {
        communication({
            message: event,
            args: args.filter(element => 
                !stringToArrayInArray(communicationConfig.condition).includes(element) &&
                !["kiki", "/kiki", "bot", "chatbot"].includes(element) &&
                !("@" + global.botTag).split(" ").includes(element) )
        });

        return true;
    } catch (err) {
        console.log(err);
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    handleMessage,
    handleCommand,
    handleCommunication
}
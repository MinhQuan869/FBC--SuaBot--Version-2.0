/* --------------------------------
    < COMMAND > --- < UNSEND >
-------------------------------- */

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "unsend",
    description: "Lệnh sẽ gỡ tin nhắn của Bot.",
    type: "tool",
    usage: "/kiki gỡ [ REPLY MESSAGE ]",
    condition: ["go", "thuhoi"],
    exception: [],
    permission: 1
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message }) {
    await message.react("⏱");

    const { random } = global.function;
    const errorSentences = [
        "T gỡ đ đc 🙂",
        "Gỡ đ đc tại m đó 🙂",
        "Lỗi cmnr thg ngu 🙂",
        "Djt cụ m lỗi r 🙂"
    ];
    const unfitTypeSentences = [
        "Bố cha cái thg ngu, rep cái tin nhắn m muốn gỡ hộ t 🙂",
        "M đ rep tin nhắn t bt gỡ cc j ?",
        "Ocsloz có cái lệnh cx đ bt dùng, rep tin nhắn hộ ?.",
        "Gỡ cái con mẹ m à? rep? 🙂"
    ];

    if (message.type != "message_reply") {
        message.react("⭕️");
        message.reply(unfitTypeSentences[random(0, unfitTypeSentences.length)]);
        return;
    }

    try {
        const unsendMessage = message.messageReply.messageID;
        api.unsendMessage(unsendMessage, (err) => { 
            if (err) { 
                message.react("⭕️");
                message.reply(errorSentences[random(0, errorSentences.length)]);
            }
            message.react("🔹");
        });
    } catch(error) {
        message.react("⭕️");
        message.reply(errorSentences[random(0, errorSentences.length)]);
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    config,
    onCall
}
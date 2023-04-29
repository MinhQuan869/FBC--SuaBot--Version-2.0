/* ---------------------------------------
    < COMMUNICATION > --- < GREETING >
----------------------------------------- */

// ----- < [ CONFIG ] - THÔNG TIN VỀ PHÉP GIAO TIẾP > ----- //
const config = {
    name: "greeting",
    description: "Giao tiếp - Chào hỏi",
    type: "communication",
    condition: ["hi", "hii", "hello", "chao", "xin chao", "helo"],
    exception: [],
    permission: 0
}

// ----- < [ HÀM ] - XỬ LÍ PHÉP GIAO TIẾP > ----- //
async function onCall({ message }) {
    const { senderID } = message;
    const { random } = global.function;
    const { vocative } = global.usersInfo[senderID];
    const replySentences = [
        "hi " + vocative,
        "hello " + vocative,
        "chào " + vocative + " 😏",
        "Roi roi, chào " + vocative,
        "chào " + vocative + " nhóa 😘",
        "hi con đĩ mẹ m 🙂",
        "chào thg cha m nhá 🙃",
        "Ok tao chào mày 😃",
        "T xin chào m 😃"
    ];
    
    message.reply(replySentences[random(0, replySentences.length)]);
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    config,
    onCall
}
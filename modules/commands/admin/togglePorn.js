/* -----------------------------------------
    < COMMAND > --- < TOGGLE PORN MODE >
------------------------------------------ */

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "togglePorn",
    description: "Lệnh bật / tắt Pỏn Mode.",
    type: "admin",
    usage: "/kiki togglePorn [ OFF / ON ]",
    condition: ["toggleporn", "tporn"],
    exception: [],
    permission: 3
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");

    const { random, checkMessage } = global.function;
    const errorSentences = [
        "Đéo đc đại ka ơi :) lỗi cmnr",
        "Anh ơi em lam déo dc, bị con kac j r",
        "Loi cmnr 🙂 Ad ngu",
        "Loi roi thg ngu 🙂",
        "Anh Quan oi loi cmnr 🙂"
    ];
    const onSuccessfullySentences = [
        "Ok em mo roi do 😏",
        "Bo m mở r do 😏",
        "Mở cho tụi m chat sex r đáy 😏",
        "Rồi, mở xog r : )"
    ];
    const offSuccessfullySentences = [
        "Ok em tắt cho nó khỏi chatsex nx 😏",
        "Roi tao tắt r : )",
        "Tắt r, cái mẹ j cx tới tay",
        "Xog r, het porn nha con 😏",
        "Khóa pỏn r a"
    ];

    try {
        const toggle = args.join(" ");

        if (checkMessage(toggle, ["on", "bat", "mo"])) {
            global.pornMode = true;
            message.reply(onSuccessfullySentences[random(0, onSuccessfullySentences.length)]);
            message.react("🔹");
        }
        else if (checkMessage(toggle, ["off", "tat", "khoa"])) {
            global.pornMode = false;
            message.reply(offSuccessfullySentences[random(0, offSuccessfullySentences.length)]);
            message.react("🔹");
        }
        else throw(error);
    } catch(error) {
        message.react("⭕️");
        message.reply(errorSentences[random(0, errorSentences.length)])
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    config,
    onCall
}
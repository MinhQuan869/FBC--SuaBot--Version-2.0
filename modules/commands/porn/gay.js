/* ----------------------------
    < COMMAND > --- < GAY >
----------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const { resolve } = require("path");
const fs = require("fs");
const https = require("https");

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "gay",
    description: "Lệnh trả về ảnh Gay Porn từ kho dữ liệu ảnh.",
    type: "porn",
    usage: "/kiki gay [ SEARCH CONTENT ]",
    condition: ["gay", "gayporn", "gay porn", "porngay", "porn gay"],
    exception: ["gáy"],
    permission: 0
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");

    const { random } = global.function;
    const errorSentences = [
        "Lỗi r, thg admin đâu lo đi fix đi 🙂",
        "Lỗi cmnr thử lại đi 🙂",
        "Lỗi r tại m đó, thử lại đi",
        "Ăn ở cak j mà lỗi r, thử lại đi 🙂",
        "Thử lại đi lỗi cmnr 🙂",
        "Djt cụ m lỗi r, thử lại xem",
        "Lỗi r =)), có cái xem sếch cx k xog"
    ];

    try {
        const directory = fs.readdirSync(resolve(global.assetsPath, "nsfw/lgbt_gay/"));
        const dataArray = fs.readFileSync(resolve(global.assetsPath, "nsfw/lgbt_gay/", directory[random(0, directory.length)]), "utf8").split("\n");
        const imageUrl = dataArray[random(0, dataArray.length)].replace(/['"]+/g, "");

        https.get(imageUrl, (stream) => { 
            message.reply({ attachment: [stream] });
            message.react("🔹");
        });
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
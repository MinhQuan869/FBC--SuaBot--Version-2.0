/* -----------------------------
    < COMMAND > --- < DICK >
------------------------------ */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const { resolve } = require("path");
const fs = require("fs");
const https = require("https");

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "dick",
    description: "Lệnh trả về ảnh ciuu từ kho dữ liệu ảnh.",
    type: "porn",
    usage: "/kiki dick [ SEARCH CONTENT ]",
    condition: ["dick", "cock", "penis", "cu", "cac", "buoi"],
    exception: ["cũ", "cú", "cụ", "các", "buổi"],
    permission: 0
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");

    const { random, checkMessage } = global.function;
    const errorSentences = [
        "Lỗi r, thg admin đâu lo đi fix đi 🙂",
        "Lỗi cmnr thử lại đi 🙂",
        "Lỗi r tại m đó, thử lại đi",
        "Ăn ở cak j mà lỗi r, thử lại đi 🙂",
        "Thử lại đi lỗi cmnr 🙂",
        "Djt cụ m lỗi r, thử lại xem",
        "Lỗi r =)), có cái xem cu cx k xog"
    ];

    try {
        if (checkMessage(args.join(" "), ["to", "sieu to", "siu to", "bu", "khong lo", "khung long", "sieu to khong lo"])) {
            const directory = fs.readdirSync(resolve(global.assetsPath, "nsfw/body-parts_lower-body_genitalia_penis_large/"));
            const dataArray = fs.readFileSync(resolve(global.assetsPath, "nsfw/body-parts_lower-body_genitalia_penis_large/", directory[random(0, directory.length)]), "utf8").split("\n");
            const imageUrl = dataArray[random(0, dataArray.length)].replace(/['"]+/g, "");
    
            https.get(imageUrl, (stream) => { 
                message.reply({ attachment: [stream] });
                message.react("🔹");
            });
        }
        else {
            const directory = fs.readdirSync(resolve(global.assetsPath, "nsfw/body-parts_lower-body_genitalia_penis/"));
            const dataArray = fs.readFileSync(resolve(global.assetsPath, "nsfw/body-parts_lower-body_genitalia_penis/", directory[random(0, directory.length)]), "utf8").split("\n");
            const imageUrl = dataArray[random(0, dataArray.length)].replace(/[""]+/g, "");

            https.get(imageUrl, (stream) => { 
                message.reply({ attachment: [stream] });
                message.react("🔹");
            });
        }
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
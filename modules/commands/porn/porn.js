/* -------------------------------
    < COMMAND > --- < PORN >
-------------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const pornpic = require("porn-picture");
const https = require("https");

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "porn",
    description: "Lệnh trả về ảnh NSFW.",
    type: "porn",
    usage: "/kiki porn [ SEARCH CONTENT ]",
    condition: ["porn"],
    exception: [],
    permission: 0
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");

    let imageUrl;
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
    const notFoundSentences = [
        "Porn cái lòn j v 🙂",
        "Thể loại cak j v, t đ có 🙂",
        "M pỏn casiloz j v? T đ có the loại đó 🙂",
        "Đ có thể loại này, hỏi thg ad đi lười kể quá 😀"
    ];

    try {
        let search = args[0];
        if (!search || args.length > 1) {
            const type = [ "thighs", "ass", "panties", "cosplay", "teen", "catGirl" ];
            search = type[random(0, type.length)];
        }

        switch(search) {
            case "thighs" :
                for (let i = 0; i < 10; i++) {
                    imageUrl = await pornpic.nsfw.thighs();
                    if (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) break;
                    if (i == 9) {
                        message.react("⭕️");
                        message.reply(errorSentences[random(0, errorSentences.length)]);
                    }
                }
            break;
            
            case "ass" :
                for (let i = 0; i < 10; i++) {
                    imageUrl = await pornpic.nsfw.ass();
                    if (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) break;
                    if (i == 9) {
                        message.react("⭕️");
                        message.reply(errorSentences[random(0, errorSentences.length)]);
                    }
                }
            break;

            case "panties" :
                for (let i = 0; i < 10; i++) {
                    imageUrl = await pornpic.nsfw.panties();
                    if (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) break;
                    if (i == 9) {
                        message.react("⭕️");
                        message.reply(errorSentences[random(0, errorSentences.length)]);
                    }
                }
            break;

            case "cosplay" :
                for (let i = 0; i < 10; i++) {
                    imageUrl = await pornpic.nsfw.cosplay();
                    if (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) break;
                    if (i == 9) {
                        message.react("⭕️");
                        message.reply(errorSentences[random(0, errorSentences.length)]);
                    }
                }
            break;

            case "teen" :
                for (let i = 0; i < 10; i++) {
                    imageUrl = await pornpic.nsfw.teen();
                    if (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) break;
                    if (i == 9) {
                        message.react("⭕️");
                        message.reply(errorSentences[random(0, errorSentences.length)]);
                    }
                }
            break;

            case "catGirl" :
                for (let i = 0; i < 10; i++) {
                    imageUrl = await pornpic.nsfw.catGirl();
                    if (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) break;
                    if (i == 9) {
                        message.react("⭕️");
                        message.reply(errorSentences[random(0, errorSentences.length)]);
                    }
                }
            break;

            default :
                message.react("⭕️");
                message.reply(notFoundSentences[random(0, notFoundSentences.length)]);
                return;
        }

        https.get(imageUrl, (stream) => { message.reply({ attachment: [stream] }) });
        message.react("🔹");
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
/* --------------------------------
    < COMMAND > --- < RULE34 >
--------------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const r34Api = require("r34.api");
const https = require("https");

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "rule34",
    description: "Lệnh trả về ảnh từ Rule34 theo thông tin tìm kiếm. Lệnh chỉ trả về ảnh dạng PNG - JPEG - JPG.",
    type: "porn",
    usage: "/kiki rule34 [ SEARCH CONTENT ]",
    condition: ["rule", "rule34", "r34"],
    exception: [],
    permission: 0
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");

    const search = args.join("_");
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
        "Cặc j v tìm đ ra, thử khác xem",
        "Đ có thử khác đi loz",
        "Bố m đ tìm đc, kiếm cái khác đi",
        "Đ có, cái khác đi",
        "Thể loại cak j v đ có, thử khác đi",
    ];

    try {
        for (let i = 0; i < 10; i++) {
            const imageUrl = (await r34Api.rule34([search])).replace(/['"]+/g, "");
            if (imageUrl.endsWith(".png")|| imageUrl.endsWith(".jpg")|| imageUrl.endsWith(".jpeg")) {
                https.get(imageUrl, (stream) => { message.reply({ attachment: [stream] }) });
                message.react("🔹");
                break;
            }
            if (i == 9) {
                message.react("⭕️");
                message.reply(errorSentences[random(0, errorSentences.length)]);
            }
        }
    } catch(error) {
        message.react("⭕️");
        message.reply(notFoundSentences[random(0, notFoundSentences.length)])
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    config,
    onCall
}
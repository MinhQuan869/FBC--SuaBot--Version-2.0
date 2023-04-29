/* -----------------------------
    < COMMAND > --- < WIKI >
------------------------------ */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const wiki = require("wikijs").default;
const https = require("https");

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "wiki",
    description: "Sử dụng wikipedia trực tiếp qua lệnh.",
    type: "tool",
    usage: "/kiki wiki [ SEARCH CONTENT ]",
    condition: ["wikipedia", "wiki", "wk"],
    exception: [],
    permission: 1
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
        "Lỗi r , có cái search cx k xog 🙂"
    ];
    const notFoundSentences = [
        "Tìm con cak j v đ có 🙂",
        "M đ bt dùng wiki à? search lồn j v ?",
        "M tìm cailon j ông nội t còn đ bt 🙂",
        "Đ có nội dung đó, kiếm cak j v 🙂",
    ];

    try {
        const search = args.join(" ");
        const wikipedia = wiki({ apiUrl: "https://vi.wikipedia.org/w/api.php" });
        if (!search || args.length < 1) {
            message.react("⭕️");
            message.reply(notFoundSentences[random(0, notFoundSentences.length)]);
            return;
        }

        wikipedia.search(search).then(data => { 
            wikipedia.page(data.results[0]).then(async (page) => {
                const summary = await page.summary();
                const images = await page.images();
                let imageUrl = null;
                images.forEach(image => {
                    if (image.endsWith(".png") || image.endsWith(".jpg") || image.endsWith(".jpeg")) imageUrl = image;
                });

                if (imageUrl != null) {
                    https.get(imageUrl, (stream) => { 
                        message.reply({
                            body: summary,
                            attachment: [stream]
                        });
                        message.react("🔹");
                    });
                } else {
                    message.reply(summary);
                    message.react("🔹");
                }
                
            }).catch(() => { 
                message.react("⭕️");
                message.reply(notFoundSentences[random(0, notFoundSentences.length)]);
            });
        })
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
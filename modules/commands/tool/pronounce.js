/* ---------------------------------
    < COMMAND > --- < PRONOUNCE >
---------------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const stats = require("word-stats");

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "pronounce",
    description: "Phân loại và nhận biết âm nhấn tiếng Anh.",
    type: "tool",
    usage: "/kiki pronounce [ SEARCH CONTENT ]",
    condition: ["pronounce", "pn", "stress", "str"],
    exception: [],
    permission: 1
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");
    
    const { random, countArrayElement } = global.function;
    const errorSentences = [
        "Lỗi r, thg admin đâu lo đi fix đi 🙂",
        "Lỗi cmnr thử lại đi 🙂",
        "Lỗi r tại m đó, thử lại đi",
        "Ăn ở cak j mà lỗi r, thử lại đi 🙂",
        "Thử lại đi lỗi cmnr 🙂",
        "Djt cụ m lỗi r, thử lại xem",
        "Lỗi r , có cái lệnh cx k xog 🙂"
    ];
    const notFoundSentences = [
        "Mọe m đ ghi nội dung t biết kiếm lồn mẹ mày à?",
        "Đéo ghi nội dung kiếm con cặc bà m chắc ? 🙂",
        "Có cái lệnh cx đ bt dùng 🙂 chịu",
        "Mẹ nó đã dùng lệnh thì thêm cái từ cần tìm vô dùm 🙂"
    ];
    const responeSentences01 = [
        "Từ này nhấn âm",
        "Nhấn âm",
        "Này nhấn âm",
        "Nhấn ở âm",
        "Dăm ba cái lày nhấn âm",
        "Nhấn vào âm"
    ];
    const responeSentences02 = [
        "Dăm ba cái lày, từ khác biệt là",
        "Từ nhấn ấm khác biệt là",
        "Từ nhấn khác biệt là từ",
        "Từ nhấn ấm khác là",
        "Từ nhấn khác là"
    ];

    try {
        switch(args.length) {
            case 0 :
                message.react("⭕️");
                message.reply(notFoundSentences[random(0, notFoundSentences.length)]);
            break;

            case 1 :
                const pronounceData = stats(args[0]);
                const stressArray = Array.from(pronounceData.stress);
                let responeData01 = responeSentences01[random(0, responeSentences01.length)];

                if (!pronounceData) throw(error);
                
                stressArray.forEach((stress, index) => {
                    if (stress == "s") responeData01 += " " + (index + 1);
                });

                message.reply(responeData01);
                message.react("🔹");
            break;

            default :
                let stressValueMap = new Map();
                let stressValueArray = new Array();
                let responeData02 = responeSentences02[random(0, responeSentences02.length)];
                let responeMessage;
                
                for (i = 0; i < args.length; i++) {
                    const pronounceData = stats(args[i]);
                    const stressArray = Array.from(pronounceData.stress);
                    let stressPoint = "";

                    if (!pronounceData) throw(error);

                    stressArray.forEach((stress, index) => {
                        if (stress == "s") stressPoint += " " + (index + 1);
                    });

                    stressValueMap.set(args[i], stressPoint);
                    stressValueArray.push(stressPoint);
                }
                
                stressValueMap.forEach((value, key) => {
                    if (countArrayElement(stressValueArray, value) == 1) responeMessage = responeData02 + ` \"${key}\" - [ Nhấn âm${value} ]`;
                })

                if (!responeMessage) throw(error);
                message.reply(responeMessage);
                message.react("🔹");
        }
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
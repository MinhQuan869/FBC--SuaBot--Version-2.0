/* ----------------------------------
    < COMMAND > --- < SET RANK >
----------------------------------- */

// ----- < [ CONFIG ] - THÔNG TIN VỀ LỆNH > ----- //
const config = {
    name: "setRank",
    description: "Lệnh chỉnh Rank người dùng.",
    type: "admin",
    usage: "/kiki setRank [ TAG ] [ RANK ]",
    condition: ["setrank", "set rank", "rank"],
    exception: [],
    permission: 3
}

// ----- < [ HÀM ] - XỬ LÍ LỆNH > ----- //
async function onCall({ message, args }) {
    await message.react("⏱");

    const { updateUsersInfo, random, checkMessage } = global.function;
    const rankPermission = {
        "ADMINISTRATOR": 5,
        "MODERATOR": 1,
        "USER": 0
    }
    const errorSentences = [
        "Đéo đc đại ka ơi :) lỗi cmnr",
        "Anh ơi em lam déo dc, bị con kac j r",
        "Loi cmnr 🙂 Ad ngu",
        "Loi roi thg ngu 🙂",
        "Anh Quan oi loi cmnr 🙂"
    ];
    const notFoundRankSentences = [
        "rank lon que j v 🙂",
        "m setRank ccj v?",
        "thg ad ngu, có cái rank cũng đ bt 🙂",
        "Phế đéo chịu đc, rank loz que j đấy 🙂",
        "Thề chứ oog nội t còn đ bt m set cái rank j 🙂"
    ];
    const rankUpSentences = [
        "Ok em cho nó lên rank r do 😏",
        "R t thăng rank cho nó r 😏",
        "Roi 🙂",
        "Cai me j cx kêu t 🙂",
        "Roi roi, cái loz j cx tới tay 🙂"
    ];
    const rankDownSentences = [
        "Roi t giam hạng nó r 😏",
        "r t cho nó cuk xuong r 😏",
        "Giam rank nó r 😏 *khinh bi",
        "Roi, giam r",
        "Cai me j cx kêu t 🙂",
        "Roi roi, cái loz j cx tới tay 🙂"
    ];
    const rankSameSentences = [
        "Có khác mẹ j đâu mà đổi 🙂",
        "lm ccj có khac cha j dau 🙂",
        "Vâng, rank nó vẫn y vâyj 🙂",
        "Ngu lồn, rank nó vẫn y z 🙂",
        "Phế, khác mẹ j đâu mà đổi rank 🙂"
    ];

    try {
        const targetID = Object.keys(message.mentions)[0];
        const targetName = Object.values(message.mentions)[0].replace(/\s+/g, "");
        let targetRank = (args.join("")).replace(targetName, "").toUpperCase();

        if (!targetID || !targetRank) throw(error);
        if (checkMessage(targetRank, ["5", "ADMINISTRATOR", "ADMIN", "AD"])) targetRank = "ADMINISTRATOR";
        else if (checkMessage(targetRank, ["1", "MODERATOR", "MOD"])) targetRank = "MODERATOR";
        else if (checkMessage(targetRank, ["0", "USER"])) targetRank = "USER";
        else {
            message.react("⭕️");
            message.reply(notFoundRankSentences[random(0, notFoundRankSentences.length)]);
            return;
        }
        
        const targetPermission = rankPermission[targetRank];
        const previousPermission = rankPermission[global.usersInfo[targetID].rank];
        if (targetPermission == previousPermission) {
            message.react("⭕️");
            message.reply(rankSameSentences[random(0, rankSameSentences.length)]);
            return;
        }

        switch (targetRank) {
            case "ADMINISTRATOR" :
                global.usersInfo[targetID].rank = "ADMINISTRATOR";
                updateUsersInfo(global.usersInfo);
            break;

            case "MODERATOR" :
                global.usersInfo[targetID].rank = "MODERATOR";
                updateUsersInfo(global.usersInfo);
            break;

            case "USER" :
                global.usersInfo[targetID].rank = "USER";
                updateUsersInfo(global.usersInfo);
            break;
        }

        if (targetPermission > previousPermission) message.reply(rankUpSentences[random(0, rankUpSentences.length)]);
        if (targetPermission < previousPermission) message.reply(rankDownSentences[random(0, rankDownSentences.length)]);
        message.react("🔹");
    } catch(error) {
        console.log(error)
        message.react("⭕️");
        message.reply(errorSentences[random(0, errorSentences.length)])
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    config,
    onCall
}
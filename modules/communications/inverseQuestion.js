/* -----------------------------------------------
    < COMMUNICATION > --- < INVERSE QUESTION >
------------------------------------------------- */

// ----- < [ CONFIG ] - THÔNG TIN VỀ PHÉP GIAO TIẾP > ----- //
const config = {
    name: "inverseQuestion",
    description: "Giao tiếp - Câu hỏi nghịch đảo (có - không)",
    type: "communication",
    condition: ["co nen", "nen & k", "nen & kh", "nen & ko", "nen & khong", "co bi", "co & k", "co & ko", "co & kh", "co & khong", "dk", "dung khong", "dug khong", "dung k", "dug k", "dung ko", "dug ko", "dung kh", "dug k", "phai khong", "phai ko", "phai kh", "phai k", "p k", "pk"],
    exception: [],
    permission: 0
}

// ----- < [ HÀM ] - XỬ LÍ PHÉP GIAO TIẾP > ----- //
async function onCall({ message, args }) {
    const { random, checkMessage } = global.function;
    const messageContent = args.join(" ");
    const replySentences = [
        "Đụ má mắc ccj hỏi t chắc t bt à 🙂?",
        "Mắc cái lồn què j m hỏi t? Nứng chắc? 🙂",
        "Sao bố m bt? Nứng loz à hỏi t 🙂",
        "T đ bt, cút 🙂",

        "kó 😏", 
        "Có lẽ k 😏",
        "Chắc la có, ai bt 😏",
        "Tất nhiên là có r =))",
        "Dug vay, nó dó",
        "Chac chan là v r =))",
        "Yess !",
        "Ừ nó đó",

        "tat nhien la déo",
        "Chắc chắn là ko 😏",
        "Có cái lồn bà già m 🙂", 
        "Có cái con kặc nhá 🙂",
        "Khong nhá 😏",
        "Co cai lòn 🙂",
        "Dell 🙂",
        "Đéo 🙂"
    ];

    if (checkMessage(messageContent, ["gay", "bede", "be de", "bong"])) {
        const gayReplySentences = [
            "Nhìn là bt gay r hỏi làm j ?",
            "Chắn chắn bị gay",
            "100% Gay",
            "Gayyyyyyy 😏",
            "Gay vl ra",
            "Be de đến mức đéo thể chấp nhận đc 🙂",

            "Hmmm, chắc là k gay =))",
            "Chắc menly nhưng có cặp dú còn to hơn não",
            "Menly 100% 😏 sai thé déo nào đc",
            "Men nha =))"
        ];

        message.reply(gayReplySentences[random(0, gayReplySentences.length)]);
        return;
    }
    if (checkMessage(messageContent, ["dam", "damdang", "damdag"])) {
        const eroticReplySentences = [
            "Dâm méo thể chịu đc 🙂",
            "dâm xúc phạm loài người 🙂",
            "Vừa dâm vừa tục, đặc biệt là mê cu",
            "Dâm đãng vãi cả lồn ra 🙂",
            "nhìn là bt dâm r hỏi làm j ? 🙂",
            "Dâm chúa",

            "Hmm, chắc không dâm =))",
            "Chắc dâm vừa vừa =))",
            "Không dâm nhá 😏",
        ];

        message.reply(eroticReplySentences[random(0, eroticReplySentences.length)]);
        return;
    }
    if (checkMessage(messageContent, ["ngu", "ngulon", "ngao", "ngaoda", "oc", "oclon", "thieunang", "thieu nang", "thieunao", "thieu nao"])) {
        const stupidReplySentences = [
            "Ngu méo thể chịu đc 🙂",
            "Nguuu xúc phạm loài người 🙂",
            "Vừa ngu vừa thiểu năng",
            "Ngu vãi cả cặc ra 🙂",
            "nhìn là bt ngu cmnr hỏi t làm ccj ? 🙂",
            "Óc lợn",

            "Chắc đ đến mức ngu =))",
            "Hi vọng là ngu vừa vừa",
            "Không ngu, chỉ thiểu não thôi : )",
        ];

        message.reply(stupidReplySentences[random(0, stupidReplySentences.length)]);
        return;
    }
    
    message.reply(replySentences[random(0, replySentences.length)]);
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    config,
    onCall
}
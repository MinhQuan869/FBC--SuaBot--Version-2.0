/* -----------------------------------------------------------
    < DATABASE > --- < XÂY DỰNG CƠ SỞ DỮ LIỆU NGƯỜI DÙNG >
------------------------------------------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const fs = require("fs");

// ----- < [ HÀM ] - CẬP NHẬT DỮ LIỆU VÀO CƠ SỞ DỮ LIỆU > ----- //
function updateUsersInfo(usersInfo) {
    fs.writeFileSync(global.usersInfoPath, JSON.stringify(usersInfo), "utf8");
}

// ----- < [ HÀM ] - ĐỌC DỮ LIỆU VÀO CƠ SỞ DỮ LIỆU > ----- //
function readUsersInfo() {
    return JSON.parse(fs.readFileSync(global.usersInfoPath, "utf8"))
}

// ----- < [ HÀM ] - GHI DỮ LIỆU VÀO CƠ SỞ DỮ LIỆU > ----- //
function writeUsersInfo(threadList) {
    const { random } = global.function;
    const maleVocative = [ "anh", "em trai", "em troai", "anh trai", "anh troai" ];
    const femaleVocative = [ "chị", "chụy", "em gái", "em goái", "chị gái", "chị goái" ];
    const unknowVocative = [ "thg gay", "con lé", "thg gay lỏ", "con les" ];

    const lastUsersInfo = readUsersInfo();
    const usersIDArray = [];
    const usersDataArray = [];
    let usersInfo = {};

    threadList.forEach(thread => {
        thread.participants.filter(participant => participant.accountType == "User").forEach(user => {
            if (!usersIDArray.includes(user.userID)) {
                usersIDArray.push(user.userID);
                usersDataArray.push(user);
            }
        })
    });

    for (let i = 0; i < usersIDArray.length; i++) {
        const userInfo = {
            userName: usersDataArray[i].username,
            fullName: usersDataArray[i].name,
            shortName: usersDataArray[i].shortName,

            gender: usersDataArray[i].gender,
            vocative: (usersDataArray[i].gender == "MALE") ? maleVocative[random(0, maleVocative.length)] : (usersDataArray[i].gender == "FEMALE") ? femaleVocative[random(0, femaleVocative.length)] : unknowVocative[random(0, unknowVocative.length)],

            profileUrl: usersDataArray[i].url,
            profileImage: usersDataArray[i].profilePicture,

            isFriend: usersDataArray[i].isViewerFriend,
            isBlocked: usersDataArray[i].isMessageBlockedByViewer,

            rank: (usersIDArray[i] == global.adminID) ? "ADMINISTRATOR" : (lastUsersInfo[usersIDArray[i]].rank == "MODERATOR") ? "MODERATOR" : "USER",
        };
        usersInfo[usersIDArray[i]] = userInfo;
    }
    
    fs.writeFileSync(global.usersInfoPath, JSON.stringify(usersInfo), "utf8");
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = {
    updateUsersInfo,
    readUsersInfo,
    writeUsersInfo
}
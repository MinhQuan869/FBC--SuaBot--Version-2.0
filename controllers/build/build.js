/* -----------------------------------------------
    < BUILD > --- < ĐĂNG NHẬP - XÂY DỰNG BOT >
-------------------------------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const login = require("@xaviabot/fca-unofficial");
const fs = require("fs");
const { resolve } = require("path");
const { buildInit } = require("./init");
const { handleListen } = require("../handle/listen");

// ----- < [ HÀM ] - CHẠY BOT > ----- //
async function start() {
    try {
        await buildInit();
        await botLogin();
    } catch (err) {
        console.log(err);
    }
}

// ----- < [ HÀM ] - XỬ LÍ SAU KHI ĐĂNG NHẬP > ----- //
function botLogin() {
    return new Promise((resolve, reject) => {
        loginState()
            .then(async api => {
                api.setOptions({listenEvents: true});
                api.getThreadList(15, null, [], (err, threadList) => {
                    if (err) console.log(err);
                    global.function.writeUsersInfo(threadList);
                });

                global.api = api;
                global.botID = await api.getCurrentUserID();
                global.botTag = (await api.getUserInfo(global.botID))[global.botID].name;
                global.listen = api.listenMqtt((err, event) => {
                    if (err) console.log(err);
                    handleListen(event);
                });
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

// ----- < [ HÀM ] - ĐĂNG NHẬP > ----- //
function loginState() {
    const credential = { appState: JSON.parse(fs.readFileSync(resolve(process.cwd(), "appstate.json"), "utf-8")) }
    const option = {
        logLevel: "silent",
        forceLogin: true,
        userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-A310F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36 OPR/42.7.2246.114996"
    };

    return new Promise((resolve, reject) => {
        try {
            login(credential, option, (err, api) => {
                if(err) return reject(err);
                resolve(api);
            })
        } catch (err) {
            reject(err);
        }
    })
}

start();
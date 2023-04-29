function removeVietnamese(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g," ");
    str = str.trim();
    return str;
}
function checkMessage(message, conditionArray, exceptionArray) {
    const messageArray = removeVietnamese(message).split(" ");
    let multiCondition = [];
    let multiWordCondition = [];
    let multiWordException = [];
    let output = false;

    if (conditionArray) { multiCondition = conditionArray.filter(element => { return element.includes("&"); }) }
    if (conditionArray) { multiWordCondition = conditionArray.filter(element => { return element.split(" ").length > 1 }) }
    if (exceptionArray) { multiWordException = exceptionArray.filter(element => { return element.split(" ").length > 1 }) }

    messageArray.some(element => {
        if (exceptionArray && exceptionArray.includes(element)) output = false;
        if (conditionArray.includes(removeVietnamese(element))) output = true;
    })

    if (message == "" && conditionArray.includes("-")) return output = true;

    if (multiWordCondition.length && output == false) {
        multiWordCondition.some(conditionElement => {
            if (multiWordException.length) {
                multiWordException.some((exceptionElement) => {
                    if (exceptionElement && message.includes(exceptionElement)) return output = false;
                    if (messageArray.includes(conditionElement)) return output = true;
                }) 
            }
            if (!multiWordException.length) {
                if (messageArray.includes(conditionElement)) return output = true;
                else return output = false
            }
        })
    }

    if (multiCondition.length && output == false) {
        let multiConditionArray = [];
        multiCondition.some((element) => {
            multiConditionArray.push(element.split(" & "));
        });
        return multiConditionArray.some((conditionElement) => {
            let conditionCheck = 0;
            conditionElement.some((element) => {
                if (messageArray.includes(element)) return conditionCheck++;
            });
            if (conditionCheck == conditionElement.length) return true;
            else return false;
        })
    }

    return output;
}

if (checkMessage("kiki", ["kiki"]) && checkMessage(["kiki"].filter(element => 
    !(["e", "-"]).includes(element) &&
    !["kiki", "/kiki", "bot", "chatbot"].includes(element) &&
    !("@" + global.botTag).split(" ").includes(element) ).join(" "), ["-"])) console.log("ok")
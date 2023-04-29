/* -------------------------------------------------------------------
    < INIT MODULE > --- < TỔNG HỢP MOUDLE GLOBAL VÀ MODULE LOADER >
---------------------------------------------------------------------- */

// ----- < [ KHAI BÁO ] - REQUIRE MODULE CẦN THIẾT > ----- //
const { buildGlobal } = require("./global");
const { buildModules } = require("./loader");

// ----- < [ HÀM ] - XÂY DỰNG BIẾN GLOBAL VÀ HÀM LOADER > ----- //
async function buildInit() {
    try {
        buildGlobal();
        await buildModules();
    } catch(err) {
        console.log(err);
    }
}

// ----- < [ EXPORT ] - XUẤT MODULE > ----- //
module.exports = { buildInit };
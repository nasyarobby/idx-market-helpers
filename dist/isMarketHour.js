"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
function isWorkingDays(date) {
    const day = (0, dayjs_1.default)(date).day();
    if (day === 0 || day === 6)
        return false;
    return true;
}
function isNotHolidays(holidays, date) {
    for (let index = 0; index < holidays.length; index += 1) {
        const holiday = holidays[index];
        if ((0, dayjs_1.default)(date).isSame((0, dayjs_1.default)(holiday), 'day'))
            return false;
    }
    return true;
}
function getSessionOneStartsAt(date) {
    return (0, dayjs_1.default)(date)
        .hour(9)
        .minute(0)
        .second(0)
        .millisecond(0);
}
function getSessionTwoStartsAt(date) {
    return (0, dayjs_1.default)(date)
        .hour(13)
        .minute(30)
        .second(0)
        .millisecond(0);
}
function getSessionOneEndsAt(date) {
    return (0, dayjs_1.default)(date)
        .hour(11)
        .minute(30)
        .second(0)
        .millisecond(0);
}
function getSessionTwoEndsAt(date) {
    return (0, dayjs_1.default)(date)
        .hour(15)
        .minute(0)
        .second(0)
        .millisecond(0);
}
function isInSessionOne(date) {
    const now = (0, dayjs_1.default)(date);
    console.log(now);
    return now.isAfter(getSessionOneStartsAt(date)) && now.isBefore(getSessionOneEndsAt(date));
}
console.log(isInSessionOne());
//# sourceMappingURL=isMarketHour.js.map
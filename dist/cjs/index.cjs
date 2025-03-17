'use strict';

/** Largest Reminder Method 计算百分数
 * @group Math
 * @category Algorithm
 * @param {number[]} arr - 原始数据
 * @param {number} [precision = 2] - 精确度
 * @return {number[]} arr - 对应百分比
 *
 * @example
 * // 示例 1: 不指定小数位数
 * formatNumberToPrecise([200, 240, 600, 555]); // 输出: [12.54, 15.05, 37.62, 34.79]
 *
 */
function getPercentWithPrecision(arr, precision = 2) {
    if (!Array.isArray(arr)) {
        return;
    }
    var resultArr = [];
    var digits = Math.pow(10, precision);
    var totalSeats = digits * 100;
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += isNaN(arr[i]) ? 0 : arr[i];
    }
    var votesPerQuota = [];
    for (var i = 0; i < arr.length; i++) {
        votesPerQuota.push((arr[i] / sum) * digits * 100);
    }
    var seats = [];
    var reminder = [];
    var currentSeats = 0;
    for (var i = 0; i < votesPerQuota.length; i++) {
        var intPart = Math.floor(votesPerQuota[i]);
        seats.push(intPart);
        reminder.push(votesPerQuota[i] - intPart);
        currentSeats += intPart;
    }
    while (currentSeats < totalSeats) {
        var max = Number.MIN_SAFE_INTEGER;
        var maxIndex = null;
        for (var i = 0; i < reminder.length; i++) {
            if (reminder[i] > max) {
                max = reminder[i];
                maxIndex = i;
            }
        }
        reminder[maxIndex] = 0;
        ++currentSeats;
        ++seats[maxIndex];
    }
    for (var i = 0; i < seats.length; i++) {
        resultArr.push(seats[i] / digits);
    }
    return resultArr;
}

const toString = Object.prototype.toString;
function toRawType(value) {
    return toString.call(value).slice(8, -1);
}
function isUndef(value) {
    return toRawType(value) == 'Undefined';
}
function isDef(value) {
    return !isUndef(value);
}

/** 数值转换成千分位
 * @group Math
 * @category Format
 * @param {NumberLike} value
 * @param {NumberLike | undefined} [toPrecise = undefined]
 * @return {NumberLike}
 *
 * @example
 * // 示例 1: 不指定小数位数
 * formatNumberThousands(12345678.9); // 输出: 12,345,678.9
 *
 * @example
 * // 示例 2: 指定小数位数
 * formatNumberThousands(12345678.35, 0); // 输出: 12,345,678
 *
 */
function formatNumberThousands(value, toPrecise = undefined) {
    let toNum = value;
    if (isDef(toPrecise)) {
        toNum = formatNumberToPrecise(value, toPrecise);
        if (isNaN(toNum)) {
            return NaN;
        }
    }
    let temp = toNum.toString().split('.');
    temp[0] = temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return temp.join('.');
}
/** 数值精确小数后toPrecise位
 * @group Math
 * @category Format
 * @param {NumberLike} value
 * @param {NumberLike} [toPrecise = 2]
 * @returns {number} 包含NaN
 *
 * @example
 * // 示例 1: 不指定小数位数
 * formatNumberToPrecise(123.874); // 输出: 123.87
 *
 * @example
 * // 示例 2: 指定小数位数
 * formatNumberToPrecise(123.876, 0); // 输出: 124
 */
function formatNumberToPrecise(value, toPrecise = 2) {
    let toNum = Number(value);
    if (isNaN(toNum)) {
        return NaN;
    }
    toPrecise = parseInt(String(toPrecise));
    if (toPrecise === 0 || toPrecise) {
        toNum = +toNum.toFixed(toPrecise);
    }
    return toNum;
}

/**
 * @module Date
 */
/**
 * Parse the time to string
 * @group Date
 * @category Format
 * @param {TimeLike} time - 时间
 * @param {string} [format='{y}-{m}-{d} {h}:{i}:{s}']
 * @returns {string | null}
 *
 * @example
 * // 示例 1: 不指定格式
 * parseTime(1741785818632); // 输出: 2025-03-12 21:23:38
 *
 * @example
 * // 示例 2: 指定格式
 * parseTime('1741785818632', '{y}-{m}-{d}') // 输出: 2025-03-12
 */
function parseTime(time, format = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (arguments.length === 0 || !time) {
        return null;
    }
    let date;
    if (typeof time === 'object') {
        date = time;
    }
    else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            }
            else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        return value.toString().padStart(2, '0');
    });
    return time_str;
}
/**
 * 列出范围之间月份, 返回YYYY-MM格式
 * @group Date
 * @param {TimeLike} from
 * @param {TimeLike} to
 * @returns {string[]}
 *
 * @example
 * // 示例 1
 * listMonths(new Date('2025-01'), new Date('2025-03'));
 * // 输出: ['2025-01', '2025-02','2025-03']
 *
 * @example
 * // 示例 2: 跨年
 * listMonths(new Date('2024-12'), new Date('2025-03'));
 * // 输出: ['2024-12','2025-01', '2025-02','2025-03']
 */
function listMonths(from, to) {
    const dateFrom = parseTime(from, '{y}-{m}');
    const dateTo = parseTime(to, '{y}-{m}');
    if (!dateFrom || !dateTo) {
        return [];
    }
    // 解析字符串为日期对象（月份的第一天）
    const parseDate = (str) => {
        const [year, month] = str.split('-').map(Number);
        return new Date(year, month - 1, 1); // 月份从0开始
    };
    let startDate = parseDate(dateFrom);
    let endDate = parseDate(dateTo);
    // 确保起始日期不晚于结束日期
    if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
    }
    const months = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        // 格式化为YYYY-MM
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        months.push(`${year}-${month}`);
        // 增加一个月
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return months;
}
/**
 * 获取某天的ndays前的日期的字符串
 * @group Date
 * @param {TimeLike} timestring
 * @param {number} [ndays = 90]
 * @returns {Date}
 *
 * @example
 * // 示例 1：获取此时间戳前90天时间戳
 * generateDatefrom(1742194738400, 90).getTime()
 * // 1744786738400
 *
 * @example
 * // 示例 2: 获取此时间戳30天后时间戳
 * generateDatefrom(1742194738400, -30).getTime()
 * // 输出: 1734418738400
 */
function generateDatefrom(timestring, ndays = 90) {
    const temp = timestring ? new Date(timestring).getTime() : new Date().getTime();
    //  1000 * 60 * 60 * 24 = 86400000
    return new Date(temp - 86400000 * ndays);
}

exports.formatNumberThousands = formatNumberThousands;
exports.formatNumberToPrecise = formatNumberToPrecise;
exports.generateDatefrom = generateDatefrom;
exports.getPercentWithPrecision = getPercentWithPrecision;
exports.listMonths = listMonths;
exports.parseTime = parseTime;

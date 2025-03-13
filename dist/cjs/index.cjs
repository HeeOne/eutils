'use strict';

/** Largest Reminder Method 计算百分数
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
 * @param {NumberLike} value
 * @param {NumberLike | undefined} [toPrecise = undefined]
 * @return {NumberLike}
 *
 * @example
 * // 示例 1: 不指定小数位数
 * formatNumberThousands(12345678.9); // 输出: 12,345,678.9
 *
 * @example
 * // 示例 1: 指定小数位数
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
 * @param {NumberLike} value
 * @param {NumberLike} [toPrecise = 2]
 * @returns {number} 包含NaN
 *
 * @example
 * // 示例 1: 不指定小数位数
 * formatNumberToPrecise(123.874); // 输出: 123.87
 *
 * @example
 * // 示例 1: 指定小数位数
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
 * Parse the time to string
 * @param {TimeLike} time - 时间
 * @param {string} [format='{y}-{m}-{d} {h}:{i}:{s}']
 * @returns {string | null}
 *
 * @example
 * // 示例 1: 不指定格式
 * parseTime(1741785818632); // 输出: 2025-03-12 21:23:38
 *
 * @example
 * // 示例 1: 指定格式
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

exports.formatNumberThousands = formatNumberThousands;
exports.formatNumberToPrecise = formatNumberToPrecise;
exports.getPercentWithPrecision = getPercentWithPrecision;
exports.parseTime = parseTime;

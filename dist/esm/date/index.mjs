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

export { parseTime };

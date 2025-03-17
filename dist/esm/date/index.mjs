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

export { generateDatefrom, listMonths, parseTime };

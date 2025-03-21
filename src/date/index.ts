/**
 * @module Date
 */
/**
 * @groupDescription Date
 * Date are for proceing Date
 * @showGroups
 */

/**
 * 表示可以代表时间的类型。
 *
 * 此类型别名定义了几种可以用来表示时间的值的类型。
 * 它可以是一个原生的 JavaScript `Date` 对象，该对象能精确表示某个特定的时间点。
 * 也可以是一个字符串，通常是符合特定日期时间格式的字符串，比如 ISO 8601 格式（'2024-01-01T12:00:00Z'）。
 * 还可以是一个数字，这个数字一般是 Unix 时间戳（从 1970 年 1 月 1 日 00:00:00 UTC 开始到指定时间点所经过的毫秒数）。
 * @type TimeLike
 * @property {Date} - 原生的 JavaScript `Date` 对象，用于表示特定的时间点。
 * @property {string} - Unix 时间戳。
 * @property {number} - Unix 时间戳，代表从 1970 年 1 月 1 日 00:00:00 UTC 开始经过的毫秒数。
 */
export type TimeLike = Date | string | number

/**
 * 定义一个用于格式化时间或日期相关信息的对象结构接口。
 * 该接口描述了一个包含多个时间单位属性的对象，可用于传递和处理时间相关的格式化信息。
 * @interface FormatAccept
 * @property {number} y - 表示年份的数值。
 * @property {number} m - 表示月份的数值，范围通常是 1 - 12。
 * @property {number} d - 表示日期（天）的数值，范围通常是 1 - 31。
 * @property {number} h - 表示小时的数值，范围通常是 0 - 23。
 * @property {number} i - 表示分钟的数值，范围通常是 0 - 59。
 * @property {number} s - 表示秒的数值，范围通常是 0 - 59。
 * @property {number} a - 表示天数的数值。
 * @property {any} [key: string] - 允许接口包含其他任意属性，键为字符串类型，值为任意类型。
 */
export interface FormatAccept {
  y: number //年
  m: number //月
  d: number //日
  h: number //时
  i: number //分
  s: number //秒
  a: number //天
  [key: string]: any
}

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
export function parseTime(
  time: TimeLike,
  format: string = '{y}-{m}-{d} {h}:{i}:{s}',
): string | null {
  if (arguments.length === 0 || !time) {
    return null
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: FormatAccept = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
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
export function listMonths(from: TimeLike, to: TimeLike): string[] {
  const dateFrom = parseTime(from, '{y}-{m}')
  const dateTo = parseTime(to, '{y}-{m}')
  if (!dateFrom || !dateTo) {
    return []
  }
  // 解析字符串为日期对象（月份的第一天）
  const parseDate = (str: string) => {
    const [year, month] = str.split('-').map(Number)
    return new Date(year, month - 1, 1) // 月份从0开始
  }

  let startDate = parseDate(dateFrom)
  let endDate = parseDate(dateTo)

  // 确保起始日期不晚于结束日期
  if (startDate > endDate) {
    ;[startDate, endDate] = [endDate, startDate]
  }

  const months = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    // 格式化为YYYY-MM
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    months.push(`${year}-${month}`)

    // 增加一个月
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return months
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
export function generateDatefrom(timestring: TimeLike, ndays: number = 90): Date {
  const temp = timestring ? new Date(timestring).getTime() : new Date().getTime()
  //  1000 * 60 * 60 * 24 = 86400000
  return new Date(temp - 86400000 * ndays)
}

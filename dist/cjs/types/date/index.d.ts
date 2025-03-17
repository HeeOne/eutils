/**
 * @module Date
 */
import { TimeLike } from './date.typing';
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
export declare function parseTime(time: TimeLike, format?: string): string | null;
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
export declare function listMonths(from: TimeLike, to: TimeLike): string[];
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
export declare function generateDatefrom(timestring: TimeLike, ndays?: number): Date;

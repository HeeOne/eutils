import { type NumberLike } from '../_validate/is';
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
export declare function formatNumberThousands(value: NumberLike, toPrecise?: NumberLike | undefined): any;
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
export declare function formatNumberToPrecise(value: NumberLike, toPrecise?: NumberLike): number;

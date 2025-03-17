import { isDef, type NumberLike } from '../_validate/is'

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
export function formatNumberThousands(
  value: NumberLike,
  toPrecise: NumberLike | undefined = undefined,
): any {
  let toNum = value
  if (isDef(toPrecise)) {
    toNum = formatNumberToPrecise(value, toPrecise)
    if (isNaN(toNum)) {
      return NaN
    }
  }
  let temp = toNum.toString().split('.')
  temp[0] = temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return temp.join('.')
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
export function formatNumberToPrecise(value: NumberLike, toPrecise: NumberLike = 2): number {
  let toNum = Number(value)
  if (isNaN(toNum)) {
    return NaN
  }
  toPrecise = parseInt(String(toPrecise))
  if (toPrecise === 0 || toPrecise) {
    toNum = +toNum.toFixed(toPrecise)
  }
  return toNum
}

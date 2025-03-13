export type TimeLike = Date | string | number;
export interface FormatAccept {
    y: number;
    m: number;
    d: number;
    h: number;
    i: number;
    s: number;
    a: number;
    [key: string]: any;
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
export declare function parseTime(time: TimeLike, format?: string): string | null;

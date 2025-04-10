import { Recordable } from '../typing';
/**
 *
 * 将URL的查询参数解析为对象
 * @group URL
 * @category Parameter
 * @param url - 完整的URL字符串（例如：http://example.com?name=John&age=20）
 * @returns 包含所有查询参数键值对的对象（例如：{ name: 'John', age: '20' }）
 * @example
 * const url = 'http://example.com?name=John&age=20';
 * const params = param2Obj(url); // { name: 'John', age: '20' }
 */
export declare function param2Obj(url: string): Recordable;
/**
 *
 * 将对象转换为URL查询字符串
 * @group URL
 * @category Parameter
 * @param obj - 需要转换的对象（例如：{ name: 'John', age: 20 }）
 * @param excludeKey - 需要排除的键名数组（默认空数组）
 * @param decodeFlag - 是否对结果进行URI解码（默认false）
 * @returns 拼接后的URL查询字符串（例如：name=John&age=20）
 * @example
 * const params = { name: 'John', age: 20 };
 * const str = obj2UrlParam(params, ['age']); // "name=John"
 */
export declare function obj2UrlParam(obj: Recordable, excludeKey?: string[], decodeFlag?: boolean): string;

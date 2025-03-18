/**
 * 一个封装了本地存储（localStorage 和 sessionStorage）的客户端类，支持键名前缀、数据过期时间和序列化/反序列化功能。
 * @example
 * const client = new StorageClient({ prefix: 'app', storageType: 'local' });
 * client.setItem('token', 'abc123', 3600 * 1000); // 1小时后过期
 */
interface StorageClientOptions {
    /**
     * 存储键名的统一前缀，用于区分不同模块或应用的数据
     * @default ''
     */
    prefix?: string;
    /**
     * 选择使用的存储类型，可选本地存储（local）或会话存储（session）
     * @default 'local'
     */
    storageType?: 'local' | 'session';
}
declare class StorageClient {
    /**
     * 存储键名前缀，自动添加到所有键名前
     */
    private prefix;
    /**
     * 实际使用的存储对象（localStorage 或 sessionStorage）
     */
    private storage;
    /**
     * 创建一个存储客户端实例
     * @param options 配置选项
     */
    constructor({ prefix, storageType }: StorageClientOptions);
    /**
     * 生成带前缀的实际存储键名
     * @param key 原始键名
     * @returns 组合前缀后的完整键名
     * @example
     * getKey('token') // returns 'app-token' (当prefix为'app'时)
     */
    private getKey;
    /**
     * 存储数据到指定键名
     * @template T 存储值的类型
     * @param key 存储键名（不需要包含前缀）
     * @param value 要存储的值（自动序列化）
     * @param ttl 数据的存活时间（单位：毫秒），可选
     * @example
     * client.setItem('user', { name: 'John' }, 60000) // 数据1分钟后过期
     */
    setItem<T>(key: string, value: T, ttl?: number): void;
    /**
     * 从指定键名获取存储的数据
     * @param key 存储键名（不需要包含前缀）
     * @param defaultVal 当数据不存在/过期/解析失败时返回的默认值
     * @returns 存储的值或默认值
     * @example
     * const user = client.getItem('user', { name: 'guest' })
     */
    getItem(key: string, defaultVal?: any): any;
    /**
     * 移除指定键名的存储数据
     * @param key 要移除的存储键名（不需要包含前缀）
     */
    removeItem(key: string): void;
    /**
     * 清除所有带有当前前缀的存储数据
     * @example
     * client.clear() // 删除所有以'prefix-'开头的存储项
     */
    clear(): void;
}
export default StorageClient;

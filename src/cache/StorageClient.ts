/**
 * 一个封装了本地存储（localStorage 和 sessionStorage）的客户端类，支持键名前缀、数据过期时间和序列化/反序列化功能。
 * @interface StorageClientOptions
 * @property {string} [prefix = ''] - 存储键名的统一前缀，用于区分不同模块或应用的数据
 * @property {'local' | 'session'} [storageType ='local'] - 选择使用的存储类型，可选本地存储（local）或会话存储（session）
 * @example
 * const client = new StorageClient({ prefix: 'app', storageType: 'local' });
 * client.setItem('token', 'abc123', 3600 * 1000); // 1小时后过期
 */
export declare interface StorageClientOptions {
  prefix?: string
  storageType?: 'local' | 'session'
}
/** StorageClient
 * @class
 */
class StorageClient {
  /**
   * 存储键名前缀，自动添加到所有键名前
   */
  private prefix: string
  /**
   * 实际使用的存储对象（localStorage 或 sessionStorage）
   */
  private storage: Storage

  /**
   * 创建一个存储客户端实例
   * @param {StorageClientOptions} [options] - 配置选项
   */
  constructor({ prefix = '', storageType = 'local' }: StorageClientOptions) {
    this.prefix = prefix
    this.storage = storageType == 'local' ? localStorage : sessionStorage
  }

  /**
   * 生成带前缀的实际存储键名
   * @param {string} key - 原始键名
   * @returns 组合前缀后的完整键名
   * @example
   * getKey('token') // returns 'app-token' (当prefix为'app'时)
   */
  private getKey(key: string): string {
    return `${this.prefix}-${key}`
  }

  /**
   * 存储数据到指定键名
   * @template T 存储值的类型
   * @param {string} key - 储键名（不需要包含前缀）
   * @param {T} value - 要存储的值（自动序列化）
   * @param {number} [ttl] 数据的存活时间（单位：毫秒），可选
   * @example
   * client.setItem('user', { name: 'John' }, 60000) // 数据1分钟后过期
   */
  setItem<T>(key: string, value: T, ttl?: number): void {
    const fullKey = this.getKey(key)
    const expired = ttl ? Date.now() + ttl : undefined
    const item = { value, expired }
    this.storage.setItem(fullKey, JSON.stringify(item))
  }

  /**
   * 从指定键名获取存储的数据
   * @param {string} key - 储键名（不需要包含前缀）
   * @param {any} [defaultVal] - 当数据不存在/过期/解析失败时返回的默认值
   * @returns 存储的值或默认值
   * @example
   * const user = client.getItem('user', { name: 'guest' })
   */
  getItem(key: string, defaultVal?: any): any {
    const fullKey = this.getKey(key)
    const valStr = this.storage.getItem(fullKey)
    if (!valStr) {
      return defaultVal
    }

    try {
      const item = JSON.parse(valStr)
      if (item.expired && Date.now() > item.expired) {
        this.storage.removeItem(fullKey)
        return defaultVal
      }
      return item.value
    } catch (e) {
      console.error(e)
      this.storage.removeItem(fullKey)
      return defaultVal
    }
  }

  /**
   * 移除指定键名的存储数据
   * @param {string} key - 储键名（不需要包含前缀）
   */
  removeItem(key: string): void {
    const fullKey = this.getKey(key)
    this.storage.removeItem(fullKey)
  }

  /**
   * 清除所有带有当前前缀的存储数据
   * @example
   * client.clear() // 删除所有以'prefix-'开头的存储项
   */
  clear() {
    const keysToRemove = []
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => this.storage.removeItem(key))
  }
}

export default StorageClient

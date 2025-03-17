/**
 * 存储客户端配置选项
 * @inteface {Object} StorageClientOptions
 * @property {string} [prefix=""] - 缓存键名前缀（用于命名空间隔离）
 * @property {"local"|"session"} [storageType="local"] - 存储类型选择
 */
interface StorageClientOptions {
  prefix?: string
  storageType?: 'local' | 'session'
}

/**
 * 缓存管理客户端
 * @class
 * @description 提供基于 localStorage 和 sessionStorage 的增强型缓存管理功能，支持：
 * - 自动键名前缀隔离
 * - TTL 过期时间控制
 * - 安全数据序列化/反序列化
 */
class StorageClient {
  /**
   * 缓存键名前缀（自动附加到所有键名前）
   * @private
   * @type {string}
   */
  private prefix: string

  /**
   * 底层存储对象 (localStorage 或 sessionStorage)
   * @private
   * @type {Storage}
   */
  private storage: Storage

  /**
   * 创建存储客户端实例
   * @constructor
   * @param {StorageClientOptions} [options={}] - 客户端配置选项
   * @example
   * new StorageClient({ prefix: 'app', storageType: 'session' })
   */
  constructor({ prefix = '', storageType = 'local' }: StorageClientOptions = {}) {
    this.prefix = prefix
    this.storage = storageType === 'local' ? localStorage : sessionStorage
  }

  /**
   * 生成带前缀的真实存储键名
   * @private
   * @method
   * @param {string} key - 原始键名
   * @returns {string} 组合后的完整键名
   */
  private getKey(key: string): string {
    return `${this.prefix}-${key}`
  }

  /**
   * 存储数据项
   * @template T
   * @method
   * @param {string} key - 存储键名
   * @param {T} value - 需要存储的值（自动 JSON 序列化）
   * @param {number} [ttl] - 过期时间（单位：毫秒）
   * @example
   * setItem('token', 'abc123', 3600_000) // 1小时后过期
   */
  setItem<T>(key: string, value: T, ttl?: number): void {
    const fullKey = this.getKey(key)
    const expired = ttl ? Date.now() + ttl : undefined
    const item = { value, expired }
    this.storage.setItem(fullKey, JSON.stringify(item))
  }

  /**
   * 获取数据项
   * @method
   * @param {string} key - 要获取的键名
   * @param {*} [defaultVal] - 当键不存在或过期时的默认值
   * @returns {*} 存储的值或默认值（自动 JSON 反序列化）
   */
  getItem<T = any>(key: string, defaultVal?: T): T | undefined {
    const fullKey = this.getKey(key)
    const valStr = this.storage.getItem(fullKey)

    if (!valStr) return defaultVal

    try {
      const item = JSON.parse(valStr)
      if (item.expired && Date.now() > item.expired) {
        this.storage.removeItem(fullKey)
        return defaultVal
      }
      return item.value
    } catch (e) {
      console.error(`Storage parse error [${fullKey}]:`, e)
      this.storage.removeItem(fullKey)
      return defaultVal
    }
  }

  /**
   * 删除指定键值对
   * @method
   * @param {string} key - 要删除的键名
   */
  removeItem(key: string): void {
    const fullKey = this.getKey(key)
    this.storage.removeItem(fullKey)
  }

  /**
   * 清除所有带前缀的存储项
   * @method
   * @description 安全删除所有以当前 prefix 开头的存储项
   */
  clear(): void {
    const keysToRemove: string[] = []
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => this.storage.removeItem(key))
  }
}

export { StorageClient }

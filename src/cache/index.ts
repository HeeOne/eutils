import StorageClient from './StorageClient'
/**
 * createLocalStorage
 * @param {string} prefix - 命名空间
 * @returns {StorageClient}
 */
function createLocalStorage(prefix: string): StorageClient {
  return new StorageClient({ prefix, storageType: 'local' })
}
/**
 * createSessionStorage
 * @param {string} prefix - 命名空间
 * @returns {StorageClient}
 */
function createSessionStorage(prefix: string): StorageClient {
  return new StorageClient({ prefix, storageType: 'session' })
}

export { StorageClient, createLocalStorage, createSessionStorage }

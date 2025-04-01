import StorageClient, { StorageClientOptions } from './StorageClient'
/**
 * createLocalStorage
 * @param {string} prefix - 命名空间
 * @returns {StorageClient}
 */
function createLocalStorage(prefix: string): StorageClient {
  const op: StorageClientOptions = { prefix, storageType: 'local' }
  return new StorageClient(op)
}
/**
 * createSessionStorage
 * @param {string} prefix - 命名空间
 * @returns {StorageClient}
 */
function createSessionStorage(prefix: string): StorageClient {
  const op: StorageClientOptions = { prefix, storageType: 'session' }
  return new StorageClient(op)
}

export { StorageClient, createLocalStorage, createSessionStorage }

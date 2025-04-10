import StorageClient from './StorageClient';
/**
 * createLocalStorage
 * @param {string} prefix - 命名空间
 * @returns {StorageClient}
 */
declare function createLocalStorage(prefix: string): StorageClient;
/**
 * createSessionStorage
 * @param {string} prefix - 命名空间
 * @returns {StorageClient}
 */
declare function createSessionStorage(prefix: string): StorageClient;
export { StorageClient, createLocalStorage, createSessionStorage };

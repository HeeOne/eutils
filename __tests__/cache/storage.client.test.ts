// // storage.client.test.ts
// import StorageClient from '../../src/cache/StorageClient'

// // 模拟本地存储
// const mockLocalStorage = (() => {
//   let store: Record<string, string> = {}
//   return {
//     getItem: jest.fn((key: string) => store[key] || null),
//     setItem: jest.fn((key: string, value: string) => {
//       store[key] = value.toString()
//     }),
//     removeItem: jest.fn((key: string) => {
//       delete store[key]
//     }),
//     clear: jest.fn(() => {
//       store = {}
//     }),
//     key: jest.fn((index: number) => Object.keys(store)[index] || null),
//     get length() {
//       return Object.keys(store).length
//     },
//   }
// })()

// // 模拟会话存储（使用相同实现）
// const mockSessionStorage = { ...mockLocalStorage }

// beforeAll(() => {
//   // 全局替换Storage对象
//   Object.defineProperty(window, 'localStorage', {
//     value: mockLocalStorage,
//     configurable: true,
//   })

//   Object.defineProperty(window, 'sessionStorage', {
//     value: mockSessionStorage,
//     configurable: true,
//   })
// })

// beforeEach(() => {
//   // 每个测试前重置所有模拟和存储
//   jest.clearAllMocks()
//   mockLocalStorage.clear()
//   mockSessionStorage.clear()
//   jest.useRealTimers()
// })

// describe('StorageClient', () => {
//   describe('constructor', () => {
//     it('应该使用默认参数初始化', () => {
//       const client = new StorageClient({})
//       expect(client).toBeInstanceOf(StorageClient)
//       expect(client['prefix']).toBe('')
//       expect(client['storage']).toBe(localStorage)
//     })

//     it('应该正确设置prefix和storageType', () => {
//       const client = new StorageClient({ prefix: 'test', storageType: 'session' })
//       expect(client['prefix']).toBe('test')
//       expect(client['storage']).toBe(sessionStorage)
//     })
//   })

//   describe('getKey', () => {
//     it('应该生成正确的带前缀键名', () => {
//       const client = new StorageClient({ prefix: 'app' })
//       const privateGetKey = (key: string) => client['getKey'](key)
//       expect(privateGetKey('token')).toBe('app-token')
//     })

//     it('空prefix时应该直接使用原键名', () => {
//       const client = new StorageClient({ prefix: '' })
//       const privateGetKey = (key: string) => client['getKey'](key)
//       expect(privateGetKey('token')).toBe('token')
//     })
//   })

//   describe('setItem', () => {
//     it('应该存储带过期时间的对象', () => {
//       jest.useFakeTimers().setSystemTime(1640995200000) // 2023-01-01 00:00:00
//       const client = new StorageClient({ prefix: 'test' })

//       client.setItem('key1', 'value1', 3600000) // 1小时过期
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'test-key1',
//         JSON.stringify({
//           value: 'value1',
//           expired: 1640995200000 + 3600000,
//         }),
//       )
//     })

//     it('应该存储不带过期时间的对象', () => {
//       const client = new StorageClient({ prefix: 'test' })
//       client.setItem('key2', { a: 1 })
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'test-key2',
//         JSON.stringify({
//           value: { a: 1 },
//           expired: undefined,
//         }),
//       )
//     })
//   })

//   describe('getItem', () => {
//     it('应该返回存在的有效值', () => {
//       const client = new StorageClient({ prefix: 'app' })
//       localStorage.setItem(
//         'app-token',
//         JSON.stringify({
//           value: 'abc123',
//           expired: Date.now() + 10000,
//         }),
//       )

//       expect(client.getItem('token')).toBe('abc123')
//     })

//     it('应该返回默认值当键不存在时', () => {
//       const client = new StorageClient({})
//       expect(client.getItem('nonexistent', 'default')).toBe('default')
//     })

//     it('应该删除并返回默认值当数据过期时', () => {
//       jest.useFakeTimers().setSystemTime(1640995200000)
//       const client = new StorageClient({ prefix: 'test' })

//       // 存储已过期的数据
//       localStorage.setItem(
//         'test-temp',
//         JSON.stringify({
//           value: 'data',
//           expired: 1640995200000 - 1,
//         }),
//       )

//       expect(client.getItem('temp', 'expired')).toBe('expired')
//       expect(localStorage.removeItem).toHaveBeenCalledWith('test-temp')
//     })

//     it('应该处理无效的JSON数据', () => {
//       const client = new StorageClient({})
//       localStorage.setItem('invalid', 'invalid{json')

//       expect(client.getItem('invalid', 'error')).toBe('error')
//       expect(localStorage.removeItem).toHaveBeenCalledWith('invalid')
//     })
//   })

//   describe('removeItem', () => {
//     it('应该删除指定的键', () => {
//       const client = new StorageClient({ prefix: 'app' })
//       client.removeItem('token')
//       expect(localStorage.removeItem).toHaveBeenCalledWith('app-token')
//     })
//   })

//   describe('clear', () => {
//     it('应该清除所有带前缀的键', () => {
//       const client = new StorageClient({ prefix: 'test' })

//       // 设置测试数据
//       localStorage.setItem('test-key1', 'value1')
//       localStorage.setItem('test-key2', 'value2')
//       localStorage.setItem('other-key', 'value3')

//       client.clear()

//       expect(localStorage.removeItem).toHaveBeenCalledTimes(2)
//       expect(localStorage.getItem('test-key1')).toBeNull()
//       expect(localStorage.getItem('other-key')).toBe('value3')
//     })
//   })

//   describe('集成测试', () => {
//     it('应该正确处理整个生命周期', () => {
//       const client = new StorageClient({ prefix: 'app' })

//       // 设置数据
//       client.setItem('user', { name: 'John' }, 1000)
//       expect(client.getItem('user')).toEqual({ name: 'John' })

//       // 等待过期
//       jest.advanceTimersByTime(1001)
//       expect(client.getItem('user')).toBeUndefined()

//       // 重新设置
//       client.setItem('user', { name: 'Alice' })
//       expect(client.getItem('user')).toEqual({ name: 'Alice' })

//       // 删除
//       client.removeItem('user')
//       expect(client.getItem('user')).toBeUndefined()
//     })
//   })
// })

test('', () => {})

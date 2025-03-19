import * as url from '../../src/url/index'

describe('Test URL module', () => {
  test('param2Obj', () => {
    expect(url.param2Obj('http://example.com?name=John&age=20')).toEqual({
      name: 'John',
      age: '20',
    })
  })

  test('obj2UrlParam', () => {
    expect(url.obj2UrlParam({ name: 'John', age: 20, gender: 'female' }, ['age'])).toBe(
      'name=John&gender=female',
    )
  })
})

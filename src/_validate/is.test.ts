import * as is from './is'

test('isDef', () => {
  expect(is.isDef(undefined)).toBeFalsy()
  expect(is.isDef('undefined')).toBeTruthy()
})

test('isNull', () => {
  expect(is.isNull(null)).toBeTruthy()
  expect(is.isNull('null')).toBeFalsy()
})

test('isNullOrUndef', () => {
  expect(is.isNullOrUndef(undefined)).toBeTruthy()
  expect(is.isNullOrUndef(null)).toBeTruthy()
  expect(is.isNullOrUndef('null')).toBeFalsy()
})

test('isNumber', () => {
  expect(is.isNumber(3)).toBeTruthy()
  expect(is.isNumber('3')).toBeFalsy()
  expect(is.isNumber(NaN)).toBeTruthy()
})

test('isString', () => {
  expect(is.isString('3')).toBeTruthy()
})

test('isArray', () => {
  expect(is.isArray([])).toBeTruthy()
})

test('isTrueObject', () => {
  expect(is.isTrueObject({})).toBeTruthy()
})

import { getPercentWithPrecision } from '../../src/math/al'

test('getPercentWithPrecision', () => {
  expect(getPercentWithPrecision([200, 240, 600, 555])).toEqual([12.54, 15.05, 37.62, 34.79])
})

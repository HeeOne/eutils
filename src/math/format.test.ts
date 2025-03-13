import { formatNumberThousands, formatNumberToPrecise } from './format'

test('formatNumberThousands', () => {
  const case1 = 1234566.7865
  expect(formatNumberThousands(case1)).toBe('1,234,566.7865')
  expect(formatNumberThousands(case1, 2)).toBe('1,234,566.79')

  const case2 = 1234566.783
  expect(formatNumberThousands(case2)).toBe('1,234,566.783')
  expect(formatNumberThousands(case2, 2)).toBe('1,234,566.78')

  const case3 = 123
  expect(formatNumberThousands(case3)).toBe('123')
  expect(formatNumberThousands(case3, 2)).toBe('123')
})

test('formatNumberToPrecise', () => {
  const case1 = 1234566.7865
  expect(formatNumberToPrecise(case1)).toBe(1234566.79)
  expect(formatNumberToPrecise(case1, 2)).toBe(1234566.79)
  expect(formatNumberToPrecise(case1, 0)).toBe(1234567)

  const case3 = 123
  expect(formatNumberToPrecise(case3)).toBe(123)
  expect(formatNumberToPrecise(case3, 2)).toBe(123)
})

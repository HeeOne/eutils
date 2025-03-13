import * as date from './index'

test('parseTime', () => {
  const numbertype = 1741774414444
  const dateObj = new Date(numbertype)
  expect(date.parseTime(numbertype)).toBe('2025-03-12 18:13:34')
  expect(date.parseTime(numbertype + '')).toBe('2025-03-12 18:13:34')
  expect(date.parseTime(dateObj)).toBe('2025-03-12 18:13:34')

  const fm = '{y}-{m}-{d}'
  expect(date.parseTime(numbertype, fm)).toBe('2025-03-12')
  expect(date.parseTime(numbertype + '', fm)).toBe('2025-03-12')
  expect(date.parseTime(dateObj, fm)).toBe('2025-03-12')
})

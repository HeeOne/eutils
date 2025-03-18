import * as date from '../../src/date/index'

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

test('listMonths With new Date()', () => {
  expect(date.listMonths(new Date('2025-01'), new Date('2025-03'))).toEqual([
    '2025-01',
    '2025-02',
    '2025-03',
  ])
})
test('listMonths With timestamp', () => {
  expect(date.listMonths(new Date('2024-12').getTime(), new Date('2025-03').getTime())).toEqual([
    '2024-12',
    '2025-01',
    '2025-02',
    '2025-03',
  ])
})

test('generateDatefrom', () => {
  expect(date.generateDatefrom(1742194738400, -30).getTime()).toBe(1744786738400)
  expect(date.generateDatefrom(1742194738400).getTime()).toBe(1734418738400)
})

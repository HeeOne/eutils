export type NumberLike = number | string

const toString = Object.prototype.toString

function toRawType(value: any): string {
  return toString.call(value).slice(8, -1)
}

export function isArray(value: any): boolean {
  return toRawType(value) === 'Array'
}

export function isTrueObject(value: any): boolean {
  return toRawType(value) === 'Object'
}

export function isNumber(value: any): boolean {
  return toRawType(value) === 'Number'
}
export function isNumberLike(value: any): boolean {
  return (isNumber(value) && !isNaN(value)) || isString(value)
}

export function isString(value: any): boolean {
  return toRawType(value) === 'String'
}

export function isUndef(value: any): boolean {
  return toRawType(value) == 'Undefined'
}

export function isDef(value: any): boolean {
  return !isUndef(value)
}

export function isNull(value: any): boolean {
  return toRawType(value) == 'Null'
}

export function isNullOrUndef(value: any): boolean {
  return isNull(value) || isUndef(value)
}

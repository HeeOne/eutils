const toString = Object.prototype.toString;
function toRawType(value) {
    return toString.call(value).slice(8, -1);
}
function isUndef(value) {
    return toRawType(value) == 'Undefined';
}
function isDef(value) {
    return !isUndef(value);
}

export { isDef, isUndef };

/** Largest Reminder Method 计算百分数
 * @param {number[]} arr - 原始数据
 * @param {number} [precision = 2] - 精确度
 * @return {number[]} arr - 对应百分比
 *
 * @example
 * // 示例 1: 不指定小数位数
 * formatNumberToPrecise([200, 240, 600, 555]); // 输出: [12.54, 15.05, 37.62, 34.79]
 *
 */
function getPercentWithPrecision(arr, precision = 2) {
    if (!Array.isArray(arr)) {
        return;
    }
    var resultArr = [];
    var digits = Math.pow(10, precision);
    var totalSeats = digits * 100;
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += isNaN(arr[i]) ? 0 : arr[i];
    }
    var votesPerQuota = [];
    for (var i = 0; i < arr.length; i++) {
        votesPerQuota.push((arr[i] / sum) * digits * 100);
    }
    var seats = [];
    var reminder = [];
    var currentSeats = 0;
    for (var i = 0; i < votesPerQuota.length; i++) {
        var intPart = Math.floor(votesPerQuota[i]);
        seats.push(intPart);
        reminder.push(votesPerQuota[i] - intPart);
        currentSeats += intPart;
    }
    while (currentSeats < totalSeats) {
        var max = Number.MIN_SAFE_INTEGER;
        var maxIndex = null;
        for (var i = 0; i < reminder.length; i++) {
            if (reminder[i] > max) {
                max = reminder[i];
                maxIndex = i;
            }
        }
        reminder[maxIndex] = 0;
        ++currentSeats;
        ++seats[maxIndex];
    }
    for (var i = 0; i < seats.length; i++) {
        resultArr.push(seats[i] / digits);
    }
    return resultArr;
}

export { getPercentWithPrecision };

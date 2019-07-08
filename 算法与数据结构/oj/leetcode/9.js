/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    return +(x.toString().split('').reverse().join('')) == x;
};

// 你能不将整数转为字符串来解决这个问题吗？
var isPalindrome1 = function(x) {
    var arr = x.toString().split('');
    if (arr.length<=1) return true;
    var l = 0;
    var r = arr.length-1;
    while(l<r) {
      if (arr[l] == arr[r]) {
        l++;
        r--;
      } else {
        return false;
      }
    }
    return true;
};

var n = 0
console.log(isPalindrome1(n));
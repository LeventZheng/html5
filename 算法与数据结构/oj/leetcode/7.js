/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  var flag = true;
  if (x<0) {
    flag = false;
    x*=-1;
  }
  var rev = x.toString().split('').reverse().join('');
  if (!flag) {
    rev*=-1;
  } else {
    rev *= 1;
  }
  if (rev > Math.pow(2, 31) -1 || rev<Math.pow(2,31)*(-1)) {
    return 0;
  }
  return rev
};

var num = -1563847412;
console.log(reverse(num));

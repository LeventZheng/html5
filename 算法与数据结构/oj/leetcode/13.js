/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  var total = 0;
  var letters = {
    'I':0, 'V':1, 'X':2, 'L':3, 'C':4, 'D':5, 'M':6
  };
  var nums = [1, 5, 10, 50, 100, 500, 1000];
  var letterIndex = -1; // 判断前进还是后退，代表加还是减
  var isAdd = true;
  var arr = s.split('');
  for (var i=arr.length-1;i>=0; i--) {
    var char = arr[i];
    var charIndex = letters[char];
    if (letterIndex<0) {
      letterIndex = charIndex;
    } else {
      if (charIndex<letterIndex) {
        isAdd = false;
      } else {
        isAdd = true;
        letterIndex = charIndex;
      }
    }
    if (isAdd) {
      total += nums[charIndex];
    } else {
      total -= nums[charIndex];
    }
  }
  return total;
};

var s = 'MCMXCIV';
console.log(romanToInt(s));

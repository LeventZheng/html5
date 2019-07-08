/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var array = s.split('');
  if (!array.length) return 0;
  var result = 1;
  var temp = 1;
  var left = [array[0]];
  for (var i=1; i<array.length; i++) {
    if (left.indexOf(array[i])==-1) {
      left.push(array[i]);
      temp++;
    } else {
      result = temp>result?temp:result;
      var il = left.indexOf(array[i]);
      temp = left.length - il;
      left = left.slice(il+1);
      left.push(array[i]);
    }
  }
  result = temp>result?temp:result;
  return result;
};

var r = lengthOfLongestSubstring('pwwkew');
console.log(r);

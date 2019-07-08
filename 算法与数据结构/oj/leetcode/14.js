/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  var result = '';
  if (strs.length == 0) return result;
  var v = strs[0];
  var index = 0;
  if (index>=v.length) return result;
  while(true) {
    var char = v.substr(index, 1);
    for (var i=1; i<strs.length; i++) {
      if (index>=strs[i].length) return result;
      if (strs[i].substr(index, 1) != char) {
        return result;
      }
    }
    result += char;
    index++;
    if (index>=v.length) return result;
  }
};

var strs = ["dog","cecar","racar"];
console.log(longestCommonPrefix(strs));
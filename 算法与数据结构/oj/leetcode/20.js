/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s=='') return true;
  var arr = s.split('');
  var stack = [];
  for (var i=0; i<arr.length; i++) {
    if (stack.length == 0) {
      stack.push(arr[i]);
    } else {
      var top = stack[stack.length-1];
      switch (top) {
        case '(':
          if (arr[i] == ')') stack.pop();
          else stack.push(arr[i]);
          break;
        case '[':
          if (arr[i] == ']') stack.pop();
          else stack.push(arr[i]);
          break;
        case '{':
          if (arr[i] == '}') stack.pop();
          else stack.push(arr[i]);
          break;
      }
    }
  }
  return stack.length==0;
};

var s = "[])";
console.log(isValid(s));
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  var result = [];
  for (var i=0; i<numRows; i++) {
    var line = [];
    for (var j=0; j<=i; j++) {
      if (result[i-1] && result[i-1][j-1] && result[i-1][j]) {
        line.push(result[i-1][j-1]+result[i-1][j]);
      } else {
        line.push(1);
      }
    }
    result.push(line);
  }
  return result;
};

console.log(generate(5));

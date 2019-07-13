/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  var row = [];
  for (var i=0; i<=rowIndex; i++) {
    var line = [];
    for (var j=0; j<=i; j++) {
      if (row[i-1] && row[i-1][j-1] && row[i-1][j]) {
        line.push(row[i-1][j-1]+row[i-1][j]);
      } else {
        line.push(1);
      }
    }
    row.push(line);
  }
  return row[rowIndex];
};

console.log(getRow(4));
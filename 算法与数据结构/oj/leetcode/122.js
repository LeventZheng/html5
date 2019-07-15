/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length<=1) return 0;
  var result = 0;
  var minIndex = 0;
  for (var i=0; i<prices.length; i++) {
    if (prices[i+1] > prices[i]) {
      if (i==prices.length-1) {
        result += prices[i] - prices[minIndex];
      }
    } else {
      result += prices[i] - prices[minIndex];
      minIndex = i+1;
    }
  }
  return result;
};

var prices = [7,6,4,3,1]
console.log(maxProfit(prices));

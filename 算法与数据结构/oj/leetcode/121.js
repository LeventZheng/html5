/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length<=1) return 0;
  var minIndex = 0;
  var maxIndex = 0;
  var tempMinIndex = 0;
  for (var i=1; i<prices.length; i++) {
    if (prices[i] > prices[maxIndex]) {
      maxIndex = i;
    }

    if (prices[i]<prices[tempMinIndex]) {
      tempMinIndex = i;
    }

    if (prices[i] - prices[tempMinIndex] > prices[maxIndex] - prices[minIndex]) {
      maxIndex = i;
      minIndex = tempMinIndex;
    }
  }
  return prices[maxIndex] - prices[minIndex];
};

var prices = [2,1,4]
console.log(maxProfit(prices));

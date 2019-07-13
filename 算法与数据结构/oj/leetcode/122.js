/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length<=1) return 0;
  var result = 0;
  var minIndex = 0;
  var maxIndex = 0;
  var tempMaxIndex = 0;
  for (var i=0; i<prices.length; i++) {
    if (prices[i] > prices[tempMaxIndex]) {
      tempMaxIndex = i;
    } else {
      result += prices[tempMaxIndex] - prices[minIndex];
      minIndex = i;
    }
  }
};

// 关键在找minIndex


// i+1 如果 小于 i
// 当前是最大值，i - minIndex
// minIndex = i+1


// i+1 如果大于 i
// 继续
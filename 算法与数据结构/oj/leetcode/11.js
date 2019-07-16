/**
 * @param {number[]} height
 * @return {number}
 */
/* var maxArea = function(height) {
  var result = 0;
  for (var i=0; i<height.length-1; i++) {
    for (var j=i+1; j<height.length; j++) {
      var y = height[i]>height[j]?height[j]:height[i];
      var x = j-i;
      var tempResult = x*y;
      result = tempResult>result?tempResult:result;
    }
  }
  return result;
}; */

// 双指针法
var maxArea = function(height) {
  var result = 0;
  var l=0, r=height.length-1;
  while(l<r) {
    var y = height[l]>height[r]?height[r]:height[l];
    var x = r-l;
    var tempResult = x*y;
    result = tempResult>result?tempResult:result;
    if (height[l]>height[r]) {
      r--;
    } else {
      l++;
    }
  }
  return result;
};

var height = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height));

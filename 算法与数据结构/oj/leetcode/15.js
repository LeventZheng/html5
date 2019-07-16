/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums.sort(function(a,b) {
    return a-b;
  });

  var result = [];
  for (var i=0; i<nums.length; i++) {
    for (var j=i+1; j<nums.length; j++) {
      for (var k=j+1; k<nums.length; k++) {
        if (nums[k]*(-1) == nums[i] + nums[j]) {
          result.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }
  return result;
};

var nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));

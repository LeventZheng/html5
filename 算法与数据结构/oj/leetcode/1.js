/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var result = [];
  for (var i=0; i<nums.length-1; i++) {
    result = [i];
    for (var j=i+1; j<nums.length; j++) {
      if (nums[j] + nums[i] == target) {
        result.push(j);
        return result;
      }
    }
  }
};
var nums = [-1,-2,-3,-4,-5]
console.log(twoSum(nums, -8));
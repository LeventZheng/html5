/**
 * @param {number[]} nums
 * @return {number}
 */
// var maxSubArray = function(nums) {
//   var result = 0;
//   var temp = 0;
//   var flag = false;
//   for (var i=0; i<nums.length; i++) {
//     if (nums[i] > 0) {
//       flag = true;
//       temp = 0;
//       for (var j=i; j<nums.length; j++) {
//         temp += nums[j];
//         result = temp > result ? temp : result;
//       }
//     }
//   }
//   if (!flag) {
//     result = nums[0];
//     for (var i=1; i<nums.length; i++) {
//       result = nums[i] > result ? nums[i] : result;
//     }
//   }
//   return result;
// };

var maxSubArray = function(nums) {
  var result = 0;
  var temp = 0;
  var flag = false;
  for (var i=0; i<nums.length; i++) {
    temp += nums[i];
    if (nums[i]>0) {
      flag = true;
      result = temp > result ? temp : result;
    } else {

    }
    temp = 0;
  }
  if (!flag) {
    result = nums[0];
    for (var i=1; i<nums.length; i++) {
      result = nums[i] > result ? nums[i] : result;
    }
  }
  return result;
};

var nums = [1, 2];
console.log(maxSubArray(nums));

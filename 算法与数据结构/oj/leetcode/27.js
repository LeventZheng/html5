/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  var end = nums.length-1;
  for (var i=0; i<end+1; i++) {
    if (nums[i] == val) {
      for (var j=i; j<end; j++) {
        nums[j] = nums[j+1];
      }
      nums[end] = val;
      i--;  // 返回上一步检查，有可能下一个元素还等于val
      end--;
    }
  }
  console.log(nums);
  return end+1;
};
// var removeElement = function(nums, val) {
//   var n = nums.length;
//   for (var i=n-1; i>=0; i--) {
//     if (nums[i] == val) {
//       nums.splice(i,1);
//     }
//   }
//   console.log(nums);
//   return nums.length;
// };

var nums =  [0,1,2,2,3,0,4,2];
console.log(removeElement(nums, 2));

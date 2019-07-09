/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  var n = nums.length;
  if (n == 0) return 0;
  var unRepeatIndex = 1;
  for (var i=1; i<n; i++) {
    if (nums[i]>nums[unRepeatIndex-1]) {
      if (i>unRepeatIndex) {
        var temp = nums[i];
        nums[i] = nums[unRepeatIndex];
        nums[unRepeatIndex] = temp;
      }
      unRepeatIndex++;
    }
  }
  return unRepeatIndex;
};

var nums = [1,1,2]
console.log(removeDuplicates(nums));

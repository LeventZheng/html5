/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  var sortedArr = [];
  var i=0, j=0;
  while(i<m && j<n) {
    if (nums1[i]<=nums2[j]) {
      sortedArr.push(nums1[i]);
      i++;
    } else {
      sortedArr.push(nums2[j]);
      j++;
    }
  }
  while(i<m) {
    sortedArr.push(nums1[i]);
    i++;
  }
  while(j<n) {
    sortedArr.push(nums2[j]);
    j++;
  }
  for (var i=0; i<sortedArr.length; i++) {
    nums1[i] = sortedArr[i];
  }
};
nums1 = [1,2,3,0,0,0], m = 3;
nums2 = [2,5,6],       n = 3;

merge(nums1, m, nums2, n)
console.log(nums1);

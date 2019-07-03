/**
 * 数组排序-快速排序
 * 时间复杂度 O{nlog(n)}
 * 空间复杂度 O{1}
 * 取待排序数组的第一个作为标的，目标是找到它应该在哪个位置
 * 从上个元素找到的位置，将数组分为前后两个子数组，递归调用快速排序，寻找子数组第一个元素的最终位置
 * 以此类推
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function QuickSort(arr) {
  _QuickSort(arr, 0, arr.length-1); // [0, arr.length-1]
}

function _QuickSort(arr, l, r) {
  if (l < r) {
    var v = arr[l]; // 取第一个元素作为标的
    var j = l;  // 比v小的区间末尾位置
    for (var i=l+1; i<=r; i++) {
      if (arr[i]<v) {
        j++;
        arr.swap(i, j);
      }
    }
    arr.swap(l, j);
    _QuickSort(arr, l, j-1);
    _QuickSort(arr, j+1, r);
  }
}
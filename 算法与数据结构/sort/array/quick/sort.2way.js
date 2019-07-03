function QuickSort2Way(arr) {
  _QuickSort2Way(arr, 0, arr.length-1);
}

function _QuickSort2Way(arr, l, r) {
  if (l<r) {
    var v = arr[l];
    var i=l+1, j=r;
    while(true) {
      while (i<=r && arr[i]<v) {
        i++;
      }
      while (j>=l && arr[j]>v) {
        j--;
      }
      if (i>=j) {
        break;
      }
      // ==v的情况仍要要两边交换一下位置，这样避免==v的元素在一边数组区间集中
      arr.swap(i, j);
      i++;
      j--;
    }
    // 上面的循环结束的条件是i<j,说明此时i>=j，j是左边<=v区间的最后一个
    arr.swap(l, j);
    _QuickSort2Way(arr, l, j-1);
    _QuickSort2Way(arr, j+1, r);
  }
}
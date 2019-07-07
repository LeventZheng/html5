function QuickSort2Way(arr) {
  _QuickSort2Way(arr, 0, arr.length-1);
}

function _QuickSort2Way(arr, l, r) {
  if (l<r) {
    var v = arr[l]; // 这里可以先将l与[l,r]中的一个随机位置交换再取arr[l]
    var i=l+1;  // 从左到右的遍历索引，指向下一个要考察的元素，[l+1,i)<=v 初始区间为空
    var j=r;    // 从右到左的遍历索引，指向下一个要考察的元素，(j,r]>=v 初始区间为空
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
    // 跳出循环的时候，j指向的是<=v的元素，[l,j]<=v
    // i指向的是>=v的元素,[i,r]>=v，i==j或者i==j+1
    arr.swap(l, j);
    _QuickSort2Way(arr, l, j-1);
    _QuickSort2Way(arr, j+1, r);
  }
}
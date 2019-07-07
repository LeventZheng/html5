function QuickSort3Way(arr) {
  _QuickSort3Way(arr, 0, arr.length-1);
}

function _QuickSort3Way(arr, l, r) {
  if (l<r) {          // 避免越界，死循环
    var v = arr[l];   // 标的元素
    var lt = l;       // arr[l+1...lt] < v,初始的时候这部分是空的，lt指向 <v 的最后一个位置
    var gt = r+1;     // arr[gt, r] > v,初始的时候这部分是空的，gt指向 >v 的第一个位置
    var i = l+1;      // arr[lt+1...i) == v，i是正在考察的元素
    // 区间分布 [l+1,lt](lt,i)i...[gt,r]
    while(i<gt) {
      if(arr[i] < v) {
        arr.swap(lt+1, i);
        lt++;
        i++;
      }
      else if(arr[i]>v) {
        arr.swap(i, gt-1);
        gt--;
      }
      else i++;
    }
    // 结束时i==gt，区间分布[l,lt]<v,(lt,gt)==v,[gt,r]>v
    arr.swap(l, lt);
    _QuickSort3Way(arr, l, lt-1);
    _QuickSort3Way(arr, gt, r);
  }
}
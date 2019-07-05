function QuickSort3Way(arr) {
  _QuickSort3Way(arr, 0, arr.length-1);
}

function _QuickSort3Way(arr, l, r) {
  if (l<r) {
    var v = arr[l];   // 标的元素
    var lt = l;       // arr[l+1...lt] < v,初始的时候这部分是空的，lt指向 <v 的最后一个位置
    var gt = r+1;     // arr[gt, r] > v,初始的时候这部分是空的，gt指向 >v 的第一个位置
    var i = l+1;      // arr[lt+1...i) == v，i是正在考察的元素
    // while(i<gt) {
    //   while(arr[i] == v) i++;
    //   while(arr[i] < v) {
    //     lt++;
    //     arr.swap(lt, i);
    //     i++;
    //   }
    //   while(arr[i]>v) {
    //     gt--;
    //     arr.swap(i, gt);
    //   }
    // }
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
    arr.swap(l, lt);
    _QuickSort3Way(arr, l, lt-1);
    _QuickSort3Way(arr, gt, r);
  }
}
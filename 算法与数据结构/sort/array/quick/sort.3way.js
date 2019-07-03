function QuickSort3Way(arr) {
  _QuickSort3Way(arr, 0, arr.length-1);
}

function _QuickSort3Way(arr, l, r) {
  if (l<r) {
    var lt = l;
    var gt = r;
    var i=l+1;
    var v = arr[l];
    while(i<gt) {
      while(arr[i] == v) i++;
      while(arr[i] < v) {
        lt++;
        arr.swap(lt, i);
        i++;
      }
      while(arr[i]>v) {
        gt--;
        arr.swap(i, gt);
      }
    }
    _QuickSort3Way(arr, l, lt);
    _QuickSort3Way(arr, gt, r);
  }
}
function HeapSort(arr) {
  for (var i=arr.length-1; i>=0; i--) {
    _Heapify(arr, i);
    arr.swap(0, i);
  }
}

// r是未排序数组的最后一个元素的索引
function _Heapify(arr, r) {
  var firstNotLeaf = parseInt((r-1)/2);
  for (var i=firstNotLeaf; i>=0; i--) {
    _ShiftDown(arr, i, r);
  }
}

function _ShiftDown(arr, k, r) {
  while((k*2+1)<=r) {
    var target = k*2+1;
    if ((k*2+2)<=r&&arr[k*2+2]>arr[k*2+1]) {
      target++;
    }
    if (arr[k]>=arr[target]) break;
    arr.swap(k, target);
    k = target;
  }
}
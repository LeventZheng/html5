function HeapSort(arr) {
  for (var i=(n-1)/2; i>=0; i--) {
    _shiftDown(arr, n, i);
  }

  for (var i=n-1; i>0; i--) {
    arr.swap(0, i);
    _shiftDown(arr, i, 0);
  }
}
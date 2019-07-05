function MergeSort(arr) {
  _MergeSort(arr, 0, arr.length-1);
}

function _MergeSort(arr, l, r) {
  if (l<r) {
    var middle = parseInt((l+(r-l)/2));
    _MergeSort(arr, l, middle);
    _MergeSort(arr, middle+1, r);
  }
  // [l...middle] [middle+1,r]
  _Merge(arr, l, middle, r);
}

function _Merge(arr, l, middle, r) {
  var i=l;
  var j=middle+1;
  var sortedArr = [];
  while(i<middle&&j<r) {
    if (arr[i]<=arr[j]) {
      sortedArr.push(arr[i]);
      i++;
    } else {
      sortedArr.push(arr[j]);
      j++;
    }
  }
  while(i<middle) {
    sortedArr.push(arr[i]);
    i++;
  }
  while(j<r) {
    sortedArr.push(arr[j]);
    j++;
  }
  for (var k=0; k<sortedArr.length; k++) {
    arr[l+k] = sortedArr[k];
  }
};
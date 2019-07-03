function MergeSort(arr) {
  _MergeSort(arr, 0, arr.length-1);
}
function _MergeSort(arr, left, right) {
  var middle = parseInt((left+right)/2);
  if (left+1 < right) {
    _MergeSort(arr, left, middle);
    _MergeSort(arr, middle+1, right);
  }
  if (arr[middle]>arr[middle+1]) {
    _Merge(arr, left, middle, right);
  }
}

function _Merge(arr, left, middle, right) {
  var tempArr = [], index = 0;
  var i = left, j = middle+1;
  while(i<=middle && j<=right) {
    if (arr[i] < arr[j]) {
      tempArr[index] = arr[i];
      i++;
    } else {
      tempArr[index] = arr[j];
      j++;
    }
    index++;
  }
  while(i<=middle) {
    tempArr[index] = arr[i];
    i++;
    index++;
  }
  while(j<=right) {
    tempArr[index] = arr[j];
    j++;
    index++;
  }
  for(var k=0; k<tempArr.length; k++) {
    arr[left+k] = tempArr[k];
  }
}


function MergeSortBU(arr) {
  // 先22排序，再44排序，以此类推
  // 0-1 2-3 4-5 6-7 8-9
  // 0-3 4-7 8-9
  // 0-7 8-9
  // 0-9
  for(var length = 2; length < arr.length; length=length*2) {
    var left = 0;
    var right = length-1;
    for (; right<arr.length+length;) {
      if (right >= arr.length) {
        right = arr.length-1;
      }
      _Merge(arr, left, parseInt(left + (right-left)/2), right);
      left += length;
      right += length;
    }
  }
}
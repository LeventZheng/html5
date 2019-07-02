function MergeSort(arr) {
  _MergeSort(arr, 0, arr.length-1);
}

function _MergeSort(arr, begin, end) {
  if (begin < end) {
    var middle = parseInt((begin+end)/2);
    var left = _MergeSort(arr, begin, middle);
    var right = _MergeSort(arr, middle, end);
  }

  var result = [], index=0;
  var i=begin, j=middle;
  while(i<middle && j<=end) {
    if (left[i] < right[j]) {
      result[index] = left[i];
      i++;
    }
    if (left[i] < right[j]) {
      result[index] = right[j];
      j++;
    }
    index++;
  }
  while(i<middle) {
    result[index] = left[i];
    i++;
    index++;
  }
  while(j<=end) {
    result[index] = right[j];
    j++;
    index++;
  }
  return result;
}
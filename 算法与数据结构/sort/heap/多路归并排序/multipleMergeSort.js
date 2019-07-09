function MultipleMergeSort(arr) {
  _MultipleMergeSort(arr, 0, arr.length-1);
}

function _MultipleMergeSort(arr, l, r) {
  // [l,r]之间有4个元素才拆分
  if (r-l<6) {
    _InsertionSort(arr, l, r);
    return;
  }
  var middle2 = parseInt((l+r)/2);
  var middle1 = parseInt((l+middle2)/2);
  var middle3 = parseInt((middle2+r)/2);
  _MultipleMergeSort(arr, l, middle1);
  _MultipleMergeSort(arr, middle1+1, middle2);
  _MultipleMergeSort(arr, middle2, middle3);
  _MultipleMergeSort(arr, middle3+1, r);
  _Merge(arr, l, middle1, middle2, middle3, r);
}

function _InsertionSort(arr, l, r) {
  for (let i=l; i<=r; i++) {
      let target = arr[i];
      for (j=i-1; j>=0; j--) {
          if (arr[j] > arr[j+1]) {
              arr[j+1] = arr[j];
          } else {
              arr[j+1] = target;
              break;
          }
      }
  }
}

function _Merge(arr, l, middle1, middle2, middle3, r) {
  var a = l, b = middle1+1, c = middle2+1, d = middle3+1;
  var sortedArr = [];
  var indexMinHeap = new IndexMinHeap();
  indexMinHeap.insert(a,arr[a]);
  indexMinHeap.insert(b,arr[b]);
  indexMinHeap.insert(c,arr[c]);
  indexMinHeap.insert(d,arr[d]);
  a++;
  b++;
  c++;
  d++;
  while(a<=middle1 || b<=middle2 || c<= middle3 || d<= r) {
    var target = indexMinHeap.extractMaxIndex();
    sortedArr.push(arr[target]);
    if (target<=middle1) {
      a++;
      indexMinHeap.insert(a,arr[a]);
    }
    if (target<=middle2) {
      b++;
      indexMinHeap.insert(b,arr[b]);
    }
    if (target<=middle3) {
      c++;
      indexMinHeap.insert(c,arr[c]);
    }
    if (target<=r) {
      d++;
      indexMinHeap.insert(d,arr[d]);
    }
  }
  for (var i=sortedArr.length-1; i>=0; i--) {
    arr[l+i] = sortedArr[i];
  }
}
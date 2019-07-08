function QuickSort(arr) {
  _QUickSortOptimize(arr, 0, arr.length-1);
}

// [l...r]
function _QUickSort(arr, l, r) {
  if (l<r) {
    var v = arr[l]; // 标的元素，目标是找到它应该在的位置por，满足[l...por-1]<=v,[por+1,r]>v
    var lt = l;     // l位置上是标的值v，[l,lt]<=v，初始值是[l,l]满足条件
    // var gt = l;     // [lt+1,gt]>v，初始值是[l+1, l]空，满足条件
    // 排序区间分布：[l,lt][lt+1,gt]i...arr.length-1
    // i==gt+1,所以gt可以不要
    for (var i=l+1; i<=r; i++) {
      if (arr[i]>v) {
        // gt++;
      } else {
        lt++;
        arr.swap(lt, i);
        // gt++;
      }
    }
    arr.swap(l,lt);
    _QUickSort(arr, l, lt-1);
    _QUickSort(arr, lt+1, r);
  }
}


function _QUickSortOptimize(arr, l, r) {
  if (l<r) {
    var temp = l + parseInt(Math.random()*(r-l+1));
    arr.swap(l, temp); // 随机交换l和[l,r]上的一个数，这样随机取值，避免每次都取第一个
    var v = arr[l];
    var lt = l;
    for (var i=l+1; i<=r; i++) {
      if (arr[i]>v) {
      } else {
        lt++;
        arr.swap(lt, i);
      }
    }
    arr.swap(l,lt);
    _QUickSortOptimize(arr, l, lt-1);
    _QUickSortOptimize(arr, lt+1, r);
  }
}


function _QUickSortOptimize2(arr, l, r) {
  if (r-l<=15) {
    _InsertionSort(arr, l, r);
    return;
  }
  var temp = l + parseInt(Math.random()*(r-l+1));
  arr.swap(l, temp); // 随机交换l和[l,r]上的一个数，这样随机取值，避免每次都取第一个
  var v = arr[l];
  var lt = l;
  for (var i=l+1; i<=r; i++) {
    if (arr[i]>v) {
    } else {
      lt++;
      arr.swap(lt, i);
    }
  }
  arr.swap(l,lt);
  _QUickSortOptimize(arr, l, lt-1);
  _QUickSortOptimize(arr, lt+1, r);
}

function _InsertionSort(arr, l, r) {
  for (let i=l; i<=r; i++) {
      let target = selector(arr[i]);
      for (j=i-1; j>=0; j--) {
          if (selector(arr[j]) > selector(arr[j+1])) {
              arr[j+1] = arr[j];
          } else {
              arr[j+1] = target;
              break;
          }
      }
  }
}


function QuickSort2Ways(arr) {
  _QuickSort2Ways(arr, 0, arr.length-1);
}

function _QuickSort2Ways(arr, l, r) {
  if (l<r) {
    var v = arr[l]; // 这里可以随机
    var i=l+1;  // 从左到右的遍历索引，指向下一个要考察的元素，[l+1,i)<=v 初始区间为空
    var j=r;    // 从右到左的遍历索引，指向下一个要考察的元素，(j,r]>=v 初始区间为空
    while(true) {
      while(i<=r && arr[i]<v) {
        i++;
      }
      while(j>=0 && arr[j]>v){
        j--;
      }
      if(i>=j) break;
      arr.swap(i, j);
      i++;
      j--;
    }
    // 跳出循环的时候，j指向的是<=v的元素，[l,j]<=v
    // i指向的是>=v的元素,[i,r]>=v，i=j或者i=j+1
    arr.swap(l, j);
    _QuickSort2Ways(arr, l, j-1);
    _QuickSort2Ways(arr, j+1, r);
  }
}

function QuickSort3Ways(arr) {
  _QuickSort3Ways(arr, 0, arr.length-1);
}

function _QuickSort3Ways(arr, l, r) {
  if (l>=r) return; // 避免越界，死循环
  var v = arr[l];
  var lt = l;     // lt是 <v 区间的最后一个元素，[l+1,lt]<v 初始化时为空
  var gt = r+1;   // gt是 >v 区间的第一个元素 [gt, r]>v 初始化时为空
  var i = l+1;    // (lt,i)==v
  // 区间分布 [l+1,lt](lt,i)i...[gt,r]
  while(i<gt) {
    if (arr[i]<v) {
      arr.swap(lt+1,i);
      lt++;
      i++;
    } else if (arr[i]>v) {
      gt--;
      arr.swap(i, gt);
    } else {
      i++;
    }
  }
  // 结束时i==gt，此时区间分布情况是[l,lt]<v,(lt,gt)==v,[gt,r]>v
  arr.swap(l, lt);
  _QuickSort3Ways(arr, l, lt-1);
  _QuickSort3Ways(arr, gt, r);
}
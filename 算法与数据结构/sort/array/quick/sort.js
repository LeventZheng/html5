/**
 * 数组排序-快速排序
 * 时间复杂度 O{nlog(n)}
 * 空间复杂度 O{1}
 * 取待排序数组的第一个作为标的，目标是找到它应该在哪个位置
 * 从上个元素找到的位置，将数组分为前后两个子数组，递归调用快速排序，寻找子数组第一个元素的最终位置
 * 以此类推
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function QuickSort(arr) {
  _QuickSort(arr, 0, arr.length-1); // [0, arr.length-1]
}


// [l...r]
function _QUickSort(arr, l, r) {
  if (l<r) {
    var v = arr[l]; // 标的元素，目标是找到它应该在的位置por，满足[l...por-1]<=v,[por+1,r]>v
    var lt = l;     // l位置上是标的值v，[l,lt]<=v，初始值是[l,l]满足条件
    // var gt = l;     // [lt+1,gt]>v，初始值是[l+1, l]空，满足条件
    // 排序区间分布：[l,lt][lt+1,gt]i...arr.length-1
    // i==gt+1,gt可以通过i获取，所以可以不要
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

// 增加随机取值
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

// 排序区间小的时候采用插入排序
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
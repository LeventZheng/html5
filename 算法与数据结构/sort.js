/**
 * 一、选择排序 O(n^2)
 * 1、取未排序的数组里的第一个
 * 2、与其他位置进行比较，找出比它小的值的位置
 * 3、首次：交换第 1 个与最小值的位置
 * 4、之后：依次从第 2 个继续往下找未排序数组中的最小值，与位置 2 进行交换
 */

 /**
  * selector: 针对对象数组获取比较值，默认是JSON.parse，对数值进行处理
  * selector: function(item) { return item.id;}; ect;
  */
function SectionSort(arr, selector) {
    selector = selector||JSON.parse;
    for (let i=0; i<arr.length; i++) {
        // 寻找[i, n)区间里的最小值
        let minIndex = i;
        for (let j=i; j<arr.length; j++) {
            if (selector(arr[j]) < selector(arr[minIndex])) {
                minIndex = j;
            }
        }
        arr.swap(i, minIndex);
    }
    return arr;
}

/**
 * 二、插入排序
 * 可以提前中止内层循环，是插入排序非常重要的性质
 * 插入排序最优情况接近于 O{n}
 * 插入排序会在更加复杂的排序算法中作为一个优化
 * 1、第一个元素不动
 * 2、将第二个元素放到前面数组中合适的位置
 * 3、第三个元素依次跟第二个元素对比，如果比它小就交换位置，然后再将第二个元素和第一个元素对比，如果比它小就交换位置
 * 4、每个未排序位置上的元素，都是和它前一个位置上的元素做对比，比它小就交换
 * 5、后面的元素以此类推
 */
// 在随机数组排序中效率比选择排序高
function InsertionSort(arr, selector) {
    selector = selector||JSON.parse;
    // 第一个位置是不动的，所以i从1开始
    for (let i=1; i<arr.length; i++) {

        // 寻找元素arr[i]合适的插入位置
        // 每个位置的元素和它前面的元素比较，所以j的最小值是1
        for (let j=i; j>0; j--) {
            if (selector(arr[j]<selector(arr[j-1]))) {
                arr.swap(j, j-1);
            } else {
                // 说明 arr[i] 已经放在了合适的位置
                // 相比于选择排序，插入跑徐的第二层循环是可能提前结束的
                break;
            }
        }
    }
    return arr;
}

// 优化版1：在for循环里判断中止条件
function InsertionSort1(arr, selector) {
    selector = selector||JSON.parse;
    for (let i=1; i<arr.length; i++) {

        // 同时满足这两个条件才进行交换，否则循环自动结束
        for (j=i; j>0 && selector(arr[j]<selector(arr[j-1])); j--) {    // *区别之处
            arr.swap(j, j-1);
        }
    }
    return arr;
}

// 优化版2，通过赋值取代数组位置交换
function InsertionSort2(arr, selector) {
    selector = selector||JSON.parse;
    for (let i=1; i<arr.length; i++) {
        let temp = selector(arr[i]);
        // j 放到外面来，因为最后的赋值需要用到它
        // j 用来保存 temp 值应该插入的位置
        let j;
        for (j=i; j>0 && temp < selector(arr[j-1]); j--) {
            // j-1位置上的值比 temp 大，往前挪
            arr[j] = arr[j-1];
        }
        // 循环结束，j 最后存放了 temp 应该放的位置
        arr[j] = temp
    }
    return arr;
}

/**
 * 冒泡排序
 * 内层从右往左循环，不断对比两个元素大小，后面的比前面的小，就交换位置
 */
function BubbleSort(arr, selector) {
  selector = selector||JSON.parse;
  for (let i=0; i<arr.length; i++) {
    for (let j=arr.length-1; j>i; j--) {
      if (selector(arr[j]) < selector(arr[j-1])) {
        arr.swap(j, j-1);
      }
    }
  }
  return arr;
}

// 对 arr[l...r] 范围的数组进行插入排序
function InsertionSort3(arr, l, r, selector) {
    selector = selector||JSON.parse;
    for (let i=l+1; i<=r; i++) {
        let temp = selector(arr[i]);
        // j 放到外面来，因为最后的赋值需要用到它
        // j 用来保存 temp 值应该插入的位置
        let j;
        for (j=i; j>l && temp < selector(arr[j-1]); j--) {
            // j-1位置上的值比 temp 大，往前挪
            arr[j] = arr[j-1];
        }
        // 循环结束，j 最后存放了 temp 应该放的位置
        arr[j] = temp
    }
}
/**
 * 归并排序
 * 本质是递归排序的过程
 */
// 关于优化2
// 对近乎有序的数组进行排序，归并排序要比插入排序慢
// 因为归并排序无法退化为O{N}级别的时间复杂度，要是要对log(N)这么多层进行递归
// 当__mergeSort递归到元素量非常小的时候，可以转而使用插入排序来提高性能，因为：
// 当数据量比较小的时候，整个数组近乎有序的概率比较大，此时插入排序有优势
// 虽然插入排序最差情况时间复杂度 O{N^2} 比归并排序的 O{Nlog(N)} 要大，但是时间复杂度前面还有一个常数系数，插入排序的系数比归并排序要小，数据量小的时候插入排序会比归并排序小
// 这个优化之后，归并排序依然是O{Nlog(N)}级别的复杂度
function MergeSort(arr, selector) {
    selector = selector||JSON.parse;

    __mergeSort(arr, 0, arr.length-1, selector);
    return arr;
}

// 递归使用归并排序，对arr[l...r]的范围进行排序
function __mergeSort(arr, l, r, selector) {
    // 高级排序算法，对于递归到底的情况，都可以采用这种方式去优化
    // 优化2，数据量小于15的时候使用插入排序
    // if (l >= r) return;
    if (r - l <= 15) {  // 可以试试其他值的情况
        InsertionSort3(arr, l, r);
        return;
    }

    let mid = Math.floor((l+r)/2);  // 如果l和r都很大，有可能发生溢出
    __mergeSort(arr, l, mid, selector);
    __mergeSort(arr, mid+1, r, selector);
    if (arr[mid] > arr[mid+1])  // 优化点1,当前半部分的最后一个元素比后半部分的第一个元素大的时候，不用再做合并了
        __merge(arr, l, mid, r);
}
// 将arr[l...mid]和arr[min+1...r]两部分进行归并
function __merge(arr, l, mid, r) {
    let aux = [];   // aux作为额外空间用来做值对比， 可指定空间大小为 r-l+1
    // 将 arr 从l 到 r区间的数值放到 aux 中
    for (let i=l; i <= r; i++) {
        aux[i-l] = arr[i];
    }
    let i = l, j = mid +1;
    for (let k = l; k <= r; k++) {
        if (i > mid) {  // 说明此时前半部分排序完，后半部分还没排序完，直接跟到arr数组剩余位置
            arr[k] = aux[j-l];
            j++;
        }
        else if (j > r) {
            arr[k] = aux[i-l];
            i++;
        }
        // 此时i 和 j都是有效的，前后部分都没排完序
        else if (aux[i-l] < aux[j-l]) {
            arr[k] = aux[i-l];
            i++;
        }
        else {
            arr[k] = aux[j-l];
            j++;
        }
    }
};
/**
 * 自底向上的归并排序
 * 还可以用上面的优化方式进行优化
 */
function MergeSortBU(arr, selector) {

    for (let sz = 1; sz <=arr.length; sz += sz) {
        // for (let i=0; i<arr.length; i += sz + sz) { // 每次跨国2个sz大小的区间
        for (let i=0; i+sz<arr.length; i += sz + sz) { // 处理第一个越界问题
            // 对 arr[i...i+sz-1] 和 arr[i+sz...i+2*sz-1] 进行归并
            // __merge(arr, i, i + sz -1, i + sz + sz -1);
            __merge(arr, i, i + sz -1, min(i + sz + sz -1, n-1));   // 处理第二个越界问题
        }
    }
}
function min(a, b) {
    return a<b?a:b;
}

function QuickSort(arr, selector) {

    __quickSort(arr, 0, arr.length-1);
}
// 对arr[l...r]部分进行快速排序
function __quickSort(arr, l, r) {
    // if (l >= r) return;
    if (r - l <= 15) {  // 优化1
        InsertionSort3(arr, l, r);
        return;
    }

    let p = __partition(arr, l, r);
    __quickSort(arr, l,p-1);
    __quickSort(arr, p+1,r);
}

// 返回p,使得arr[l...p-1] < arr[p];arr[p+1...r] > arr[p]
function __partition(arr, l, r) {
    const x = l+Math.ceil(Math.random()*(r-l+1));
    arr.swap(l, x);
    const v = arr[l];

    // arr[l+1...j] < v ; arr[j+1...i) > v
    let j = l;
    for (let i=l+1; i<=r; i++) {
        if (arr[i] < v) {
            // arr.swap(j+1, i);
            // j++;
            arr.swap(++j, i);
        }
    }
    arr.swap(l, j);

    return j;
}
function QuickSort2(arr, selector) {

  __quickSort2(arr, 0, arr.length-1);
}
function __quickSort2(arr, l, r) {
    // if (l >= r) return;
    if (r - l <= 15) {  // 优化1
      InsertionSort3(arr, l, r);
      return;
    }

    let p = __partition2(arr, l, r);
    __quickSort2(arr, l,p-1);
    __quickSort2(arr, p+1,r);
}
function __partition2(arr, l, r) {
  arr.swap(l, l+Math.ceil(Math.random()*(r-l+1)))   // 优化2 标定元素改成取l到r之间的随机位置
  const v = arr[l];
  // arr[l+1...i] <= v; arr[j...r] >= v
  let i = l+1, j = r;
  while(true) {
    while(i <= r && arr[i] < v) i++;
    while(j >= l+1 && arr[j] > v) j--;
    if(i>j) break;
    arr.swap(i, j);
    i++;
    j--;
  }
  arr.swap(l, j);
  return j;
}
/**
 * 数组排序-归并排序-自顶向下
 * 时间复杂度 O{nlog(n)}
 * 空间复杂度 O{n} 需要n个额外空间的数组
 * 用到递归算法
 * 将数组的排序区间 [0, arr.length] 不断切分，直到最小粒度，要满足 l<r
 * 切分好了以后开始回溯，将左右两部分全部合并成到新的数组空间后，再复制回原数组相应的区间中
 * 回溯完毕后，数组完成排序过程
 * @param {*} arr 
 * @param {*} selector 
 */
function MergeSort(arr, selector) {
    selector = selector || JSON.parse;
    return _MergeSort(arr, 0, arr.length-1, selector);
}
/**
 * 递归结束的条件是 l>=r (正常是l==r即结束)
 * @param {*} arr 归并排序的数组 [l,r]
 * @param {*} l 左边界
 * @param {*} r 右边界
 */
function _MergeSort(arr, l, r, selector) {
    if (l < r) {
        // let middle = Math.floor((l + r) / 2);
        let middle = Math.floor(l + ( r - l) / 2);
        // 切分的范围是 [l, middle] 和 (middle, r];
        _MergeSort(arr, l, middle, selector);  // 获取左边归并排序后的数组
        _MergeSort(arr, middle+1, r, selector); // 获取右边归并排序后的数组

        // 判断是否需要归并
        // 当左边的最后一个元素比右边的第一个小，说明左边部分全部比右边小，两边都已经排好序了
        if (arr[middle] > arr[middle+1]) {
            _Merge(arr, l, middle, r, selector)
        }
    }
}
/**
 * 将数组arr的 [l, middle](已排序) 和 [middle+1, r](已排序) 两个区间合并成一个排好序的区间
 * @param {*} arr 归并排序的数组 [l, r]
 * @param {*} l 左边界
 * @param {*} middle 中间点，将排序区间切分成[l, middle] 和 [middle+1, r]
 * @param {*} r 右边界
 */
function _Merge(arr, l, middle, r, selector) {
    let mergeArr = new Array(); // 数组长度是 l + r -1
    let k = 0;  // 当前存放对比值存放在 mergeArr 中的位置
    let i = l, j = middle + 1;

    // 遍历正常的情况
    while (i <= middle && j <= r) {
        if (selector(arr[i]) > selector(arr[j])) {
            mergeArr[k] = arr[j];
            k++;
            j++;
        } else {
            mergeArr[k] = arr[i];
            k++;
            i++;
        }
    }
    // i 还没到终点，把左边剩余元素顺序移入 mergeArr
    while (i <= middle) {
        mergeArr[k] = arr[i];
        k++;
        i++;
    }
    // j 还没到重点，把有点剩余元素顺序移入 mergeArr
    while (j <= r) {
        mergeArr[k] = arr[j];
        k++;
        j++;
    }

    t = 0;
    //将 mergeArr 中的元素全部拷贝到原数组中
    // while(l <= r){
    //     arr[l++] = mergeArr[t++];
    // }
    while(t <= r-l) {
        arr[l+t] = mergeArr[t];
        t++;
    }
}

/**
 * 归并排序优化版-当排序区间小于8，改用插入排序
 * @param {*} arr 
 * @param {*} selector 
 */
function MergeSortOptimize(arr, selector) {
    selector = selector || JSON.parse;
    return _MergeSort(arr, 0, arr.length-1, selector);
}
function _MergeSortOptimize(arr, l, r, selector) {
    if (r - l < 8) {
        _InsertionSort(arr, l, r, selector);
        return;
    }
    let middle = Math.floor((l + r) / 2);
    // 切分的范围是 [l, middle] 和 (middle, r];
    _MergeSortOptimize(arr, l, middle, selector);  // 获取左边归并排序后的数组
    _MergeSortOptimize(arr, middle+1, r, selector); // 获取右边归并排序后的数组

    // 判断是否需要归并
    // 当左边的最后一个元素比右边的第一个小，说明左边部分全部比右边小，两边都已经排好序了
    if (arr[middle] > arr[middle+1]) {
        _Merge(arr, l, middle, r, selector)
    }
}
function _InsertionSort(arr, l, r, selector) {
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

/**
 * 归并排序-自底向上
 * 先2个为一组，进行组内排序，再4个为一组排序，分组的长度不超过数组长度
 * 组内通过计算得出middle，分左右两部分，将左右部分通过_merge合并成一组
 * @param {*} arr 
 * @param {*} selector 
 */
function MergeSortBU(arr, selector) {
    selector = selector || JSON.parse;
    for (let step=1; step < arr.length; step*=2) {
        for (let start=0; start<arr.length; start+=2*step) {
            let l = start;
            let r = start+2*step-1;
            let middle = Math.floor((r+l)/2); // 这里和下一步的前后顺序，先计算middle值以后再判断改变r的值
            if (r>arr.length-1) r = arr.length-1;
            if (arr[middle] > arr[middle+1]) {
              _Merge(arr, l, middle, r, selector)
            }
        }
    }
}

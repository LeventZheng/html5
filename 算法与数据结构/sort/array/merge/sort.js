/**
 * 数组排序-归并排序
 * @param {*} arr 
 * @param {*} selector 
 */
function MergeSort(arr, selector) {
    selector = selector || JSON.parse;
    return _MergeSort(arr, 0, arr.length-1);
}
/**
 * 
 * @param {*} arr 归并的数组
 * @param {*} l 左边界
 * @param {*} r 右边界
 */
function _MergeSort(arr, l, r) {
    if (l < r) {
        let middle = Math.floor((l + r) / 2);
        // 切分的范围是 [l, middle] 和 (middle, r];
        _MergeSort(arr, l, middle);  // 获取左边归并排序后的数组
        _MergeSort(arr, middle+1, r); // 获取右边归并排序后的数组
        _Merge(arr, l, middle, r)
    }
}
function _Merge(arr, l, middle, r) {
    // 合并左右数组
    let mergeArr = new Array(); // 数组长度是 l + r -1
    let k = 0;  // 当前存放对比值存放在 mergeArr 中的位置
    let i = l, j = middle + 1;

    // 遍历正常的情况
    while (i <= middle && j <= r) {
        if (arr[i] > arr[j]) {
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
    while(l <= r){
        arr[l++] = mergeArr[t++];
    }
}

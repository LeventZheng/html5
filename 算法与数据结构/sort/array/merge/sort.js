/**
 * 数组排序-归并排序
 * @param {*} arr 
 * @param {*} selector 
 */
function MergeSort(arr, selector) {
    selector = selector || JSON.parse;
    return _MergeSort(arr, 0, arr.length);
}
/**
 * 
 * @param {*} arr 归并的数组
 * @param {*} l 左边界
 * @param {*} r 右边界
 */
function _MergeSort(arr, l, r) {
    let middle = Math.ceil((l + r) / 2);
    // 边界即退出条件
    if (middle == 0) return arr;

    // 切分的范围是 [l, middle] 和 (middle, r];
    let arrLeft = _MergeSort(arr.slice(l, middle), l, middle);  // 获取左边归并排序后的数组
    let arrRight = _MergeSort(arr.slice(middle+1), middle, r); // 获取右边归并排序后的数组
    // 合并左右数组
    let mergeArr = new Array(); // 数组长度是 l + r -1
    let k = 0;  // 当前存放对比值存放在 mergeArr 中的位置
    let i = l, j = middle + 1;
    while(k < l + r -1) {
        if (arrLeft[i] < arrRight[j] && i <= middle) {
            mergeArr[k] = arrLeft[i];
            k++;
            i++;
        }
    }
}

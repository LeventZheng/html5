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
    
    let arrLeft = _MergeSort(arr.slice(l, middle), l, middle);  // 获取左边归并排序后的数组
    let arrRight = _MergeSort(arr.slice(middle, r), middle, r); // 获取右边归并排序后的数组
    // 合并左右数组

}
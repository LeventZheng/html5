/**
 * 数组排序-快速排序
 * 时间复杂度 O{nlog(n)}
 * 空间复杂度 O{1}
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function QuickSort(arr, selector) {
    selector = selector || JSON.parse;
    let l = 0, r = arr.length-1;
    let v = arr[l];
    let j = l, i = l+1; // [l+1, j] < v, [j+1, i-1] >= v
    while(i<=r) {
      if (arr[i] >= v) {
        i++;
      } else {
        arr.swap(j+1, i);
        j++;
        i++;
      }
    }
    arr.swap(l, j);
}

function _QuickSort(arr, l, r, selector) {

}
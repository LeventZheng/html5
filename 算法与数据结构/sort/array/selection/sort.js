/**
 * 数组排序-选择排序
 * 时间复杂度 O{n^2}
 * 空间复杂度 O{1}
 * 在未排序的数组中找出最小值
 * 将最小值与未排序数组第一个交换
 * 继续在未排序数组中进行选择排序
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function SectionSort(arr, selector) {
    selector = selector || JSON.parse;
    for (let i=0; i<arr.length; i++) {
        let minIndex = i;   // 默认以未排序数组第一个元素作为最小值
        // 寻找[j, arr.length)区间里的最小值
        for (let j=i; j<arr.length; j++) {
            if (selector(arr[j])<selector(arr[minIndex])) { // 未排序数组中找到更小的元素时
                minIndex = j;
            }
        }
        arr.swap(i, minIndex);
    }
}
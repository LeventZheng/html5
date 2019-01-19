/**
 * 插入排序-冒泡排序
 * 时间复杂度 O{n^2}
 * 空间复杂度 O{1}
 * 冒泡排序是未优化前的插入排序，每次当前元素值比目标元素小时都进行位置交换
 * 效率比插入排序低
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function BubbleSort(arr, selector) {
    selector = selector || JSON.parse;
    for (let i=1; i<arr.length; i++) {
        let targetIndex = i;
        for (let j=i-1; j>=0; j--) {
            if (selector(arr[j]) > selector(arr[targetIndex])) {
                arr.swap(targetIndex, j);
                targetIndex = j;
            } else {
                break;
            }
        }
    }
}
/**
 * 数组排序-直接插入排序
 * 时间复杂度 O{n^2}
 * 空间复杂度 O{1}
 * 最优情况接近于 O{n}
 * 会在更加复杂的排序算法中作为一个优化
 * 从第二个元素开始，依次与前面排好序的部分对比排序，找到目标元素的合适位置
 * 对数组中目标元素前的部分进行倒序遍历
 * 当前位置元素值与目标值进行对比，比目标值大的时候往右挪，比目标值小的时候，当前位置的右边即是目标元素合适的位置
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function InsertionSort(arr, selector) {
    selector = selector || JSON.parse;
    for (let i=1; i<arr.length; i++) {
        let target = selector(arr[i]);
        // [0,i)是数组已排序的部分
        // 找到 i 在 [0,i) 中的合适位置(左闭右开因为自己不需要和自己作比较))
        for (let j=i-1; j>=0; j--) {
            if (selector(arr[j]) > target) {    // 当前位置元素值比target大的时候，元素覆盖它的前一位，实现比target大的元素右移
                arr[j+1] = arr[j];
            } else {
                arr[j+1] = target;              // 当前位置元素值比target小的时候，位置前一位就是target应该放的位置
                break;
            }
        }
    }
}
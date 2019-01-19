/**
 * 插入排序-希尔排序
 * 时间复杂度 O{n^2}
 * 空间复杂度 O{1}
 * 通过step对arr内元素进行分组，组内进行直接插入排序
 * 每次对step进行减半，直到step为1时，进行一次插入排序后结束循环
 * @param {*} arr 数组
 * @param {*} selector 选择器，适应复杂的数组
 */
function ShellSort(arr, selector) {
    selector = selector || JSON.parse;
    let step = arr.length;
    while(step > 1) {
        step = Math.floor(step / 2);
        for (let i=step; i<arr.length; i++) {
            let target = selector(arr[i]);
            for (let j=i-step; j>=0; j=j-step) {
                if (selector(arr[j]) > target) {
                    arr[j+step] = arr[j];
                    arr[j] = target;
                } else {
                    break;
                }
            }
        }
    }
}

// 教官对新兵分组，依次报1、2、3、4、5循环，报到1的组内按低到高排列，交换位置，低的和高的交换位置
// 下一次按1、2、1、2报号，组内按低到高排列，交换位置
// 最后一次全体按低到高排列
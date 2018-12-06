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

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
 * 1、第一个元素不动
 * 2、将第二个元素放到前面数组中合适的位置
 * 3、第三个元素依次跟第二个元素对比，如果比它小就交换位置，然后再跟第一个元素比
 * 4、后面的元素以此类推
 */
// function InsertionSort1(arr, selector) {
//     selector = selector||JSON.parse;
//     for (let i=1; i<arr.length; i++) {
//         for (j=i; j>0; j--) {
//             if (selector(arr[j]<selector(arr[i]))) {
//                 arr.swop(i, j);
//             } else {
//                 break;
//             }
//         }
//     }
//     console.log(arr);
//     return arr;
// }
function InsertionSort1(arr, selector) {
    selector = selector||JSON.parse;
    for (let i=1; i<arr.length; i++) {
        for (j=i; j>0 && selector(arr[j]<selector(arr[i])); j--) {
            arr.swop(i, j);
        }
    }
    console.log(arr);
    return arr;
}

// 优化版，赋值取代值交换
function InsertionSort(arr, selector) {
    selector = selector||JSON.parse;
    for (let i=1; i<arr.length; i++) {
        let temp = selector(arr[i]);
        let j;
        for (j=i; j>0 && temp < selector(arr[j-1]); j--) {
            arr[j] = arr[j-1];
        }
        arr[j] = temp
    }
    return arr;
}

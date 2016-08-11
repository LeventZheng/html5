/**
 * 1.插入排序
 * 概述：依次给未排序数在已排序列中找合适位置
 * 实现：先向后循环，再从当前数开始向前循环，依次对比找到比它小的数的位置，放在这个数后面
 * @param array
 * @returns {*}
 */
function insertSort(array){
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var item;
        for(var i=1; i<array.length; i++){
            for(var j = i; j>0; j--){
                if(array[j] < array[j-1]){
                    item = array[j];
                    array[j] = array[j-1];
                    array[j-1] = item;
                }
            }
        }
        return array;
    }else {
        return 'array is not an Array!';
    }
}
var arr = [1,4,5,2,8,3,9,0,8,9,6,7];
console.log(insertSort(arr));
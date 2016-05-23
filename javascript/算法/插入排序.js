/**
 * 插入排序
 * 从第二个数开始，依次向前对比，如果比前一个小，和前一个数交换位置，并继续向前对比，直到跟0位置数对比完
 * 后面的数也一次向前对比
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
/**
 * 4.冒泡排序
 * 概述：依次通过对比交换目标值与已排序值位置，最终找到合适位置
 * 实现：先向前循环，后向后循环，时时对比交换位置
 * @param array
 * @returns {*}
 */
function bubbleSort(array){
    console.log(array);
    if( Object.prototype.toString.call(array).slice(8,-1) == "Array"){
        for( var i=1; i<array.length; i++){
            for( var j = i; j>0; j--){
                if( array[j] < array[j-1]){
                    var item = array[j];
                    array[j] = array[j-1];
                    array[j-1] = item;
                }
            }
        }
        return array;
    }else{
        return "It's not a function.";
    }
}
var arr = [5,1,7,2,8,3,9,4,6];
console.log(bubbleSort(arr));
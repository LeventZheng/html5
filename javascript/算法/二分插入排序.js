/**
 * 2.二分插入排序
 * 概述：给未排序数在已排序列中找合适位置，将目标依次与已排序列中间值作对比，每次可将搜索范围减半
 * 实现：设置left和right变量，通过对比目标值与中间值，动态变更这两个变量值，最终找到目标位置
 * @param array
 * @returns {*}
 */
function devideSort(array){
    if(Object.prototype.toString.call(array).slice(8,-1) === 'Array'){
        for(var i=1; i<array.length; i++){
            var k = parseInt(i/2);
            //alert(array[k]);
            if(array[i]<array[k]){
                newArr.splice(i-1,0,array[i]);
                console.log(i);
            }else{
                newArr.push(array[i]);
            }
        }
        console.log(newArr);
        return true;

        var key = array[i];
        var  left = 0, right = i-1;
        while(left <= right){
            var middle = parseInt((left + right)/2);
            console.log('middle:'+array[middle]+",key:"+key);
            if(array[middle]>key){
                right = middle - 1;
            }else{
                left = middle + 1;
            }
            console.log('left:'+left+",right:"+right);
        }
        for(var j = i; j>left; j--){
            array[j] = array[j-1];
        }
        array[left] = key;
        console.log(array);
    }else{
        return 'this is not a Array.'
    }
}

console.log(devideSort([1,3,2,87,6,4,5,123,11,98]));
//console.log(devideSort([1,3,8,4,9,6,5,4]));

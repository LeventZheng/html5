/**
 * Created by User on 2016/5/23.
 */
function devideSort(array){
    if(Object.prototype.toString.call(array).slice(8,-1) === 'Array'){
        var newArr = [array[0]];
        for(var i=1; i<array.length; i++){

        }
        return true;
    }else{
        return 'this is not a Array.'
    }
}

console.log(devideSort([1,2,3]));
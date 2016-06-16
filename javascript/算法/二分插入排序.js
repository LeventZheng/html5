/**
 * Created by User on 2016/5/23.
 */
function devideSort(array){
    if(Object.prototype.toString.call(array).slice(8,-1) === 'Array'){
        for(var i=1; i<array.length; i++){
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
        }
        console.log(array);
    }else{
        return 'this is not a Array.'
    }
}
devideSort([1,8,2,7,5,9,3]);
//console.log(devideSort([1,3,8,4,9,6,5,4]));
/**
 * Created by User on 2016/5/23.
 */

var arr = [1,2,1,'a',4,5,7,'a'];

Array.prototype.unique = function(){
   var newArr = [];
    for(var i=0; i<this.length; i++){
        if(newArr.indexOf(this[i]) == -1){
            newArr.push(this[i])
        }
    }
    return newArr;
};

console.log(arr.unique());

Array.prototype.unique2 = function(){
  var has = {},newArr = [];
    for(var i=0; i<this.length; i++){
        if(has[this[i]] != true){
            has[this[i]] = true;
            newArr.push(this[i]);
        }
    }
    return newArr;
};
console.log(arr.unique2());
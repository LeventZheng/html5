/**
 * 2.插入排序---希尔插入排序算法
 * 取一个小于n的整数作为第一个增量，把序列分组。
 * 所有距离为增量的倍数的元素放在同一个组中。
 * 先在各组内进行直接插入排序；
 * 然后，取第二个增量（第二个<第一个）重复上述的分组和排序，直至所取的增量=1，即所有元素放在同一组中进行直接插入排序为止。
 * 一般的初次取序列的一半为增量，以后每次减半，直到增量为1。
 *
 **/
function shellInsertSort(elements, di){
    //从增量的所在位置开始
    for(var i = di; i < elements.length; i++){
        //升序
        if(elements[i] < elements[i-di]){
            //取出增量位置的元素作为被插入元素（哨兵）
            var guard = elements[i];
            var j = i - di;
            elements[i] = elements[j];

            //向前，将增量的倍数的位置作为同一组比较及进行直接插入法
            while(j >= 0 && guard < elements[j]){
                elements[j+di] = elements[j];
                j -= di;
            }

            //插入
            elements[j + di] = guard;
        }
    }
}

function shellSort(elements){
    //增量为序列的一半
    var di = parseInt(elements.length / 2);
    while(di >= 1){
        shellInsertSort(elements, di);
        //每次减半，最后增量必须为1
        di = parseInt(di / 2);
    }
}

var elements = [10, 9, 8, 7, 6, 5];
console.log('before: ' + elements);
shellSort(elements);
console.log(' after: ' + elements);
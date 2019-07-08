/**
 * 最大堆
 */
function MaxHeap(capacity) {
    this.count = 0;
    this.capacity = capacity;
    this.data = new Array(capacity+1);
}

MaxHeap.prototype.size = function() {
    return this.count;
}

MaxHeap.prototype.isEmpty = function() {
    return this.count === 0;
}
// 向堆中添加一个元素
MaxHeap.prototype.insert = function(item) {
    console.assert(this.count<this.capacity);
    // 当容量不够的时候，应该开辟新的空间
    this.data[this.count+1] = item;
    this.count++;
    this._shiftUp(this.count);
}

// 将位置 k 的元素上移到合适的位置
MaxHeap.prototype._shiftUp = function(k) {
    while(k>1&&this.data[Math.floor(k/2)]< this.data[k]) {
        this.data.swap(Math.floor(k/2), k);
        k = Math.floor(k/2);
    }
}
// 从堆中取出一个元素
MaxHeap.prototype.extractMax = function() {
    console.assert(this.count > 0);
    const ret = this.data[1];
    this.data.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return ret;
}

// 将位置 k 的元素下 移到合适的位置
MaxHeap.prototype._shiftDown = function(k) {
    while(2*k <= this.count) {  // 判断有左孩子
        let j = 2*k;
        if (j+1 <= this.count && this.data[j + 1] > this.data[j]) { // 有右孩子并且比做孩子大，则取右孩子
            j++;
        }
        if (this.data[k] >= this.data[j]) break;    // 比较孩子和本身大小，孩子比较本身小的话不用交换位置
        this.data.swap(k, j);
        k = j;                      // k变成了孩子的位置，继续下一轮循环
    }
}

// 实现一个方法去打印堆，100个以为，只允许数字的数组
// 优化点，在_shiftUp和_shiftDown中，将swap操作改成赋值才做


/**
 * 堆排序
 */
function HeapSort(arr, selector) {
    selector = selector || JSON.parse;
    let maxHeap = new MaxHeap(arr.length);
    for (let i=0; i<arr.length; i++) {
        maxHeap.insert(arr[i]);
    }
    console.log(maxHeap);
    for (let j=arr.length-1; j>=0; j--) {
        arr[j] = maxHeap.extractMax();
    }
}

/**
 * 定义一种新的构造函数，支持传入数组生成二叉堆
 */
function MaxHeap1(arr) {
    this.count = arr.length;
    this.capacity = arr.length;
    this.data = new Array(this.capacity+1);
    for (let i=0; i<arr.length; i++) {
        this.data[i+1] = arr[i];
    }
    for (let i=Math.floor(arr.length/2); i>0; i--) {
        this._shiftDown(i);
    }
}
MaxHeap1.prototype._shiftDown = function(k) {
    while(2*k <= this.count) {  // 判断有左孩子
        let j = 2*k;
        if (j+1 <= this.count && this.data[j + 1] > this.data[j]) { // 有右孩子并且比做孩子大，则取右孩子
            j++;
        }
        if (this.data[k] >= this.data[j]) break;    // 比较孩子和本身大小，孩子比较本身小的话不用交换位置
        this.data.swap(k, j);
        k = j;                      // k变成了孩子的位置，继续下一轮循环
    }
}
MaxHeap1.prototype.extractMax = function() {
    console.assert(this.count > 0);
    const ret = this.data[1];
    this.data.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return ret;
}

/**
 * 在堆的构造函数的基础上封装一个方法，将数组转成二叉堆
 */
function Heapify(arr, selector) {
    selector = selector || JSON.parse;
    let maxHeap = new MaxHeap(arr.length);
    maxHeap.count = arr.length;
    maxHeap.capacity = arr.length;
    maxHeap.data = new Array(arr.length+1);
    for (let i=0; i<arr.length; i++) {
        maxHeap.data[i+1] = arr[i];
    }
    for (let i=Math.floor(arr.length/2); i>0; i--) {
        maxHeap._shiftDown(i);
    }
    console.log(maxHeap);
}

/**
 * 堆排序优化
 */
function HeapSort1(arr, selector) {
    selector = selector || JSON.parse;
    let maxHeap = new MaxHeap1(arr);
    for (let j=arr.length-1; j>=0; j--) {
        arr[j] = maxHeap.extractMax();
    }
}
/**
 * 原地堆排序，堆从0开始索引
 */
function HeapSort2(arr, selector) {
    selector = selector || JSON.parse;
    // 将数组通过shiftdown算法变成二叉堆中的最大堆
    const n = arr.length;
    // heapify
    for (let i = Math.floor((n-1)/2); i >= 0; i--) {
        _shiftdown(arr, n, i);
    }

    for(let i = n-1; i > 0; i--) {
        arr.swap(0, i);
        _shiftdown(arr, i, 0);
    }
}
function _shiftdown(arr, n, k) {

    while(2*k+1 < n) {
        let j = 2*k+1;
        if (j+1 < n && arr[j + 1] > arr[j]) {
            j++;
        }
        if (arr[k] >= arr[j]) break;
        arr.swap(k, j);
        k = j;
    }
} 
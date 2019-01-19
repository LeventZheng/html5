/**
 * 索引堆
 */
function IndexMaxHeap(capacity) {
    this.count = 0;
    this.capacity = capacity;
    this.data = new Array(capacity + 1);
    this.indexes = new Array(capacity + 1); // 索引堆
    this.reverse = new Array(capacity + 1); // 反向查找索引在indexes的位置
    for (let i=0; i<capacity; i++) {
        this.reverse[i] = 0;
    }
}

IndexMaxHeap.prototype.size = function () {
    return this.count;
}

IndexMaxHeap.prototype.isEmpty = function () {
    return this.count === 0;
}

// 通过 insert 和 _shiftUp 完成插入过程
// 传入的i对用户而言，是从0索引的
IndexMaxHeap.prototype.insert = function (i, item) {
    console.assert(this.count < this.capacity);
    console.assert(i + 1 >= 1 && i + 1 <= this.capacity);

    i++;  // 变成从1开始索引
    this.count++;
    this.data[i] = item;
    this.indexes[this.count] = i;
    this.reverse[i] = this.count;
    this._shiftUp(this.count);
}
// indexes存放了索引的位置，通过入参k获取到索引位置，值则存放在data数组中
IndexMaxHeap.prototype._shiftUp = function (k) {
    while (k > 1 && this.data[this.indexes[Math.floor(k / 2)]] < this.data[this.indexes[k]]) {
        this.indexes.swap(Math.floor(k / 2), k);    // 交换的是indexes的索引
        this.reverse[this.indexes[Math.floor(k / 2)]] = Math.floor(k / 2);
        this.reverse[this.indexes[k]] = k;
        k = Math.floor(k / 2);
    }
}

// 通过extractMax和_shiftDown完成删除过程
IndexMaxHeap.prototype.extractMax = function () {
    console.assert(this.count > 0);
    const ret = this.data[this.indexes[1]]; // indexes数组是从1开始的
    this.indexes.swap(1, this.count);       // 交换的是indexes的索引
    this.reverse[this.indexes[1]] = 1;
    this.reverse[this.indexes[this.count]] = 0; // 代表删除
    this.count--;
    this._shiftDown(1);
    return ret;
}
IndexMaxHeap.prototype._shiftDown = function (k) {
    while (2 * k <= this.count) {  // 判断有左孩子
        let j = 2 * k;
        if (j + 1 <= this.count && this.data[this.indexes[j + 1]] > this.data[this.indexes[j]]) { // 有右孩子并且比做孩子大，则取右孩子
            j++;
        }
        if (this.data[this.indexes[k]] >= this.data[this.indexes[j]]) break;    // 比较孩子和本身大小，孩子比较本身小的话不用交换位置
        this.indexes.swap(k, j);
        this.reverse[this.indexes[k]] = k;
        this.reverse[this.indexes[j]] = j;
        k = j;                      // k变成了孩子的位置，继续下一轮循环
    }
}

// 索引堆支持的额外操作
// 获取到索引就可以直接在data中找到元素的值
IndexMaxHeap.prototype.extractMaxIndex = function () {
    console.assert(this.count > 0);
    const ret = this.indexes[1] - 1;    // 对外部，转成从0开始的索引
    this.indexes.swap(1, this.count);
    this.reverse[this.indexes[1]] = 1;
    this.reverse[this.indexes[this.count]] = 0; // 代表删除
    this.count--;
    this._shiftDown(1);
    return ret;
}
function contain(i) {
    // 外部传入的索引要加1
    console.assert(i + 1 >= 1 && i + 1 <= this.capacity);
    return this.reverse[i+1] != 0;
}
IndexMaxHeap.prototype.getItem = function (i) {
    console.assert(contain(i))
    return this.data[i+1];
}
// 这是重点
// change的复杂度是n+log，也就是O(n)级别，在外部对操作的情况下有可能变成O(n^2)的复杂度，需要进行优化
IndexMaxHeap.prototype.change = function (i, newItem) {

    console.assert(contain(i))
    i++;                    // 改为从1开始计数
    this.data[i] = newItem; // 改变索引对应的数据值
    // 改变了值以后，为了维持堆的性质，需要对这个位置重新定位，看看能不能向上挪或是向下挪
    // for (let i=1; i<this.count; j++) {
    //     if (this.indexes[j] == i) { // 找到indexed[j] = i,j表示data[i]在堆中的位置
    //         this._shiftUp(j);
    //         this._shiftDown(j);
    //         return;
    //     }
    // }

    // 增加了 reverse 反向查找以后，这步操作变成了 O(1) 的复杂度
    let j = this.reverse[i];
    this._shiftUp(j);
    this._shiftDown(j);
}


function IndexMaxHeap(capacity) {
    this.count = 0;
    this.capacity = capacity;
    this.data = new Array(capacity + 1);
    this.indexes = new Array(capacity + 1);
}

IndexMaxHeap.prototype.size = function () {
    return this.count;
}

IndexMaxHeap.prototype.isEmpty = function () {
    return this.count === 0;
}

// 传入的i对用户而言，是从0索引的
IndexMaxHeap.prototype.insert = function (i, item) {
    console.assert(this.count < this.capacity);
    console.assert(i + 1 >= 1 && i + 1 <= this.capacity);

    i++;  // 变成从1开始索引
    this.data[i] = item;
    this.data[this.count + 1] = i;
    this.count++;
    this._shiftUp(this.count);
}
IndexMaxHeap.prototype._shiftUp = function (k) {
    while (k > 1 && this.data[this.indexes[Math.floor(k / 2)]] < this.data[this.indexes[k]]) {
        this.data.swap(this.indexes[Math.floor(k / 2)], this.indexes[k]);
        k = Math.floor(k / 2);
    }
}
IndexMaxHeap.prototype.extractMax = function () {
    console.assert(this.count > 0);
    const ret = this.data[this.indexes[1]];
    this.data.swap(this.indexes[1], this.indexes[this.count]);
    this.count--;
    this._shiftDown(1);
    return ret;
}
IndexMaxHeap.prototype.extractMaxIndex = function () {
    console.assert(this.count > 0);
    const ret = this.indexes[1] - 1;    // 对外部，转成从0开始的索引
    this.data.swap(this.indexes[1], this.indexes[this.count]);
    this.count--;
    this._shiftDown(1);
    return ret;
}
IndexMaxHeap.prototype.getItem = function (i) {
    return this.data[i+1];
}
// change的复杂度是n+log，也就是O(n)级别，在外部对操作的情况下有可能变成O(n^2)的复杂度，需要进行优化
IndexMaxHeap.prototype.change = function (i, newItem) {
    i++;
    this.data[i] = newItem;
    // 找到indexed[j] = i,j表示data[i]在堆中的位置
    for (let i=1; i<this.count; j++) {
        if (this.indexes[j] == i) {
            this._shiftUp(j);
            this._shiftDown(j);
            return;
        }
    }
}
IndexMaxHeap.prototype._shiftDown = function (k) {
    while (2 * k <= this.count) {  // 判断有左孩子
        let j = 2 * k;
        if (j + 1 <= this.count && this.data[this.indexes[j + 1]] > this.data[this.indexes[j]]) { // 有右孩子并且比做孩子大，则取右孩子
            j++;
        }
        if (this.data[this.indexes[k]] >= this.data[this.indexes[j]]) break;    // 比较孩子和本身大小，孩子比较本身小的话不用交换位置
        this.data.swap(this.indexes[k], this.indexes[j]);
        k = j;                      // k变成了孩子的位置，继续下一轮循环
    }
}

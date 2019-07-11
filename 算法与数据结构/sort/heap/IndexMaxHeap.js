/**
 * 索引最大堆
 * 堆中元素是indexes[j],是 data 的索引，data[indexes[j]]是真正的元素值，不改变 data 中元素的顺序
 * 用户可以通过 i 修改 data 值
 * indexes[j] == i; 此处查找 j 需要遍历一次，O(n)复杂度
 */
function IndexMaxHeap() {
  this.data = [];
  this.indexes = []; // 存索引
  this.count = 0;
  // k是目标索引
  this._shiftUp = function(k) {
    while(k>1 && this.data[this.indexes[parseInt(k/2)]]<this.data[this.indexes[k]]) {
      this.indexes.swap(parseInt(k/2), k);
      k = parseInt(k/2);
    }
  }
  this._shiftDown = function(k) {
    while(2*k<=this.count) {
      var j = 2*k;
      if(j+1<=this.count && this.data[this.indexes[j+1]] > this.data[this.indexes[j]]) {
        j++;
      }
      if (this.data[this.indexes[j]] <= this.data[this.indexes[k]]) {
        break;
      }
      this.indexes.swap(k, j);
      k = j;
    }
  }

  this.size = function() {
    return this.count;
  }
  this.isEmpty = function() {
    return this.count == 0;
  }

  this.insert = function(i, item) {
    if (!this.data[i+1]&&this.data[i+1]!==0) {
      i += 1; // 转变成从1开始索引
      this.data[i] = item;
      this.indexes[this.count+1] = i;
      this._shiftUp(this.count+1);
      this.count++;
    } else {
      this.change(i, item);
    }
  }

  // 取出根元素，即data[1]
  // 将data末尾移到data[1],对索引1执行shift down操作
  this.extractMax = function() {
    console.assert(this.count>0);
    var item = this.data[this.indexes[1]];
    this.indexes.swap(1, this.count);  // 将数组最后一个元素挪到根元素的位置，使其满足完全二叉树的定义
    this.count--;
    this._shiftDown(1);
    return item;
  }

  this.extractMaxIndex = function() {
    console.assert(this.count>0);
    var index = this.indexes[1];
    this.indexes.swap(1, this.count);  // 将数组最后一个元素挪到根元素的位置，使其满足完全二叉树的定义
    this.count--;
    this._shiftDown(1);
    return index - 1; // 返回给外部的用户是从0开始的
  }

  this.getItem = function(i) {
    return this.data[i+1];
  }

  this.change = function(i, newItem) {
    i += 1;
    this.data[i] = newItem;
    // 找到this.indexes[j] = i,j表示data[i]在堆中的位置

    // 时间复杂度为 O(n+logn)即O(n),依次for循环，加两个分层遍历
    // 此时用户如果对n个元素进行修改，那么整个操作就是O(n^2)的复杂度，这是不理想的情况
    for (var j = 1; j<=this.count; j++) {
      if (this.indexes[j] == i) {
        this._shiftUp(j);
        this._shiftDown(j);
        return;
      }
    }
    // 优化版
    
  }

  // 将一个数组转化成最大堆
  this.getFromArray = function(array) {
    this.count = 0; // 初始化
    for (var i=0; i<array.length; i++) {
      this.data[i+1] = array[i];
      this.indexes[i+1] = i+1;
    }
    this.count = array.length;
    var lastNotLeaf = parseInt(this.count/2);  // 第一个非子节点，是this.data最后一个元素所在节点的父节点
    for (var i=lastNotLeaf; i>=1; i--) {
      this._shiftDown(i);
    }
  }
}

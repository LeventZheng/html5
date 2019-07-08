function IndexMaxHeap() {
  this.data = [];
  this.indexes = []; // 存索引
  this.reverse = [];  // 映射data中的索引在indexes中的位置，用于反向查找
  this.count = 0;
  // k是目标索引
  this._shiftUp = function(k) {
    while(k>1 && this.data[this.indexes[parseInt(k/2)]]<this.data[this.indexes[k]]) {
      this.indexes.swap(parseInt(k/2), k);
      this.reverse[this.indexes[parseInt(k/2)]] = parseInt(k/2);
      this.reverse[this.indexes[k]] = k;
      k = parseInt(k/2);
    }
  }
  // 将当前节点与两个子节点对比，与更大的子节点交换
  // 先判断有没有子节点(即判断有没有左子节点)，再判断有没有左子节点
  this._shiftDown = function(k) {
    // 判断k索引是否有子节点，在完全二叉树中只要有左子节点就说明有子节点
    // while(this.data[2*k] ) // 不能这样判断，this.data超出count部分可能有旧数据
    while(2*k<=this.count) {
      var j = 2*k;  // 在此轮循环中，data[k]和data[j]交换位置
      // 判断是否有右孩子
      if(j+1<=this.count && this.data[this.indexes[j+1]] > this.data[this.indexes[j]]) {
        j++;
      }
      if (this.data[this.indexes[j]] <= this.data[this.indexes[k]]) {
        break;
      }
      this.indexes.swap(k, j);
      this.reverse[this.indexes[k]] = k;
      this.reverse[this.indexes[j]] = j;
      k = j;
    }
  }

  this.size = function() {
    return this.count;
  }
  this.isEmpty = function() {
    return this.count == 0;
  }

  // i是元素的索引,对用户而言，索引是从0开始的
  this.insert = function(i, item) {
    i += 1; // 转变成从1开始索引
    this.data[i] = item;
    this.indexes[this.count+1] = i;
    this.reverse[i] = this.count+1;
    this._shiftUp(this.count+1);
    this.count++;
  }
  /* this.insert = function(item) {
    this.data[this.count+1] = item; // 添加到数组末尾
    this.indexes[this.count+1] = i;
    this._shiftUp(this.count+1);
    this.count++;
  } */

  // 取出根元素，即data[1]
  // 将data末尾移到data[1],对索引1执行shift down操作
  this.extractMax = function() {
    console.assert(this.count>0);
    var item = this.data[this.indexes[1]];
    this.indexes.swap(1, this.count);  // 将数组最后一个元素挪到根元素的位置，使其满足完全二叉树的定义
    this.reverse[this.indexes[1]] = 1;
    this.reverse[this.indexes[this.count]] = null;  // 被删除
    this.count--;
    this._shiftDown(1);
    return item;
  }
  this.extractMaxIndex = function() {
    console.assert(this.count>0);
    var index = this.indexes[1];
    this.indexes.swap(1, this.count);  // 将数组最后一个元素挪到根元素的位置，使其满足完全二叉树的定义
    this.reverse[this.indexes[1]] = 1;
    this.reverse[this.indexes[this.count]] = null;  // 被删除
    this.count--;
    this._shiftDown(1);
    return index - 1; // 返回给外部的用户是从0开始的
  }

  this.contain = function(i) {
    console.assert(i>=0);
    return !!this.reverse[i+1];
  }

  this.getItem = function(i) {
    if (!this.contain(i)) return;
    return this.data[i+1];
  }

  this.change = function(i, newItem) {
    if (!this.contain(i)) return;
    i += 1;
    this.data[i] = newItem;
    // 找到this.indexes[j] = i,j表示data[i]在堆中的位置

    // 时间复杂度为 O(n+logn)即O(n),依次for循环，加两个分层遍历
    // 此时用户如果对n个元素进行修改，那么整个操作就是O(n^2)的复杂度，这是不理想的情况
    // for (var j = 1; j<=this.count; j++) {
    //   if (this.indexes[j] == i) {
    //     this._shiftUp(j);
    //     this._shiftDown(j);
    //     return;
    //   }
    // }
    // 优化版
    var j = this.reverse[i];
    this._shiftUp(j);
    this._shiftDown(j);
  }

  // 将一个数组转化成最大堆
  this.getFromArray = function(array) {
    this.count = 0; // 初始化
    for (var i=0; i<array.length; i++) {
      this.data[i+1] = array[i];
      this.indexes[i+1] = i;
    }
    this.count = array.length;
    var lastNotChild = parseInt(this.count/2);  // 第一个非子节点，是this.data最后一个元素所在节点的父节点
    for (var i=lastNotChild; i>=1; i--) {
      this._shiftDown(i);
    }
  }
}

function MaxHeap() {
  this.data = [];
  this.count = 0;
  // k是目标索引
  this._shiftUp = function(k) {
    // 父节点比当前节点小
    // 判断k>1避免循环越界
    // parseInt(k/2) 取到父节点的索引
    while(k>1 && this.data[parseInt(k/2)]<this.data[k]) {
      this.data.swap(parseInt(k/2), k);
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
      if(j+1<=this.count && this.data[j+1] > this.data[j]) {
        j++;
      }
      if (this.data[j] <= this.data[k]) {
        break;
      }
      this.data.swap(k, j);
      k = j;
    }
  }

  this.size = function() {
    return this.count;
  }
  this.isEmpty = function() {
    return this.count == 0;
  }

  // 将元素添加到data的末尾，，这样新的树满足是一个完全二叉树
  // 然后通过_shiftUp，将该索引所在的元素移动到合适的位置，使这颗树满足最大堆的性质
  this.insert = function(item) {
    this.data[this.count+1] = item; // 0的位置不放任何元素，所以count+1
    this._shiftUp(this.count+1);
    this.count++;
  }

  // 取出根元素，即data[1]
  // 将data末尾移到data[1],对索引1执行shift down操作
  this.extractMax = function() {
    console.assert(this.count>0);
    var item = this.data[1];
    this.data.swap(1, this.count);  // 将数组最后一个元素挪到根元素的位置，使其满足完全二叉树的定义
    this.count--;
    this._shiftDown(1);
    return item;
  }

  // 将一个数组转化成最大堆
  this.getFromArray = function(array) {
    this.count = 0; // 初始化
    for (var i=0; i<array.length; i++) {
      this.data[i+1] = array[i];
    }
    this.count = array.length;
    var lastNotChild = parseInt(this.count/2);  // 第一个非子节点，是this.data最后一个元素所在节点的父节点
    for (var i=lastNotChild; i>=1; i--) {
      this._shiftDown(i);
    }
  }
}

function MinHeap() {
  this.count = 0;
  this.data = [];

  this._shiftUp = function(k) {
    while(k>1) {
      var p = parseInt(k/2);
      if (this.data[k]<this.data[p]) {
        this.data.swap(k, p);
        k = p;
      } else {
        break;
      }
    }
  }

  this._shiftDown = function(k) {
    while(k*2 <= this.count) {
      var j = k*2;
      // 有右子节点且右子节点比左子节点小，取右子节点
      if (j+1<=this.count && this.data[j+1]<this.data[j]) {
        j++;
      }
      // 子节点比父节点小
      if (this.data[j]<this.data[k]) {
        this.data.swap(k, j);
        k = j;
      } else {
        break;
      }
    }
  }

  this.size = function() {
    return this.size;
  }
  this.isEmpty = function() {
    return this.count == 0;
  }

  this.insert = function(item) {
    this.data[this.count+1] = item;
    this._shiftUp(this.count+1);
    this.count++;
  }

  this.extractMin = function() {
    var result = this.data[1];
    this.data.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return result;
  }
}
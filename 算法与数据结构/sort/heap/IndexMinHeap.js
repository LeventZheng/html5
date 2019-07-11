function IndexMinHeap() {
  this.count = 0;
  this.data = [];
  this.indexes = [];

  this._shiftUp = function(k) {
    while(k>1) {
      var p = parseInt(k/2);
      if (this.data[this.indexes[k]]<this.data[this.indexes[p]]) {
        this.indexes.swap(k, p);
        k = p;
      } else {
        break;
      }
    }
  }

  this._shiftDown = function(k) {
    while(k*2 <= this.count) {
      var j = k*2;
      if (j+1<=this.count && this.data[this.indexes[j+1]]<this.data[this.indexes[j]]) {
        j++;
      }
      if (this.data[this.indexes[j]]<this.data[this.indexes[k]]) {
        this.indexes.swap(k, j);
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

  this.insert = function(i, item) {
    if (!this.data[i+1]&&this.data[i+1]!==0) {
      i++;
      this.count++;
      this.data[i] = item;
      this.indexes[this.count] = i;
      this._shiftUp(this.count);
    } else {
      this.change(i, item);
    }
  }

  this.extractMin = function() {
    var result = this.data[this.indexes[1]];
    this.indexes.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return result;
  }

  this.extractMinIndex = function() {
    var result = this.indexes[1];
    this.indexes.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return result-1;
  }

  this.getItem = function(i) {
    return this.data[i+1];
  }

  this.change = function(i, item) {
    i++;
    this.data[i] = item;
    for (var j=0; j<=this.count; j++) {
      if (this.indexes[j] == i) {
        this._shiftDown(this.indexes[j]);
        this._shiftUp(this.indexes[j]);
        return;
      }
    }
  }

  this.getFromArray = function(array) {
    this.count = array.length;
    for (var i=0; i<array.length; i++) {
      this.data[i+1] = array[i];
      this.indexes[i+1] = i+1;
    }
    var lastNotLeaf = parseInt(this.count/2);
    for (var i=lastNotLeaf; i>=0; i--) {
      this._shiftDown(i);
    }
  }
}
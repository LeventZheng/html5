function IndexHeap() {
  this.count = 0;
  this.data = [];
  this.maxIndexes = [];
  this.minIndexes = [];

  this._shiftUp = function(k) {
    var k1 = k;
    while(k1>1 && this.data[this.maxIndexes[parseInt(k1/2)]]<this.data[this.maxIndexes[k1]]) {
      this.maxIndexes.swap(parseInt(k1/2), k1);
      k1 = parseInt(k1/2);
    }
    var k2 = k;
    while(k2>1 && this.data[this.minIndexes[parseInt(k2/2)]]>this.data[this.minIndexes[k2]]) {
      this.minIndexes.swap(parseInt(k2/2), k2);
      k2 = parseInt(k2/2);
    }
  }

  this._shiftDown = function(k) {
    var k1 = k;
    while(2*k1 <= this.count) {
      var j = 2*k1;
      if (j+1<=this.count && this.data[this.maxIndexes[j]]<this.data[this.maxIndexes[j+1]]) {
        j++;
      }
      if (this.data[this.maxIndexes[j]] <= this.data[this.maxIndexes[k1]]) {
        break;
      }
      this.maxIndexes.swap(k1, j);
      k1 = j;
    }

    var k2 = k;
    while(2*k2 <= this.count) {
      var j = 2*k2;
      if (j+1<=this.count && this.data[this.minIndexes[j+1]]<this.data[this.minIndexes[j]]) {
        j++;
      }
      if (this.data[this.minIndexes[j] >= this.data[this.minIndexes[k2]]]) {
        break;
      }
      this.minIndexes.swap(k2, j);
      k2 = j;
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
      i += 1;
      this.data[i] = item;
      this.maxIndexes[this.count+1] = i;
      this.minIndexes[this.count+1] = i;
      this.count++;
      this._shiftUp(this.count);
    } else {
      this.change(i, item);
    }
  }

  this.extractMax = function() {
    var result = this.data[this.maxIndexes[1]];
    this.maxIndexes.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return result;
  }

  this.extractMaxIndex = function() {
    var index = this.maxIndexes[1];
    this.maxIndexes.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return index - 1;
  }

  this.extractMin = function() {
    var result = this.data[this.minIndexes[1]];
    this.minIndexes.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return result;
  }

  this.extractMinIndex = function() {
    var index = this.minIndexes[1];
    this.minIndexes.swap(1, this.count);
    this.count--;
    this._shiftDown(1);
    return index - 1;
  }

  this.getItem = function(i) {
    return this.data[i+1];
  }

  this.change = function(i, item) {
    i++;
    this.data[i] = item;

    for (var j=0; j<=this.count; j++) {
      if (this.maxIndexes[j] == i) {
        this._shiftDown(this.maxIndexes[j]);
        this._shiftUp(this.maxIndexes[j]);
      }
      if (this.minIndexes[j] == i && this.minIndexes[j] != this.maxIndexes[j]) {
        this._shiftDown(this.minIndexes[j]);
        this._shiftUp(this.minIndexes[j]);
      }
    }
  }

  this.getFromArray = function(array) {
    this.count = array.length;
    for (var i=0; i<array.length; i++) {
      this.data[i+1] = array[i];
      this.maxIndexes[i+1] = i+1;
      this.minIndexes[i+1] = i+1;
    }
    var lastNotLeaf = parseInt(this.count/2);
    for (var j=lastNotLeaf; j>= 1; j--) {
      this._shiftDown(j);
    }
  }
}
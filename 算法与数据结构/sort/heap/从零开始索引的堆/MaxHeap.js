function MaxHeap() {
  this.count = [];
  this.data = [];

  this._shiftUp = function(k) {
    while(k>0 && this.data[parseInt((k-1)/2)]>this.data[k]) {
      this.data.swap(parseInt((k-1)/2), k);
      k = parseInt((k-1)/2);
    }
  }
  this._shiftDown = function(k) {
    while(k*2+1<=this.count) {
      var j = k*2 + 1;
      if (j+1<=this.count && this.data[j+1]>this.data[j]) {
        j++;
      }
      if (this.data[j] <= this.data[k]) {
        break;
      }
      this.data.swap(j, k);
      k = j;
    }
  }

  this.size = function() {
    return this.count;
  }
  this.isEmpty = function() {
    return this.count == 0;
  }
  this.insert = function(item) {
    this.data[this.count] = item;
    this._shiftUp(this.count);
    this.count++;
  }
  this.extractMax = function() {
    var result = this.data[0];
    this.data.swap(0, this.count);
    this._shiftDown(0);
    this.count--;
    return result;
  }
}
function UnionFind(n) {
    this.count = n;
    let id;
    for (let i=0; i<n; i++) {
        id[i] = i;
    }
}
UnionFind.prototype.find = function(p) {
    console.assert(p >= 0 && p < this.count);
    return this.id[p];
}
UnionFind.prototype.isConnected = function(p, q) {
    return this.find(p) == this.find(q);
}
UnionFind.prototype.unionElements = function(p, q) {
    let pID = this.find(p);
    let qID = this.find(q);
    if (pID == qID) return;
    // 把所有值为 pID 的元素值设置为 qID
    for (let i=0; i< this.count; i++) {
        if (this.id[i] == pID) {
            id[i] = qID;
        }
    }
}
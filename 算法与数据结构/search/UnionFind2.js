function UnionFind(n) {
    this.count = n;
    let parent = [];
    // 初始时候，两两元素互不连接
    for (let i=0; i<n; i++) {
        parent[i] = i;
    }
}
UnionFind.prototype.find = function(p) {
    console.assert(p >= 0 && p < this.count);
    while(p != this.parent[p])
        p = this.parent[p];
    return p;
}
UnionFind.prototype.isConnected = function(p, q) {
    return this.find(p) == this.find(q);
}
UnionFind.prototype.unionElements = function(p, q) {
    let pRoot = this.find(p);
    let qRoot = this.find(q);
    if (pRoot == qRoot) return;
    this.parent[pRoot] = qRoot;
}

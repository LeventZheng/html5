// 第二个版本的 UnionFind
function UnionFind(n) {
    this.count = n;
    let parent = [];
    // 初始时候，两两元素互不连接
    for (let i=0; i<n; i++) {
        parent[i] = i;
    }
}

// 获取节点的根节点
UnionFind.prototype.find = function(p) {
    console.assert(p >= 0 && p < this.count);
    while(p != this.parent[p])
        p = this.parent[p];
    return p;
}

// 判断是否连接，即判断两个节点的根节点是否是同一个
UnionFind.prototype.isConnected = function(p, q) {
    return this.find(p) == this.find(q);
}

// 连接两个节点，改变其中一个节点所在树的根节点，指向另一个节点的根节点就可以了
UnionFind.prototype.unionElements = function(p, q) {
    let pRoot = this.find(p);
    let qRoot = this.find(q);
    if (pRoot == qRoot) return;
    this.parent[pRoot] = qRoot;
}

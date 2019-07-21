// 第三版并查集，连接的时候判断比较两个节点树的高低，低的树连接到高的树上面
// 包含了路径压缩优化
// 时间复杂度近乎是O(1)
function UnionFind(n) {
    this.count = n;
    let parent = [];
    let rank = [];  // rank[i] 表示以 i 为根的集合所表示的树的层数
    // 初始时候，两两元素互不连接
    for (let i=0; i<n; i++) {
        parent[i] = i;
        rank[i] = 1;
    }
}
UnionFind.prototype.find = function(p) {
    console.assert(p >= 0 && p < this.count);
    // while(p != this.parent[p]) {
    //     this.parent[p] = this.parent[this.parent[p]];   // 跳一级找 parent，路径压缩优化
    //     p = this.parent[p];
    // }
    // return p;
    
    // 优化的第二个版本 使用递归 将所有节点，直接挂到根节点下
    if (p != this.parent[p]) { // 说明p不是根节点
        // 将父节点指向根节点
        this.parent[p] = this.find(this.parent[p]); // find返回元素的根节点
    }
    return this.parent[p];
}
UnionFind.prototype.isConnected = function(p, q) {
    return this.find(p) == this.find(q);
}
// 在合并的时候，根据 p 和 q 的层数决定谁合并谁
UnionFind.prototype.unionElements = function(p, q) {
    let pRoot = this.find(p);
    let qRoot = this.find(q);
    if (pRoot == qRoot) return;
    if (this.rank[pRoot] < this.rank[qRoot]) {
        this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
        this.parent[qRoot] = pRoot;
    } else { // this.rank[pRoot] == this.rank[qRoot]
        this.parent[pRoot] = qRoot;
        this.rank[qRoot]++;
    }
}

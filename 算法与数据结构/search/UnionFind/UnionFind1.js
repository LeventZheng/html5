// 第一个版本的 UnionFind
function UnionFind(n) {
    this.count = n;
    let id = [];
    for (let i=0; i<n; i++) {
        id[i] = i;
    }
}

// 根据元素查找id
UnionFind.prototype.find = function(p) {
    console.assert(p >= 0 && p < this.count);
    return this.id[p];
}

// 判断两个元素是否相连，即判断两个元素的id是否相等
UnionFind.prototype.isConnected = function(p, q) {
    return this.find(p) == this.find(q);
}

// 连接两个元素
// 要么把所有等于id[p]的元素改成id[q]
// 要么把所有等于id[q]的元素改成id[p]
// 时间复杂度O(n)
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
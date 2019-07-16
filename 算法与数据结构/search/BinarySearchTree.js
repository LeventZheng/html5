/**
 * 二分查找树
 */
function Node(key, value) {
    if (key && value) {
        this.key = key;
        this.value = value;
    }
    this.left = new Node();
    this.right = new Node();
    this.root = new Node();
    this.count = 0;
}

Node.prototype.size = function() {
    return this.count;
}
Node.prototype.isEmpty = function() {
    return this.count == 0;
}

// 使用递归的方式实现插入
Node.prototype.insert = function(key, value) {
    root = this._insert(this.root, key, value);
}
// 向以 node 为根的二叉搜索树中，插入节点（key,value）
// 返回插入新节点后的二叉搜索树的根
Node.prototype._insert = function(node, key, value) {

    // 这里是处理递归到底，最基本的情况
    if (node == null) {
        this.count++;
        return new Node(key, value);
    }
    if(key == node.key) {
        node.value = value;
    } else if (key < node.key) {
        node.left = this._insert(node.left, key, value);
    } else {
        node.right = this._insert(node.right, key, value);
    }
    return node;
}

// 查看以 node 为跟的二叉搜索树中是否包含键值为 key 的节点
Node.prototype.contain = function(key) {
    return this._contain(this.root, key);
}
Node.prototype._contain = function(node, key) {
    if (node == null) {
        return false;
    }
    if(key == node.key) {
        return true
    } else if (key < node.key) {
        return this._contain(node.left, key);
    } else {
        return this._contain(node.right, key);
    }
}

// search 的返回值应该是什么？
// 1种是返回 node 节点，但是这样把node结构暴露给用户了，node结构应该是私有的
// 2种是返回 value，要先判断是否存在(c++种不能返回空)
Node.prototype.search = function(key) {
    console.assert(this.contain(key));
    return this._search(this.root, key);
}
Node.prototype._search = function(node, key) {
    if (node == null) {
        return null;
    }
    if(key == node.key) {
        return node.value
    } else if (key < node.key) {
        return this._search(node.left, key);
    } else {
        return this._search(node.right, key);
    }
}

// 前序遍历
// 对以 node 为根的二叉搜索树进行前序遍历
Node.prototype.preOrder = function(node) {
    if (node != null) {
        console.log(node.key);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
}
// 中序遍历
Node.prototype.inOrder = function(node) {
    if (node != null) {
        this.inOrder(node.left);
        console.log(node.key);
        this.inOrder(node.right);
    }
}
// 后序遍历
Node.prototype.postOrder = function(node) {
    if (node != null) {
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.key);
    }
}
// 空间释放
Node.prototype.destory = function(node) {
    if (node != null) {
        this.destory(node.left);
        this.destory(node.right);
        delete node;
        this.count--;
    }
}

// 层序遍历
Node.prototype.levelOrder = function() {
    let q = [];
    q.push(this.root);
    while(q.length == 0) {
        let node = q.pop();
        console.log(node.key);
        if (node.left) {
            q.push(node.left);
        }
        if (node.right) {
            q.push(node.right);
        }
    }
}

// 在以 node 为根的二叉搜索树中，返回最小键值对的节点
Node.prototype.minimum = function(node) {
    if (node.left == null) {
        return node;
    }
    return this.minimum(node.left);
}
Node.prototype.maximum = function(node) {
    if (node.right == null) {
        return node;
    }
    return this.maximum(node.right);
}
// 从二叉树中删除最小值所在节点
Node.prototype.removeMin = function() {
    if (root) {
        root = this._removeMin(root);
    }
} 
// 删除掉以 node 为根的二分搜索树中最小节点
// 返回删除节点后新的二分搜索树的根
Node.prototype._removeMin = function(node) {
    console.assert(this.count == 0);
    if (node.left == null) {
        const rightNode = node.right;
        delete node;
        this.count--;
        return rightNode;
    }
    node.left = this._removeMin(node.left);
    return node;
} 

// 从二叉树中删除最大值所在节点
Node.prototype.removeMax = function() {
    if (root) {
        root = this._removeMax(root);
    }
} 
// 删除掉以 node 为根的二分搜索树中最小节点
// 返回删除节点后新的二分搜索树的根
Node.prototype._removeMax = function(node) {
    console.assert(this.count == 0);
    if (node.right == null) {
        const leftNode = node.left;
        delete node;
        this.count--;
        return leftNode;
    }
    node.right = this._removeMax(node.right);
    return node;
}

// 从二叉树中删除键值为 key 的节点
Node.prototype.remove = function(key) {
    if (root) {
        root = this._remove(root, key);
    }
}
Node.prototype._remove = function(node, key) {
    if (node == null) return null;
    if (key < node.key) {
        node.left = this._remove(node.left, key);
        return node;
    }
    else if(key > node.key) {
        node.right = this._remove(node.right, key);
        return node;
    }
    // 找到，这里是重点
    else {  // key == node.key
        if (node.left == null) {
            const rightNode = node.right;
            delete node;
            this.count --;
            return rightNode;
        }
        if (node.right == null) {
            const leftNode = node.left;
            delete node;
            this.count --;
            return leftNode;
        }
        // 左右孩子都不为空
        const successor = JSON.parse(JSON.stringify(this.minimum(node.right)));
        this.count++;   // 这里新增了一个节点，所以要+1

        successor.right = this.removeMin(node.right);
        successor.left = node.left;
        delete node;
        this.count--;
        return successor;
    }
}
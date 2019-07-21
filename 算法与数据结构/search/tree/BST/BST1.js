// 带treeNum的二分搜索树，可进行节点的rank和select的计算
function Node(key, value) {
  this.treeNum = 1; // 初始化的时候，单个节点就是一个以自己为根的数，数量为1
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
}
function BST() {
  this.count = 0;
  this.root = null;
  this.insert = function(key, value) {
    this.root = _insert(this.root, key, value);
  }
  function _insert(node, key, value) {
    if (!node) {
      this.count++;
      return new Node(key, value);
    }
    if (key > node.key) {
      node.right = _insert(node.right, key, value);
      node.treeNum++;
    } else if (key < node.key) {
      node.left = _insert(node.left, key, value);
      node.treeNum++;
    } else {
      node.value = value;
    }
    return node;
  }
  this.remove = function (key) {
    _remove(this.root, key);
  }
  function _remove(node, key) {
    if (key > node.key) {
      node.right = _remove(node.right, key);
    } else if (key < node.left) {
      node.left = _remove(node.left, key);
    } else {
      if (!node.left) {
        var right = node.right;
        delete node;
        this.count--;
        return right;
      } else if (!node.right) {
        var left = node.left;
        delete node;
        this.count--;
        return left;
      } else {
        var successor = _minimum(node.right);
        successor.right = _removeMin(node.right); // 将返回的跟节点作为新的
        this.count++;
        successor.left = node.left;
        successor.treeNum = node.treeNum-1;
        delete node;
        this.count--;
        return successor;
      }
    }
    node.treeNum--;
    return node;
  }
  function _minimum(node) {
    if (!node.left) {
      return node;
    }
    return _minimum(node.left);
  }
  function _removeMin(node) {
    if (!node.left) {
      var right  = node.right;
      delete node;
      this.count--;
      return right;
    }
    // 删除以node.left为根的左子树的最小节点
    // _removeMin方法返回待处理子树的根节点
    // 根节点指向原来p节点的left
    node.left = _removeMin(node.left);
    return node;
  }

  this.rank = function(key) {
    return _rank(this.root, key, 0);
  }
  function _rank(node, key, rank) {
    if (node == null) return 0;
    if (node.key == key) {
      rank++;
      if (node.left) {
        rank += node.left.treeNum; // 左子树的节点数
      }
      return rank;
    } else if (key > node.key) {
      if (node.left) {
        rank += node.left.treeNum; // 左子树的节点数
      }
      rank++; // 当前节点
      return _rank(node.right, key, rank);
    } else {
      return _rank(node.left, key, rank);
    }
  }
}
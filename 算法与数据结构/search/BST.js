
function Node(key, value) {
  if (key && value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BinarySearchTree
function BST() {
  this.root = null; // 类型是Node
  this.count = 0;

  // 该方法返回以node为根元素的子树
  function _insert(node, key, value) {
    // 递归到底，创建一个新的元素
    if (node == null) {
      this.count++;
      return new Node(key, value);
    }
    // 值相等时更新
    if (node.key == key) {
      node = new Node(key, value);
    } else if (key > node.key) {
      // 插入到node的右子树中，最终返回右子树的根元素
      // node.right 更新为根元素
      node.right = _insert(node.right, key, value);
    } else {
      node.left = _insert(node.left, key, value);
    }
    return node;
  }

  function _search(node, key) {
    if (node == null) {
      return null;
    }
    if (node.key == key) {
      return node;
    } else if (node.key < key) {
      return _search(node.right, key);
    } else {
      return _search(node.left, key);
    }
  }
  function _contain(node, key) {
    if (node == null) {
      return false;
    }
    if (node.key == key) {
      return true;
    } else if (node.key < key) {
      return _contain(node.right, key);
    } else {
      return _contain(node.left, key);
    }
  }

  this.size = function() {
    return this.count;
  }
  this.isEmpty = function() {
    return this.count == 0;
  }

  this.insert = function(key,value) {
    this.root = _insert(this.root, key,value);
  }

  this.search = function(key) {
    return _search(this.root, key);
  }
  this.contain = function(key) {
    return _contain(this.root, key);
  }

  this.preOrder = function (node) {
    if(node) {
      console.log(node.key);
      preOrder(node.left);
      preOrder(node.right);
    }
  }
  
  this.midOrder = function (node) {
    if(node) {
      preOrder(node.left);
      console.log(node.key);
      preOrder(node.right);
    }
  }
  
  this.postOrder = function (node) {
    if(node) {
      preOrder(node.left);
      preOrder(node.right);
      console.log(node.key);
    }
  }
  // 销毁的本质是一个后序遍历，先把节点左右子树清空，再将节点删除
  this.destory = function(node) {
    if (node) {
      _destory(node.left);
      _destory(node.right);
      delete node;
      this.count--;
    }
  }

  // 层序遍历
  this.leverOrder = function() {
    var queue = [];
    queue.push(this.root);
    while(queue.length) {
      var node = queue.shift();
      console.log(node.key);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  // 寻找最小的节点的key
  this.minimum = function() {
    return _minimum(this.root);
  }
  function _minimum(node) {
    if (!node.left) {
      return node.key;
    }
    return this._minimum(node.left);
  }
  // 寻找最大的节点
  this.maximum = function() {
    return _maximum(this.root);
  }
  function _maximum(node) {
    if (!node.right) {
      return node.key;
    }
    return this.maximum(node.right);
  }

  this.removeMin = function() {
    if (!this.root) return;
    this.root = _removeMin(this.root);
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
    node.left = this._removeMin(node.left);
    return node;
  }
  this.removeMax = function() {
    if (!this.root) return;
    this.root = _removeMax(this.root);
  }
  function _removeMax(node) {
    if (!node.right) {
      var left  = node.left;
      delete node;
      this.count--;
      return left;
    }
    node.right = this._removeMax(node.right);
    return node;
  }
}
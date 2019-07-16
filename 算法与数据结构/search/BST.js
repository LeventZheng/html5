
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
}
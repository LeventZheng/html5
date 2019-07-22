function AVLBalanceTree() {
  function Node(key, value, height) {
    this.key = key;
    this.value = value;
    this.height = 0;
    this.left = null;
    this.right = null;
  }
  
  this.root = null;
  this.count;
  var ALLOWED_IMBALANCE = 1;
  function _height(node) {
    return node==null?-1:node.height;
  }
  this.insert = function(key, value) {
    _insert(this.root, key, value, 1);
  }
  function _insert(node, key, value, height) {
    if (node == null) {
      return new Node(key, value, height);
    }
    if (key > node.key) {
      node.right = _insert(node.right, key, value, height++);
    } else if (key < node.key) {
      node.left = _insert(node.left, key, value, height++);
    } else {
      node.value = value;
    }
    return _balance(node);
  }
  function _balance(t) {
    if (t == null) return t;
    if (_height(t.left) - _height(t.right) > ALLOWED_IMBALANCE) {
      if (_height(t.left.left) >= _height(t.left.right)) {
        t = rotateWithLeftChild(t);
      } else {
        t = doubleWithLeftChild(t);
      }
    } else {
      if (_height(t.right) - _height(t.left) > ALLOWED_IMBALANCE) {
        if (_height(t.right.right) >= _height(t.right.left)) {
          t = rotateWithRightChild(t);
        } else {
          t = doubleWithLeftChild(t);
        }
      }
      t.height = Math.max(_height(t.left), _height(t.right)) + 1;
      return t;
    }
  }
  function rotateWithLeftChild(k2) {
    var k1 = k2.left;
    k2.left = k1.right;
    k1.right = k2;
    k2.height = Math.max(_height(k2.left), _height(k2.right)) + 1;
    k1.height = Math.max(_height(k1.left), k2.height) + 1;
    return k1;
  }
  function doubleWithLeftChild(k3) {
    k3.left = rotateWhitRightChild(k3.left);
    return rotateWithLeftChild(k3);
  }
  function rotateWhitRightChild(k1) {
    var k2 = k1.right;
    k1.right = k2.left;
    k2.left = k1;
    k1.height = Math.max(_height(k1.left), _height(k1.right)) + 1;
    k2.height = Math.max(_height(k2.left), _height(k2.right)) + 1;
    return k2;
  }

}
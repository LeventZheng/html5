// 支持插入重复元素，统计数量
function Node(key, value) {
  this.treeNum = 1; // 初始化的时候，单个节点就是一个以自己为根的数，数量为1
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
  this.count = 1;
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
      node.count++;
    }
    return node;
  }
}
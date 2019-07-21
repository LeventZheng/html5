function AVLBalanceTree() {
  function Node(key, value) {
    this.key = key;
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
  
  this.root = null;
  this.count;

  // 求一个节点的高度
  function _height(node) {
    return node==null?0:node.height;
  }

  // 求左右子节点最大高度
  function _maxHeight(left, right) {
    return  Math.max(_height(left), _height(right));
  }

  /**
   * 左左旋转模型
   * @param node 旋转之前的parent node 节点 
   * @return 旋转之后的parent node节点 
   */
  function leftLeftRotate(node) {
    var newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    node.height = _maxHeight(node.left, node.right)+1;
    newRoot.height = _maxHeight(newRoot.left, newRoot.right) + 1;
    return newRoot;
  }
  /**
  * 右右旋转模型
  * @param node 旋转之前的parent node 节点 
  * @return 旋转之后的parent node节点 
  */
  function rightRightRotate(node) {
    var newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    //由此node的高度降低了，newRoot的高度提高了。
    //newRoot的高度由node的高度而来 
    node.height = _maxHeight(node.left, node.right);
    newRoot.height = _maxHeight(newRoot.left, newRoot.right);
    return newRoot;
  }
  /**
  * 左右模型，先右右，再左左 
  * @param node 
  * @return 
  */
  function leftRightRotate(node) {
    //注意传递的参数 
    node.left = rightRightRotate(node.left);
    return leftLeftRotate(node);
  }
  /***
  * 右左模型，先左左，在右右 
  * @param node 
  * @return 
  */
  function rightLeftRotate(node){
    node.right = leftLeftRotate(node.right);
    return rightRightRotate(node);
  }

  this.insert = function(key, value) {
    this.root = _insert(this.root, key, value);
  }
  function _insert(parent, key, value) {
    if (parent == null) {
      this.count++;
      return new Node(key, value);
    }
    if (key > parent.key) {
      //插入判断，大于父节点，插入到右边
      //注意理解回溯，这里最终返回的是插入完成节点
      //每一层回溯，都会返回相应当时递归的节点！！！
      parent.right = _insert(parent.right, key, value);
      if (_height(parent.right) - _height(parent.left) > 2) {
        var compareKey = parent.left.key;
        // 右右旋转类型
        if (key > compareKey) {
          parent = rightRightRotate(parent);
        } else {
          // 右左旋转类型
          parent = rightLeftRotate(parent);
        }
      }
    } else if (key < parent.key) {
      //插入判断，小于父节点，插入到左边
      //注意理解回溯，这里最终返回的是插入完成节点
      //每一层回溯，都会返回相应当时递归的节点！！！
      parent.left = _insert(parent.left, key, value);
      if (_height(parent.left) - _height(parent.right) > 1) {
        var compareKey = parent.left.key;
        //左左旋转类型
        if(key < compareKey){
          parent = leftLeftRotate(parent);
        } else { 
          //左右旋转类型
          parent = leftRightRotate(parent);
        }
      }
    } else {
      parent.value = value;
    }
    parent.height = _maxHeight(parent.left, parent.right) + 1;
    return parent;
  }
}
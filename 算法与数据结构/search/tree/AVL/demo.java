node类

public static class AvlNodeInteger{
  private Integer value;
  private Integer height;
  private AvlNodeInteger left;
  private AvlNodeInteger right;
  public AvlNodeInteger(int t){
    initNode(t,null,null,1);
  }
  public AvlNodeInteger(int t,AvlNodeInteger left,AvlNodeInteger right){
    initNode(t,left,right,null);
  }
  private void initNode(int t,AvlNodeInteger left,AvlNodeInteger right,Integer height){
    this.setValue(t);
    this.left = left;
    this.right = right;
    this.height = height;
  }
  public Integer getValue() {
    return value;
  }
  public void setValue(Integer value) {
    this.value = value;
  }
  public Integer getHeight() {
    return height;
  }
  public void setHeight(Integer height) {
    this.height = height;
  }
  public AvlNodeInteger getLeft() {
    return left;
  }
  public void setLeft(AvlNodeInteger left) {
    this.left = left;
  }
  public AvlNodeInteger getRight() {
    return right;
  }
  public void setRight(AvlNodeInteger right) {
    this.right = right;
  }
}

高度计算

/**** 求一个节点的高度 * @param t * @return */
private int height(AvlNodeInteger t){
  return null == t ? 0 : t.getHeight();
}

/*** * 求左右子节点最大高度 * @param left * @param right * @return */
private int maxHeight(AvlNodeInteger left,AvlNodeInteger right){
  return height(left) > height(right) ? height(left) : height(right);
}
插入操作

旋转

/**
*
* 左左旋转模型 
* @param node 旋转之前的parent node 节点 
* @return 旋转之后的parent node节点 
*/
private AvlNodeInteger leftLeftRotate(AvlNodeInteger node){
  AvlNodeInteger newRoot = node.getLeft();
  node.setLeft(newRoot.getRight());
  newRoot.setRight(node);
  //由此node的高度降低了，newRoot的高度提高了。
  //newRoot的高度由node的高度而来 
  node.setHeight(maxHeight(node.getLeft(),node.getRight())+1);
  newRoot.setHeight(maxHeight(newRoot.getLeft(),newRoot.getRight())+1);
  return newRoot;
}

/**
*
* 右右旋转模型
* @param node
* @return
*/
private AvlNodeInteger rightRightRotate(AvlNodeInteger node){
  AvlNodeInteger newRoot = node.getRight();
  node.setRight(newRoot.getLeft());
  newRoot.setLeft(node);
  //由此node的高度降低了，newRoot的高度提高了。
  //newRoot的高度由node的高度而来 
  node.setHeight(maxHeight(node.getLeft(),node.getRight())+1);
  newRoot.setHeight(maxHeight(newRoot.getLeft(),newRoot.getRight())+1);
  return newRoot;
}

/**
* 左右模型，先右右，再左左 
* @param node 
* @return 
*/
private AvlNodeInteger leftRightRotate(AvlNodeInteger node){
  //注意传递的参数 
  node.setLeft(rightRightRotate(node.getLeft()));
  return leftLeftRotate(node);
}

/***
* 右左模型，先左左，在右右 
* @param node 
* @return 
*/
private AvlNodeInteger rightLeftRotate(AvlNodeInteger node){
  node.setRight(leftLeftRotate(node.getRight()));
  return rightRightRotate(node);
}

insert

/**** * 对外开放，插入操作 * @param val * @throws Exception */
public void insert(Integer val) throws Exception {
  if(null == root){
    initRoot(val);
    size++;
    return;
  }
  if(contains(val)) thrownewException("The value is already exist!");
  insertNode(this.root,val);
  size++;
}/** * 递归插入 * parent == null 到最底部插入前节点判断情况 * @param parent * @param val * @return */
private AvlNodeInteger insertNode(AvlNodeInteger parent,Integer val){
  if(parent == null){
    return new AvlNodeInteger(val);
  }
  if(val < parent.getValue()){ 
    //插入判断，小于父节点，插入到左边
    //注意理解回溯，这里最终返回的是插入完成节点
    //每一层回溯，都会返回相应当时递归的节点！！！
    parent.setLeft(insertNode(parent.getLeft(),val));
    //判断平衡，不要在意这里的parent是谁，
    //这个parent肯定是递归层级上，回溯的一个节点！每一个节点都需要判断平衡
    if(height(parent.getLeft()) - height(parent.getRight()) > 1){
      Integer compareVal = (Integer) parent.getLeft().getValue();
      //左左旋转类型
      if(val < Integer.valueOf(compareVal)){
        parent = leftLeftRotate(parent);
      } else { 
        //左右旋转类型
        parent = leftRightRotate(parent);
      }
    }
  }
  if(val > parent.getValue()) { 
    //插入判断，大于父节点，插入到右边
    //注意理解回溯，这里最终返回的是插入完成节点
    //每一层回溯，都会返回相应当时递归的节点！！！
    parent.setRight(insertNode(parent.getRight(),val));
    //判断平衡，不要在意这里的parent是谁，
    //这个parent肯定是递归层级上，回溯的一个节点！每一个节点都需要判断平衡
    if(height(parent.getRight()) - height(parent.getLeft()) > 1){ 
      Integer compareVal = (Integer) parent.getRight().getValue();
      // 右右旋转类型
      if(val > compareVal){
        parent = rightRightRotate(parent);
      } else {
        // 右左旋转类型
        parent = rightLeftRotate(parent);
      }
    }
  }
  parent.setHeight((maxHeight(parent.getLeft(),parent.getRight()))+1);
  return parent;
}

删除操作
public void remove(Integer val) {
  if(null == val || null == root){
    return;
  }
  if(!contains(val)){
    return;
  }
  remove(root,val);
}
/**** * AVL删除，平衡树实现 * @param parent * @param val * @return */
private AvlNodeInteger remove(AvlNodeInteger parent,Integer val){
  if(val < parent.getValue()){
    //左子树递归查询
    //删除以后返回替换的新节点 
    AvlNodeInteger newLeft = remove(parent.getLeft(),val);
    parent.setLeft(newLeft);
    //检查是否平衡，删除的左边，那么用右边-左边
    if(height(parent.getRight()) - height(parent.getLeft()) > 1){
      AvlNodeInteger tempNode = parent.getRight();
      if(height(tempNode.getLeft()) > height(tempNode.getRight())){
        //RL类型 
        rightLeftRotate(parent);
      } else{
        //RR类型
        rightRightRotate(parent);
      }
    }
  } else if(val > parent.getValue()){
    //右子树递归查找
    //删除以后返回替换的新节点
    AvlNodeInteger newRight = remove(parent.getRight(),val);
    parent.setRight(newRight);
    //检查是否平衡
    if(height(parent.getLeft()) - height(parent.getRight()) > 1){
      AvlNodeInteger tempNode = parent.getLeft();
      if(height(tempNode.getLeft()) > height(tempNode.getRight())){
        //LL类型 
        leftLeftRotate(parent);
      } else{
        //LR类型
        leftRightRotate(parent);
      }
    }
  } else { 
    //相等，匹配成功
    if(null != parent.getLeft() && null != parent.getRight()){
      //左右子节点都不为空
      //判断高度，高的一方，拿到最大(左)，最小(右)的节点，作为替换节点。
      //删除原来匹配节点
      //左边更高，获取到左边最大的节点
      if(parent.getLeft().getHeight() > parent.getRight().getHeight()){
        AvlNodeInteger leftMax = getMax(parent.getLeft());
        parent.setLeft(remove(parent.getLeft(),leftMax.getValue())); 
        leftMax.setLeft(parent.getLeft()); 
        leftMax.setRight(parent.getRight()); 
        leftMax.setHeight(maxHeight(leftMax.getLeft(),leftMax.getRight()));
        parent = leftMax; 
      } else { 
        //右边更高，获取到右边最小的节点 
        AvlNodeInteger rightMin = getMin(parent.getRight());
        parent.setRight(remove(parent.getRight(),rightMin.getValue())); 
        rightMin.setLeft(parent.getLeft()); 
        rightMin.setRight(parent.getRight()); 
        rightMin.setHeight(maxHeight(parent.getLeft(),parent.getRight())+1);
        parent = rightMin;
      } 
    } else {
      //有任意一方节点为空，则不为空的那一方作为替换节点，删除原来的节点
      parent = null;
    }
  }
  return parent;
}
/*** * 删除时用到，获取当前节点子节点最大值 * @param currentRoot * @return */
private AvlNodeInteger getMax(AvlNodeInteger currentRoot){
  if(currentRoot.getRight() != null){ 
    currentRoot = getMax(currentRoot.getRight());
  }
  return currentRoot;
}

/*** * 删除时用到，获取当前节点子节点最小值 * @param currentRoot * @return */
private AvlNodeInteger getMin(AvlNodeInteger currentRoot){
  if(currentRoot.getLeft() != null){
    currentRoot = getMin(currentRoot.getLeft());
  }
  return currentRoot;
}
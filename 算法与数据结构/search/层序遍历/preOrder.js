function preOrder(node) {
  console.log(node.key);
  // console.log(node.value);
  if(node.left) {
    preOrder(node.left);
  }
  if(node.right) {
    preOrder(node.right);
  }
}

function midOrder(node) {
  if(node.left) {
    midOrder(node.left);
  }
  console.log(node.key);
  // console.log(node.value);
  if(node.right) {
    midOrder(node.right);
  }
}

function postOrder(node) {
  if(node.left) {
    postOrder(node.left);
  }
  if(node.right) {
    postOrder(node.right);
  }
  console.log(node.key);
  // console.log(node.value);
}

function destory(node) {
  if (node) {
    destory(node.left);
    destory(node.right);
    delete node;
    this.count--;
  }
}
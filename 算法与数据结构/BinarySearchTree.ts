
interface Key{}
interface Value{}
class tNode {   // Node 定义重复不能用
    key: Key;
    value: Value
    left: tNode;
    right: tNode;
    constructor(key: Key, value: Value) {
        this.key = key;
        this.value = value;
        this.left = null
        this.right = null
    }
}
let root: tNode;
let count: number;


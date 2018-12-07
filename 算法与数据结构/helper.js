var SortTestHelper = {
    /**
     * 生成有length长度的元素的随机数组，每个元素的随机范围为[rangeL, rangeR)
     * length 数组长度
     * rangeL 最小值
     * rangeR 最大值
     */
    generateRandamArray: (length, rangeL, rangeR) => {
        console.assert(rangeL < rangeR);    // rangeR要求大于rangeL
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr[i] = rangeL + Math.floor(Math.random() * (rangeR - rangeL + 1));
        }
        return arr;
    },
    /**
     * 生成length长度、近乎有序的随机数组,用于测试一些极端的情况
     * length 数组长度
     * swapTimes 打乱的次数
     */
    generateNearlyOrderArr: (length, swapTimes) => {
        // 先生成完全有序的数组
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        // 随机挑选几对元素进行交换
        for (let i = 0; i < swapTimes; i++) {
            const x = Math.floor(Math.random() * length);
            const y = Math.floor(Math.random() * length);
            arr.swap(x, y);
        }
        return arr;
    },
    /**
     * 测试方法
     * 计算算法效率
     * 检查排序结果是否正确
     * selector 可选入参，当数组内容是对象的时候，用于获取比较字段，例如function(item) { return item.id;};
     */
    testSort: (arr, sorter, selector) => {
        console.log(sorter.getName());
        console.log(arr);
        console.time();
        sorter(arr, selector);
        console.timeEnd();
        console.log(arr);
        console.log('-----------------------------------------------------');
        console.log('\n\n');
        console.assert(SortTestHelper.isSorted(arr, selector));
    },
    /**
     * 判断是否已排序
     * selector 可选入参
     */
    isSorted: (arr, selector) => {
        selector = selector || JSON.parse;
        for (let i = 0; i < arr.length - 1; i++) {
            if (selector(arr[i]) > selector(arr[i + 1])) {
                return false;
            }
        }
        return true;
    },
    // 深拷贝
    clone: (arr) => {
        return JSON.parse(JSON.stringify(arr));
    }
}

// 交换数组的两个位置的元素
Array.prototype.swap = function (i, j) {
    let item = this[i];
    this[i] = this[j];
    this[j] = item;
}
// 获取 function 名
Function.prototype.getName = function () {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}

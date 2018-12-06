var SortTestHelper = {
    // 生成有n个元素的随机数组，每个元素的随机范围为[rangeL, rangeR)]
    generateRandamArray: (length, rangeL, rangeR) => {
        console.assert(rangeL < rangeR);
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr[i] = rangeL + Math.floor(Math.random() * (rangeR - rangeL + 1));
        }
        return arr;
    },
    genNearOrderArr: (length, swapTimes) => {
        let arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        for (let i = 0; i < swapTimes; i++) {
            const x = Math.floor(Math.random() * length);
            const y = Math.floor(Math.random() * length);
            console.log(arr);
            arr.swop(x, y);
            console.log(arr);
        }
        return arr;
    },
    /**
     * 测试方法
     * 计算算法效率
     * 检查排序结果是否正确
     * selector 可选入参
     */
    testSort: (arr, sorter, selector) => {
        console.log(sorter.getName());
        console.time();
        let sortedArr = sorter(arr, selector);
        console.timeEnd();
        console.log(SortTestHelper.isSorted(arr, selector));
        return sortedArr;
    },
    /**
     * selector 可选入参
     */
    isSorted: (arr, selector) => {
        selector = selector || JSON.stringify;
        for (let i = 1; i < arr.length; i++) {
            if (selector(arr[i]) < selector(arr[i - 1])) {
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

Array.prototype.swap = function (i, j) {
    let item = this[i];
    this[i] = this[j];
    this[j] = item;
}

Function.prototype.getName = function () {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
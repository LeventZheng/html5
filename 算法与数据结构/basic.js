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
     * 
     */
    isSorted: (arr, selector) => {
        selector = selector || JSON.parse;
        for (let i = 1; i < arr.length; i++) {
            if (selector(arr[i]) < selector(arr[i - 1])) {
                return false;
            }
        }
        return true;
    },
    /**
     * 测试方法
     * 测试算法效率
     * 测试排序结果是否正确
     */
    testSort: (arr, sorter) => {
        console.log(sorter.getName());
        console.time();
        sorter(arr);
        console.timeEnd();
        console.log(CommonUtil.isSorted(arr));
    },
    clone: (arr) => {
        return JSON.parse(JSON.stringify(arr));
    }
}

Array.prototype.swop = function (i, j) {
    let item = this[i];
    this[i] = this[j];
    this[j] = item;
}

Function.prototype.getName = function () {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
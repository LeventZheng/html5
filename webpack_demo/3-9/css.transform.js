module.exports = function (css) {
    console.log(css);
    console.log(window.innerWidth);
    // 宽度大于1366的时候显示灰色
    if (window.innerWidth >= 1366) {
        return css.replace('greenyellow', 'grey');
    }
    return css;
}
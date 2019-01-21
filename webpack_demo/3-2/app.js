// 这是入口文件

// es6 module 模块规范
import sum from './sum'

// commonjs 模块规范
var minus = require('./minus');

// amd 模块规范, 需要有路径
// 因为 amd 是异步的模块，所以 muti 形成了单独的一个chunk加载进来
require(['./muti'], function(muti) {
    console.log('muti(2, 3)=', muti(2, 3))
});

console.log('sum(23, 24) = ', sum(23, 24))
console.log('minus(34, 17) =', minus(34,17));

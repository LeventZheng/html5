require.include('./moduleA')

// import './subPageA';
// import './subPageB';
var page = 'subPageA';
if (page === 'subPageA') {
    // require.ensure(['./subPageA'], function() {
    //     var subPageA = require('./subPageA');
    // }, 'subPageA');
    import(/* webpackchunkName:'subpageA*/'./subPageA').then(function(subPageA) {
        console.log(subPageA);
    });
} else if (page === 'subPageB') {
    // require.ensure(['./subPageB'], function() {
    //     var subPageB = require('./subPageB');
    // }, 'subPageB');
    import(/* webpackchunkName:'subpageA*/'./subPageB').then(function(subPageB) {
        console.log(subPageB);
    });
}


// 第一个 lodash 是加载但不执行，可不写
// require 的时候才真正的执行
require.ensure(['lodash'], function() {
    var _ = require('lodash');
    _.chunk([1,2,3], 2);
}, 'vendor');
// import * as _ from 'lodash';

export default 'pageA';
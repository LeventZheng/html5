import base from './css/base.css';
import './css/common.css';

var app = document.getElementById('app');
app.innerHTML = '<div class="' + base.box + '">333</div>';
// base.use();

// var flag = false;
// setInterval(function() {
//     if (flag) {
//         base.unuse();
//     } else {
//         base.use();
//     }
//     flag = !flag;
// }, 1000);
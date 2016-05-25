/**
 * Created by Administrator on 2016/5/3.
 */
///<reference path="animal.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird(name) {
        _super.call(this, name);
    }
    Bird.prototype.do = function () {
        alert(this.name + 'fly...');
    };
    return Bird;
})(Animal);
//# sourceMappingURL=bird.js.map
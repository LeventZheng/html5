/**
 * Created by Administrator on 2016/5/3.
 */
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.do = function () {
    };
    Animal.prototype.getColor = function () {
        return this.color;
    };
    Animal.prototype.setColor = function (color) {
        return this.color = color;
    };
    return Animal;
})();
//# sourceMappingURL=animal.js.map
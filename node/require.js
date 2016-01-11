var module = require("./module.js");
module.setName("James");
module.getName();

var module1 = require("./module.js");
console.log(module === module1);
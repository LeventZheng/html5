var EventEmitter = require("events").EventEmitter;

var event = new EventEmitter();

event.on("some_event",function(){
	console.log("receive");
});

setTimeout(function(){
	event.emit("some_event");
},3000)
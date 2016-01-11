console.log("hello world");
console.time("oneSecond");
setTimeout(function(){
	console.timeEnd("oneSecond");
},1000);

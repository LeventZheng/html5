/**
 * Created by User on 2016/1/9.
 */
var http = require("http");
var url = "http://www.w3school.com.cn/";

http.get(url,function(res){
    var html = "";
    res.on('data',function(data){
        html += data;
    });
    res.on('end',function(){
        console.log(html);
    });
});
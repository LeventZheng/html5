/**
 * Created by User on 2016/1/25.
 */
var express = require('express');
var url = require('url');
var app = express();
app.get('/',function(req,res){
    res.send("Server Root");
});
app.get('/login',function(req,res){
    res.send("Login Page");
});
app.get('/save',function(req,res){
    res.send("Save Page");
});
app.get('/save/:userid',function(req,res){
    res.send("Save userid:"+req.param('userid'));   //userid «–Œ≤Œ
});

//app.param('userid',function(req,res,next,value){
//    console.log("Request with userid:" + value);
//});

//http://127.0.0.1:8080/find?author=levent&title=book
app.get('/find',function(req,res){
    var url_parts = url.parse(req.url,true);
    var query = url_parts.query;
    var response = "Finding Book: Author:"+query.author + " Title:" + query.title;
    console.log(response);
    res.send(response);
});

//http://127.0.0.1:8080/book/123:a
app.get(/^\/book\/(\w+)\:(\w)?$/,function(req,res){


    var response = "Get book: Chapter: " + req.params[0] + " Page: " + req.params[1];
    console.log('\nParam URL:'+req.originalUrl);
    console.log(response);
    res.send(response);
});




app.all('/*',function(req,res){
    res.send("All Page");
});
app.listen(8080);
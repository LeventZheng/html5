/**
 * Created by User on 2016/1/19.
 */
var express = require("express");
var app = express();
//app.listen(90);
var http = require("http");
http.createServer(app).listen(9090);

app.get('/',function(req, res){
    res.send("Server Root");
});
app.get('/login',function(req, res){
    res.send("Login Page");
});
app.get('/save',function(req, res){
    res.send("Save Page");
});
app.get('/save/*',function(req, res){
    res.send("Save All");
});
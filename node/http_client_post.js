var http = require("http");
var data = JSON.stringify({"name":"Bilbo","occupation":"Burglar"});
var options = {
    hostname: 'localhost',
    //path:"/",
    port: '8080',
    method: "POST",
    headers: {
        "Content-Type": 'application/json',
        "Content-Length": data.length
    }
};
function readResponse(response){
    var responseData = '';
    response.on('data',function(chunk) {
        responseData += chunk;
    });
    response.on('end',function() {
        var dataObj = JSON.parse(responseData);
        console.log("Raw Response:",responseData);
        console.log("Message:", dataObj.message);
        console.log("Question:", dataObj.question);
    });
}
var req = http.request(options, readResponse);
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
req.write(data);
req.end();
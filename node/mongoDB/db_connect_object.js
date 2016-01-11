/**
 * Created by User on 2016/1/10.
 */
var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var client = new MongoClient(
    new Server('localhost',27017,
        {
            socketOptions : { connectTimeoutMS:500},
            poolSize:5,
            auto_reconnect:true}
    ),
    {
        numbetOfRetries:3,
        retryMilliSeconds:500
    });
console.log(client);
//return;
client.open(function(err,client){
    if(err){
        console.log("Connection failed Via Client Object");
    }else{
        var db = client.db("test");
        if(db){
            console.log("Connection Via Client Object ...");
            db.authenticate("dbadmin","test",function(err, result){
                if(err){
                    console.log("Authenticate failed ...");
                }else{
                    console.log("Authenticate Via Client Object ...");
                    client.logout(function(err,result){
                        if(!err){
                            console.log("Logged out Via Client Object ...");
                        }
                        client.close();
                        console.log("Connection closed ...");
                    });
                }
            });
        }
    }
});
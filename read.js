var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/GridFS');      //connecting mongodb database
var conn=mongoose.connection;           //mongoose connection
//var path=require('path');           
var Grid=require('gridfs-stream');      //gridfs import
var fs=require('fs');
var videoPath="C:/Users/ARJU/Desktop/gd";    //file path
Grid.mongo=mongoose.mongo; 
conn.once('open',()=>               //if database connection is open
                        {
                            console.log("connection Open-");
                            var gfs=Grid(conn.db);
                            writestream=fs.createWriteStream(videoPath);
                            var readstream=gfs.createReadStream({filename:"My Video"});
                        }
        );
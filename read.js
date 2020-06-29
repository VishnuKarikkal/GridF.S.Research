var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/GridFS');      //connecting mongodb database
var conn=mongoose.connection;           //mongoose connection
var path=require('path');           
var Grid=require('gridfs-stream');      //gridfs import
var fs=require('fs');
var videoPath="C:/Users/ARJU/Desktop/GridF.S.Research/Retrieved Video.mp4";    //file path
Grid.mongo=mongoose.mongo; 
conn.once('open',()=>               //if database connection is open
                        {
                            console.log("connection Open-");
                            var gfs=Grid(conn.db);
                            var fs_write_stream=fs.createWriteStream(videoPath);
                            var readstream=gfs.createReadStream({filename:"My Video"});
                            readstream.pipe(fs_write_stream);
                            fs_write_stream.on('close',(file)=>
                                                            {
                                                                console.log("file written Successfully!");
                                                            })
                        }
        );
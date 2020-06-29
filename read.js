var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/GridFS');      //connecting mongodb database
var conn=mongoose.connection;           //mongoose connection
var path=require('path');           
var Grid=require('gridfs-stream');      //gridfs import
var fs=require('fs');
var videoPath="C:/Users/ARJU/Desktop/GridF.S.Research/Retrieved Video.mp4";    
//file path-must contain file name(the name that should be displayed at the destination folder)
Grid.mongo=mongoose.mongo; 
conn.once('open',()=>               //if database connection is open
                        {
                            console.log("connection Open-");
                            var gfs=Grid(conn.db);
                            var fs_write_stream=fs.createWriteStream(videoPath); //creating writestream
                            var readstream=gfs.createReadStream({filename:"My Video"}); //finding the data with the filename associated
                            readstream.pipe(fs_write_stream);   //writing into the destination
                            fs_write_stream.on('close',(file)=>     //on finish
                                                            {
                                                                console.log("file written Successfully!");
                                                            })
                        }
        );
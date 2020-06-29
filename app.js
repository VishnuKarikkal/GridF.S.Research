var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/GridFS');      //connecting mongodb database
var conn=mongoose.connection;           //mongoose connection
//var path=require('path');           
var Grid=require('gridfs-stream');      //gridfs import
var fs=require('fs');
var videoPath="E:/F.S.D. Tutorials/Express!!/Express-Part6.mp4";    //file path
Grid.mongo=mongoose.mongo;          //connect GridFs and Mongo
conn.once('open',()=>               //if database connection is open
                        {
                            console.log("connection Open-");
                            var gfs=Grid(conn.db);
                            var Writestream=gfs.createWriteStream({     //creating writestream
                                                filename:"My Video"  //filename changed to "My Video" - 
                                                                    //if not specified filename will become empty
                                                                  });
                            fs.createReadStream(videoPath).pipe(Writestream); //saving file-- takes a lil bit time
                            Writestream.on('close',(file)=>         //after saving the 'close' event of writestream occurs
                                                        {
                                                            console.log(file.filename); //for check whether file written or not
                                                            console.log(file._id); //for check whether file written or not

                                                        })
                        })

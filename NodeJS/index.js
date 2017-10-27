var mongoose = require('mongoose');
var express = require('express');
var app = express();
var Grid = require('gridfs-stream');
var path = require('path');
const busboyBodyParser = require('busboy-body-parser');

mongoose.Promise = global.Promise;

app.use(busboyBodyParser({ limit: '5mb' }));

Grid.mongo = mongoose.mongo;
var conn = mongoose.createConnection("mongodb://localhost:27017,localhost:27018,localhost:27019");
conn.once('open', function () {
  var gfs = Grid(conn.db);

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));

});
app.get('/file/:filename',function(req,res){
	gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
 
 	    if(files.length===0){
			return res.status(400).send({
				message: 'File not found'
			});
 	    }
		
		res.writeHead(200, {'Content-Type': files[0].contentType});
		
		var readstream = gfs.createReadStream({
			  filename: files[0].filename
		});
 
	    readstream.on('data', function(data) {
	        res.write(data);
	    });
	    
	    readstream.on('end', function() {
	        res.end();        
	    });
 
		readstream.on('error', function (err) {
		  console.log('An error occurred!', err);
		  throw err;
		});
	});
});
app.post('/', function(req, res) {
		var part = req.files.file;
		console.log(req.files);
 
                var writeStream = gfs.createWriteStream({
                    filename: part.name,
    				mode: 'w',
                    content_type:part.mimetype
                });
 
 
                writeStream.on('close', function() {
                     return res.status(200).send({
						message: 'Success'
					});
                });
                
                writeStream.write(part.data);
 
                writeStream.end();

 /* req.pipe(gfs.createWriteStream({
    filename: 'test'
  }));
  gfs.createReadStream({
    filename: 'test'
  }).pipe(res);
});*/
});
});
app.listen(3000,function(){

	console.log('listening on port 3000...');

});